
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Form,Input,Icon,Button,message} from 'antd'
import logo from '../../asset/images/logo.png'
import './login.less'
import {reqLogin} from '../../Api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'






const Item =Form.Item



 class Login extends Component {
  handleSubmit=e=>{

    e.preventDefault();
  
// 对表单所有字段进行统一验证
    this.props.form.validateFields(async(err,{username,password})=>{
     
  if(!err){

  const result =await reqLogin (username,password)
  console.log(result)
  if(result.status===0){
    const user= result.data
    storageUtils.saveUser(user)
    memoryUtils.user=user
    this.props.history.replace('/')
    message.success('登录成功')
  }else{
    message.error(result.msg)
  }
  
  }else{
  
  }
      })
  }
  // 对密码进行验证
  validatePwd=(rule,value,callback)=>{
     // 1).必须输入
    // 2).必须大于等于4位
    // 3).必须小于等于12位
    // 4).必须是英文、数字或下划线组成0
    value = value.trim()
    if(!value){
      callback('密码必须输入')
    }else if(value.length<4){
callback('密码不得少于4位')
    }else if(value.length>12){
      callback('密码最长不能超过12位')
    }else if (!/^[a-zA-Z0-9_]+$/.test(value)){
callback('密码必须是字母、数字或下划线组成')
    }else{
      callback()
    }
  }
  
  render () {
    // 读取保存的user，如果存在，直接跳转到管理界面
    const user =memoryUtils.user;
    if(user._id){
      // 自动跳转指定的路径
      return <Redirect to='/'/> 
    }
    const {getFieldDecorator}=this.props.form

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section className='login-content' >
        <h3>用户登陆</h3>

        <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
        {
         getFieldDecorator('username', { // 配置对象: 属性名是一些特定的名称
          initialValue: '', // 初始值
          rules: [ // 声明式验证: 使用插件已定义好的规则进行验证
            // 1).必须输入
            // 2). 必须大于等于4位
            // 3). 必须小于等于12位
            // 4). 必须是英文、数字或下划线组成
            { required: true, whitespace: true, message: '用户名是必须' },
            { min: 4, message: '用户名不能小于4位'},
            { max: 12, message: '用户名不能大于12位'},
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />
        )
        }
            </Item>
            <Item>
              {
                 getFieldDecorator('password',{
                  initialValue: '', // 初始值
                   rules:[ {validator:this.validatePwd}]
                 })(
               <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
               type="password" placeholder="密码"/>)

              }
              
            </Item>



            <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
            </Item>
          </Form>
        </section>

      </div>
    )
  }
}

const WrapperForm = Form.create()(Login)
export default WrapperForm