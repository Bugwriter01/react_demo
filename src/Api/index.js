import ajax from './ajax'
import jsonp from 'jsonp'  
import { message } from 'antd';
const BASE=''
export const reqLogin = (username,password)=>ajax.post(BASE+'/login',{username,password})
export const reqWeather = (city) => {

return new Promise((resolve, reject) => { 
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (error, data) => {
      if (!error && data.error===0) { // 成功的
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else { // 失败的
        message.error('获取天气信息失败')
      }

    })
  })
}