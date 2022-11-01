import request from '@/utils/request'
const sysApi = (window as any).config.VUE_APP_NO_AUTH_SYSTEM_API ? (window as any).config.VUE_APP_NO_AUTH_SYSTEM_API : process.env.VUE_APP_NO_AUTH_SYSTEM_API

//获取基本配置信息
export function getBasic() {
  return request({
    url: sysApi + '/api/system/config/basic',
    method: 'get'
  })
}

//读取文件
export function getPicUrl(fileName: string) {
  return sysApi + "/api/system/file/download?fileName=" + fileName;
}