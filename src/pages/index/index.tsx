import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtInput } from 'taro-ui'
import styles from './index.module.scss'
import Common from '../../asserts/Common'

interface State {
  accessToken: string
  identificationNumber: string
  info: {
    id?: string
    account?: string
    classId?: string
    gender?: string
    identificationNumber?: string
    politicalOutlook?: string
    name?: string
    studentCode?: string
    studentStatus?: string
  }
}

export default class Index extends Component<{}, State> {
  constructor (props) {
    super(props)
    this.state = {
      accessToken: '',
      info: {},
      identificationNumber: '111111111110000001',
    }
  }

  onLogin = () => {
    Common.onLogin(
      data => {
        this.setState({accessToken: data.accessToken})
        this.onGetInfo()
      },
      () => {
        console.log('to register')
        Taro.showToast({
          title: '未绑定账号信息',
          icon: 'none',
        })
      })
  }

  onRegister = () => {
    Common.onRegister(this.state.identificationNumber)
  }

  onGetInfo = () => {
    console.log('accessToken: ', this.state.accessToken)
    Common.onGetStudentInfo(this.state.accessToken)
          .then(res => {
            this.setState({info: res.data.data})
          })
  }

  handleChangeIdentificationNumber (identificationNumber) {
    this.setState({identificationNumber})
    return identificationNumber
  }

  render () {
    return (
      <View className={styles.index}>
        <AtButton type='primary' onClick={this.onLogin}>登录</AtButton>
        <AtInput
          name='value'
          title='身份证号'
          type='text'
          value={this.state.identificationNumber}
          onChange={this.handleChangeIdentificationNumber.bind(this)}
        />
        <AtButton type='primary' onClick={this.onRegister}>绑定身份证</AtButton>
        <AtList>
          <AtListItem title='学号' note={this.state.info.studentCode} />
          <AtListItem title='学生姓名' note={this.state.info.name} />
          <AtListItem title='班级 id' note={this.state.info.classId} />
          <AtListItem title='性别' note={this.state.info.gender} />
          <AtListItem title='身份证号' note={this.state.info.identificationNumber} />
          <AtListItem title='政治面貌' note={this.state.info.politicalOutlook} />
          <AtListItem title='状态' note={this.state.info.studentStatus} />
        </AtList>
      </View>
    )
  }
}
