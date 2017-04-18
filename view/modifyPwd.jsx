import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//import TopNav from './topNav';
import BtmNav from './btmNav'

import { modal,setTitle } from './../lib/common';
import './../sass/modifyPwd.scss';


class ModifyPwd extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			oldPassword: '',
			newPassword: '',
			newPassword2: '',
		}
	}
	componentWillMount(){
		setTitle('修改密码-个人中心-浪花朵朵');
	}
	componentDidMount(){
		setTimeout(function(){
			document.getElementsByClassName('md-nav')[0].getElementsByTagName('a')[2].className += ' selected';
		},0);
	}
	change(){
		this.setState({
			oldPassword : document.getElementById('oldPassword').value,
			newPassword:document.getElementById('newPassword').value,
			newPassword2:document.getElementById('newPassword2').value,
		});
	}
	save(){
		const that = this,
			oldPassword = that.state.oldPassword,
			newPassword = that.state.newPassword,
			newPassword2 = that.state.newPassword2;

		if( oldPassword === '' ){
			modal.error('旧密码不能为空');
			return;
		}else if( newPassword === '' ){
			modal.error('新密码不能为空');
			return;
		}else if( newPassword2 === '' ){
			modal.error('再次新密码不能为空');
			return;
		}else if( newPassword2 !== newPassword ){
			modal.error('2次密码输入不同');
			return;
		}
		axios.post('/Users/EditPassword',{
			oldPassword: that.state.oldPassword,
			newPassword: that.state.newPassword,
			CustomerID: sessionStorage.getItem('CustomerID')
		}).then(function (response) {

			const data = response.data;
			if( data.ErrorCode === 200 ){
				modal.success('修改成功');
				window.location.hash = "#/login";
				setTimeout(function(){
					document.getElementById('md-modal-success').classList.remove('show');
					document.getElementById('masker').style.display = 'none';
					window.location.hash = "#/login";
				},1000);
			}else{
				modal.error( data.ErrorMessage );
			}
		})
	}
	cancel(){
		window.location.hash = "#/user";
	}
	render(){

		return(
			<div className="md-modifyPwd">
				{/*<TopNav title="修改密码"/>*/}
				<div className="modify-form">
		 			<div className="tips-msg">系统第一次默认使用联系电话作为初始密码。为了安全起见，请修改为您的常用密码。</div>
		 			<div className="form-item">
		 				<label><i className="mandatory-fields">*</i>旧密码:</label>
		 				<input type="password" id="oldPassword" value={this.state.oldPassword} onChange={this.change.bind(this)} placeholder="请输入旧密码"/>
		 			</div>
		 			<div className="form-item">
		 				<label><i className="mandatory-fields">*</i>新密码:</label>
		 				<input type="password" id="newPassword" value={this.state.newPassword} onChange={this.change.bind(this)} placeholder="请输入新密码"/>
		 			</div>
		 			<div className="form-item">
		 				<label><i className="mandatory-fields">*</i>确认新密码:</label>
		 				<input type="password" id="newPassword2" value={this.state.newPassword2} onChange={this.change.bind(this)} placeholder="请再次输入新密码" />
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

export default ModifyPwd;