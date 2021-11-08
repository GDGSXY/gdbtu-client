const host = 'http://192.168.224.101:8080'

export default {
  login: host + '/blade-auth/loginWeapp',
  register: host + '/blade-auth/registerWeapp/student',
  getStudentInfo: host + '/blade-system/userInfo/student',
}
