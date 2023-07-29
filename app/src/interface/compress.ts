import type { FormatterType, DownloadType } from '@/enum/compress'

interface GetCompressMediaResBuffer {
    data: number[],
    type: string
}

export interface GetCompressMediaResType  {
  buffer: GetCompressMediaResBuffer
  filename: string,
  type: DownloadType
}
export interface CompressMediaResParamType {
  url: string,
  formatter: FormatterType,
  width: number,
  height: number
}