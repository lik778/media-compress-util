import { Controller, Post, Res, UseInterceptors, UploadedFile, Req, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { Response, Request } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { createUploadDir } from './util/file'

const uploadPath = createUploadDir()

@Controller('/upload')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/all')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadPath,
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          return callback(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    console.log('file', file)
    res.json({
      fileName: file.filename,
      originalname: file.originalname
    })
  }

  @Post('/download')
  download(@Req() req: Request, @Res() res: Response) {
    console.log(req.body)
    const compressNamePath = req.body.url[0]
    const filePath = path.join('./uploads', compressNamePath)
    fs.readFile(filePath, async (err) => {
      if (err) {
        console.log('Error reading file', err)
        return res.status(500).json({ error: 'Error reading file' })
      }
      try {
        const { buffer, type, fileName } = await this.appService.compressMediaProcess(req.body)
        res.setHeader('Content-Disposition', `attachment; filename=${path.basename(compressNamePath)}`)
        res.setHeader('Content-Type', 'application/octet-stream')
        res.send({
          code: 200,
          message: '压缩成功',
          data: {
            buffer: buffer,
            filename: fileName,
            type: type
          }
        })
        // 压缩完成后删除
        // fs.unlink(filePath, (err) => {
        //   if (err) {
        //     console.log('Error remove', err)
        //   } else {
        //     console.log('Remove success', filePath)
        //   }
        // })
      } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e })
      }
    })
  }
}
