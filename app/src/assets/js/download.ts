import { DownloadType } from '@/enum/compress'

export const createDomDownloadFile = (buffer: ArrayBufferLike, fileName: string, types: DownloadType) => {
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  const downloadUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = downloadUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}