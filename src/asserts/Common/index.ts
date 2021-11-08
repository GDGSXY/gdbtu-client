import Taro from '@tarojs/taro'
import Api from '../../api'

function loginWeapp (success, toRegister) {
  Taro.login({
    success: function ({code, errMsg}) {
      if (code) {
        Taro.request({
          header: {
            Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
          },
          method: 'POST',
          url: Api.user.login,
          data: {code},
        }).then(res => {
          const data = res.data
          if (data.success === false) {
            console.log('注册')
            toRegister()
            return
          }
          success(data.data)
        })
      } else {
        console.log('登录失败！' + errMsg)
      }
    },
  })
}

function registerWeapp (identificationNumber: string) {
  Taro.login({
    success: function ({code, errMsg}) {
      if (code) {
        Taro.request({
          header: {
            Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
          },
          method: 'POST',
          url: Api.user.register,
          data: {code, identificationNumber},
        }).then(res => {
          console.log('register res: ' + JSON.stringify(res))
        })
      } else {
        console.log('注册失败！' + errMsg)
      }
    },
  })
}

function getStudentInfo (token) {
  return Taro.request({
    header: {
      'Blade-Auth': `bearer ${token}`,
    },
    method: 'GET',
    url: Api.user.getStudentInfo,
  })
}

export default {
  onLogin (success, toRegister) {
    console.log(`Login in env: ${Taro.getEnv()}`)
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      return loginWeapp(success, toRegister)
    }
    console.error(`Don 't support login on ${Taro.getEnv()}`)
  },
  onRegister (identificationNumber: string) {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      return registerWeapp(identificationNumber)
    }
    console.error(`Don 't support login on ${Taro.getEnv()}`)
  },
  onGetStudentInfo (token: string) {
    return getStudentInfo(token)
  },
}
