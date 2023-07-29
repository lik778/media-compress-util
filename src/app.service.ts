import { Injectable } from '@nestjs/common'
import * as sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import { compressMediaProcessParamType, compressMediaResFileType, compressMediaProcessResType } from './interface/appController'
import { compressMediaProcessFormatterType, ResType } from './enum/app-controller'
import { changeFileExtName } from './util/file'
import * as archiver from 'archiver'

@Injectable()
export class AppService {
  async compressMediaProcess(params: compressMediaProcessParamType): Promise<compressMediaProcessResType> {
    const archive = archiver('zip', { zlib: { level: 9 } })
    const zipPath = path.resolve('./tmp')
    if (!fs.existsSync(zipPath)) {
      fs.mkdirSync(zipPath)
    }

    const compressMediaPromiseList = params.url.map((item) => {
      return new Promise<compressMediaResFileType>((resolve, reject) => {
        let outFileName = item
        const inputPath = path.join('./uploads', item)
        const readableStream = fs.createReadStream(inputPath)
        let transformer = sharp()

        if (params.width || params.height) {
          transformer = transformer.resize(params.width, params.height)
        }

        if (params.formatter && params.formatter !== compressMediaProcessFormatterType.default) {
          transformer = transformer.toFormat(params.formatter)
          outFileName = changeFileExtName(item, params.formatter)
        }

        const outputPath = path.join(zipPath, outFileName)
        const writableStream = fs.createWriteStream(outputPath)

        readableStream.pipe(transformer).pipe(writableStream)

        writableStream.on('finish', () => {
          resolve({
            filePath: outputPath,
            fileName: outFileName
          })
        })

        writableStream.on('error', (err) => {
          reject(err)
        })
      })
    })

    const compressMediaResult = await Promise.all(compressMediaPromiseList)
    if (compressMediaResult.length === 1) {
      const filePath = compressMediaResult[0].filePath
      const fileName = compressMediaResult[0].fileName
      const buffer = fs.readFileSync(filePath)
      return {
        buffer,
        type: ResType.image,
        fileName
      }
    }
    compressMediaResult.forEach((item: compressMediaResFileType) => {
      archive.append(fs.createReadStream(item.filePath), { name: item.fileName })
    })

    archive.finalize()

    return new Promise((resolve, reject) => {
      const buffers: Buffer[] = []

      archive.on('data', (data: Buffer) => {
        buffers.push(data)
      })

      archive.on('end', () => {
        const buffer = Buffer.concat(buffers)
        const compressName = new Date().getTime() + '.zip'
        resolve({
          buffer,
          type: ResType.zip,
          fileName: compressName
        })
      })

      archive.on('error', (err: Error) => {
        reject(err)
      })
    })
  }
}
