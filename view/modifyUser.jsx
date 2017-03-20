import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import TopNav from './topNav';
import BtmNav from './btmNav'

import './../sass/modifyUser.scss';

import { modal,setTitle } from './../lib/common';

class ModifyUser extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			CustomerID:'',
			BakTel : '',
			CustomerEnname: '',
			CustomerName : '',
			Email:'',
			Tel: '',
			Wechat:'',
		}
	}
	componentWillMount(){
		setTitle( '修改个人信息' );
	}
	componentDidMount(){
		var that = this;
		axios.post('/Users/GetUserInfo',{}).then(function (response) {

			const data = response.data;
				//UserInfo = Object.assign({},that.state.UserInfo,data.UserInfo);

			if( data.ErrorCode === 200 ){
				that.setState({
					CustomerID: data.UserInfo.CustomerID,
					BakTel : data.UserInfo.BakTel ? data.UserInfo.BakTel : '',
					CustomerEnname:data.UserInfo.CustomerEnname,
					CustomerName:data.UserInfo.CustomerName,
					Email:data.UserInfo.Email,
					Tel:data.UserInfo.Tel,
					Wechat:data.UserInfo.Wechat
				});	
			}
		})

		setTimeout(function(){
			document.getElementsByClassName('md-nav')[0].getElementsByTagName('a')[2].className += ' selected';
		},0);
	}
	change( e ){
		
		this.setState({
			BakTel : document.getElementById('bak_tel').value,
			CustomerEnname:document.getElementById('en_username').value,
			CustomerName:document.getElementById('username').value,
			Email:document.getElementById('email').value,
			Tel:document.getElementById('tel').value,
			Wechat:document.getElementById('wechat').value,
		});
		
	}
	save(){

		const that = this,
			tel = that.state.Tel,
			bak_tel = that.state.BakTel,
			email = that.state.Email;

		if( !/^[0-9]*$/.test( tel ) ||  !/^[0-9]*$/.test( bak_tel ) ){
			modal.alert('请填写正确的联系电话');
			return;
		}
		if( email.indexOf('@') === -1 ){
			modal.alert('Email地址格式不正确');
			return;
		}
		axios.post('/Users/EditUserInfo',that.state).then(function (response) {

			const data = response.data;
			if( data.ErrorCode === 200 ){
				modal.success('修改成功');
			}else{
				modal.error('修改失败');
			}
		})
	}
	cancel(){
		window.location.hash = "#/user";
	}
	render(){

		return(
			<div className="md-modifyUser">
				{/*<TopNav title="修改个人信息"/>*/}
				<div className="modify-form">
		 			<div className="tips-msg">此个人资料会在填写订单信息时帮您默认填写</div>
		 			<div className="form-item">
		 				<label>中文姓名:</label>
		 				<input type="text" id="username" value={this.state.CustomerName} onChange={this.change.bind(this)} />
		 			</div>
		 			<div className="form-item">
		 				<label>姓名拼音:</label>
		 				<input type="text" id="en_username" value={this.state.CustomerEnname} onChange={this.change.bind(this)} />
		 			</div>
		 			<div className="form-item">
		 				<label>联系电话:</label>
		 				<input type="text" id="tel" value={this.state.Tel} onChange={this.change.bind(this)} />
		 			</div>
		 			<div className="form-item">
		 				<label>备用联系电话:</label>
		 				<input type="text" id="bak_tel" value={this.state.BakTel} onChange={this.change.bind(this)}/>
		 			</div>
		 			<div className="form-item">
		 				<label>Email地址:</label>
		 				<input type="text" id="email" value={this.state.Email} onChange={this.change.bind(this)} />
		 			</div>
		 			<div className="form-item">
		 				<label>微信号:</label>
		 				<input type="text" id="wechat" value={this.state.Wechat} onChange={this.change.bind(this)} />
		 			</div>
			 	</div>
			 	<div className="btm-btn">
		 			<button onClick={this.save.bind(this)}>保存</button>
		 			<button className="cancel" onClick={this.cancel.bind(this)}>取消</button>
		 		</div>
			 	<BtmNav />
			</div>
		 )
	}
}

export default ModifyUser;