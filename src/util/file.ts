import * as path from 'path'
import * as fs from 'fs'

export const changeFileExtName = (filePath: string, ext: string) => {
  const pathInfo = path.parse(filePath)
  pathInfo.ext = `.${ext}`
  return pathInfo.name + pathInfo.ext
}

export const createUploadDir = () => {
  const uploadPath = './uploads'
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath)
  }
  return uploadPath
}
