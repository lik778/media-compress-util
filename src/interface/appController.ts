import type { compressMediaProcessFormatterType, ResType } from '../enum/app-controller'

export interface compressMediaProcessParamType {
  formatter: compressMediaProcessFormatterType
  width: number
  height: number
  url: string[]
}

export interface compressMediaResFileType {
  filePath: string
  fileName: string
}

export interface compressMediaProcessResType {
  buffer: Buffer
  type: ResType
  fileName: string
}
