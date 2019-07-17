import React, {Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import memoryUils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const {  Footer, Sider, Content } = Layout;


export default class Admin extends Component {
  render() {
// const user =memoryUils.user
// if(!user._id){
//   return <Redirect to='/login'/>
// }
    return (
      
    
    <Layout style={{height:'100%'}}>
      <Sider className='left-nav'>
        <LeftNav/>
      </Sider>
      <Layout>
        <Header style={{width:'100%' ,background:'white'}}>Header</Header>
        <Content style={{background:'white' ,margin:'20px'}}>
        <Switch>
              <Route path="/home" component={Home}/>
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to="/home"/>
            </Switch>
        </Content>
        <Footer style={{textAlign:'center',color:'rgba(0,0,0,0.5)'}}>
          推荐使用谷歌浏览器，可获得更佳体验
        </Footer>
      </Layout>
    </Layout>
  
  )}
    }