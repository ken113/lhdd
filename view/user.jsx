import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { delCookie } from './../lib/common';

import TopNav from './topNav';
import BtmNav from './btmNav'

import './../sass/user.scss';


class User extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			username : '',
		}
	}
	componentDidMount(){

		axios.post('/Users/GetUserInfo',{
		}).then(function (response) {
			const data = response.data;
			debugger;
		}).catch(function (error) {
			
		})

	}
	signOut(){
		delCookie( '.ASPXAUTH' );
		window.location.hash = "#/login";
	}
	render(){

		return(
			 <div className="md-user">
			 	<TopNav title='个人中心'/>
			 	<div className="user-top">
			 		<img src="#"/>
			 		<span className="username">{this.state.username}</span>
			 	</div>
			 	<div className="user-center">
			 		<div className="list-item"><i className="left-icon fa fa-wechat"></i><span>微信绑定</span><i className="right-icon fa fa-angle-right"></i></div>
			 		<div className="list-item"><i className="left-icon fa fa-lock"></i><span>修改密码</span><i className="right-icon fa fa-angle-right"></i></div>
			 		<div className="list-item"><i className="left-icon fa fa-question-circle"></i><span>帮助</span><i className="right-icon fa fa-angle-right"></i></div>
			 		<div className="list-item"><i className="left-icon fa fa-phone"></i><span>联系客服</span><i className="right-icon phone">0755-83973088</i></div>
			 	</div>

			 	<div className="user-signOut">
			 		<button onClick={this.signOut.bind(this)}>退出</button>
			 	</div>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default User;




