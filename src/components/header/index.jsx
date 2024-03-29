import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Modal} from 'antd'
import {reqWeather} from '../../Api'
import LinkButton from '../link-button'
import menuList from '../../config/menuConfigs'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'
import './index.less'


 class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '', // 图片url
        weather: '', // 天气文本
      }
    
    logout=()=>{
Modal.confirm({ 
    title:'确认退出吗？',
    onOk:()=>{
        console.log('Ok')
        storageUtils.removeUser()
        memoryUtils.user={}
        this.props.history.replace('/login')
    },
    onCancel(){
        console.log('Cancel');
    },

})
    }
    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
          if (item.key===path) {
            title = item.title
          } else if (item.children) {
            const cItem = item.children.find(cItem => cItem.key===path)
            if (cItem) {
              title = cItem.title
            }
          }
          
        })
    
        return title
      }
    
      /* 
      获取天气信息显示
      */
      getWeather = async () => {
        // 发请求
        const { dayPictureUrl, weather } = await reqWeather('北京')
        // 更新状态
        this.setState({
          dayPictureUrl, 
          weather
        })
      }
    
    
      componentDidMount () {
        // 启动循环定时器
        this.intervalId = setInterval(() => {
          // 将currentTime更新为当前时间值
          this.setState({
            currentTime: formateDate(Date.now())
          })
        }, 1000);
        // 发jsonp请求获取天气信息显示
        this.getWeather()
      }
    
      componentWillUnmount () {
        // 清除定时器
        clearInterval(this.intervalId)
      }
    

    render() {
        const { currentTime, dayPictureUrl, weather } = this.state 
        const user = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{user.username} &nbsp;&nbsp;
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                    <span>{ currentTime }</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)