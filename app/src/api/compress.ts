import { requestPost } from "./base";
import type { GetCompressMediaResType, CompressMediaResParamType } from '@/interface/compress'


export const compressMediaApi  = (data: CompressMediaResParamType) => {
  return requestPost<GetCompressMediaResType>('/upload/download',data)
}