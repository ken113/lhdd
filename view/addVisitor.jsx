import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
//import DatePicker from 'react-mobile-datepicker';
import { convertDate,modal,setTitle } from './../lib/common';
import axios from 'axios';
//import TopNav from './topNav';
import BtmNav from './btmNav'

import './../sass/addVisitor.scss';

class AddVisitor extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			dateFormat: ['YYYY年', 'MM月', 'DD日'],
			time : new Date(),
			isOpen: false,
			en_username:'',
			EncryptCustomerID:'',
		}
	}
	componentWillMount(){
		setTitle('新增-常用游客-浪花朵朵');
	}
	componentDidMount(){

		setTimeout(function(){
			document.getElementsByClassName('md-nav')[0].getElementsByTagName('a')[1].className += ' selected';
		},0);
		const that = this;

		axios.post('/Users/GetUserInfo',{
		}).then(function (response) {
			const data = response.data;
			
			if( data.ErrorCode === 200 ){

				that.setState({
					EncryptCustomerID:data.UserInfo.EncryptCustomerID
				});	
			}
		})

		var years = [];
		for(var i = 1930;i<2018;i++){
			years.push( i );
		}
		$('#brithday').mdatetimer({ 
	        mode : 1, //时间选择器模式 
	        format : 2, //时间格式化方式 
	        years : years, //年份数组 
	        nowbtn : false //是否显示现在按钮 
		});

		sessionStorage.setItem('badDatePicker','xxxxxxx');

		var clipboard  = new Clipboard('.copybtn');
		clipboard.on('success', function(e) {
		    //modal.success('链接已复制，发给朋友填写！',false);
		    document.getElementsByClassName('copy-msg-tips')[0].className += ' show';

		    setTimeout(function(){
		    	 document.getElementsByClassName('copy-msg-tips')[0].className = 'copy-msg-tips';
		    },1200);

		    e.clearSelection();

		});

		clipboard.on('error', function(e) {
		    modal.error('复制失败，推荐使用微信浏览器');
		});
		
	}
	handleClick(){
		this.setState({ isOpen: true });
	}
	handleCancel(){
		this.setState({ isOpen: false });
	}
	handleSelect( time ){
		this.setState({ time, isOpen: false });
	}
	change(e){
		this.setState({ time, isOpen: false });
	}
	changeSex( e ){

		const sex = document.getElementById('sex');
		if( e.target.value === '男' ){
			sex.value = '女';
		}else{
			sex.value = '男';
		}
	}
	save(){

		const that = this,
			CustomerID = sessionStorage.getItem('CustomerID'),
			TravellerName = document.getElementById('username').value.trim(),
			TravellerEnname = document.getElementById('en_username').value.trim(),
			PassportNo = document.getElementById('passport').value.trim(),
			TravellerSex = document.getElementById('sex').value;

		if( !TravellerName ){
			modal.error('请填写中文姓名');
			return;
		}
		if( !/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test( TravellerName ) ){
			modal.error('中文姓名填写有误');
			return;
		}
		if( !TravellerEnname ){
			modal.error('请填写英文姓名');
			return;
		}
		if( !/^[A-Za-z]+$/.test( TravellerEnname ) ){
			modal.error('英文姓名填写有误');
			return;
		}
		if( !PassportNo ){
			modal.error('请填写护照号码');
			return;
		}
		if( !/^[0-9a-zA-Z]*$/.test( PassportNo ) ){
			modal.error('护照号码填写有误');
			return;
		}
		/*if( !/^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test( PassportNo ) ){
			modal.error('护照号码填写有误');
			return;
		}
		if( !/^((^[a-zA-Z]\d{8}$))/.test( PassportNo ) ){
			modal.error('护照号码填写有误');
			return;
		}*/
		if( PassportNo.length === 15 ){

			let sexNum = PassportNo.substring(14);
			if( sexNum % 2 === 0 && TravellerSex === '男' ){
				modal.error('性别选择有误');
				return;
			}
			if( sexNum % 2 === 1 && TravellerSex === '女' ){
				modal.error('性别选择有误');
				return;
			}

		}
		if( PassportNo.length === 18 ){

			let sexNum = PassportNo.substring(16,17);
			if( sexNum % 2 === 0 && TravellerSex === '男' ){
				modal.error('性别选择有误');
				return;
			}
			if( sexNum % 2 === 1 && TravellerSex === '女' ){
				modal.error('性别选择有误');
				return;
			}

		}

		if( CustomerID ){
			addUser();
		}else{
			axios.post('/Users/GetUserInfo',{
			}).then(function (response) {
				sessionStorage.setItem('CustomerID',response.data.UserInfo.CustomerID );
				addUser();
			})
		}

		function addUser(){
			axios.post('/Users/AddTraveller',{
				CustomerID: sessionStorage.getItem('CustomerID'),
				TravellerName: document.getElementById('username').value,
				TravellerEnname: document.getElementById('en_username').value,
				PassportNo:document.getElementById('passport').value,
				Birthday:convertDate(that.state.time,'YYYY-MM-DD'),
				TravellerSex: document.getElementById('sex').value === '男' ? 0 : 1
			}).then(function (response) {

				const data = response.data;
				if( data.ErrorCode === 200 ){
					modal.success('新增成功');
					setTimeout(function(){
						document.getElementById('md-modal-success').classList.remove('show');
						window.location.hash = "#/visitor";
					},1000);
				}else{
					modal.error( data.ErrorMessage );
				}
			})
		}

		
	}
	cancel(){
		window.location.hash = "#/visitor";
	}
	calendarShow(){
		document.getElementsByClassName('mt_mask')[0].className += ' show';
		document.getElementById('mdatetimer').className += ' show';
	}
	changeEnName(e){
		const en_username = e.target.value.toLocaleUpperCase();
		this.setState({
			en_username,
		})
	}
	changePassort( e ){
		let passport = e.target.value.trim(),
			sexSelect = document.getElementById('sex'),
			sexNum = 1; //奇数为男性，偶数为女性
		if( passport.length === 15 ){
			sexNum = passport.substring(14);
			if( sexNum % 2 ){
				sexSelect.value = '男';
			}else{
				sexSelect.value = '女';
			}
		}
		if( passport.length === 18 ){
			sexNum = passport.substring(16,17);

			if( sexNum % 2 ){
				sexSelect.value = '男';
			}else{
				sexSelect.value = '女';
			}
		}
	}
	render(){

		const copyUrl = 'http://' + window.location.host+'/wap/addVisitor.html?EncryptCustomerID='+this.state.EncryptCustomerID;

		return(
			 <div className="md-addVisitor">
			 	{/*<TopNav title='新增常用游客'/>*/}
			 		<div className="add-form">
			 			<div className="tips-msg">一次输入，永久保存，多次选择使用，更加方便</div>
			 			<div className="form-item">
			 				<label><i className="mandatory-fields">*</i>中文姓名:</label>
			 				<input type="text" id="username" placeholder="张三"/>
			 			</div>
			 			<div className="form-item">
			 				<label><i className="mandatory-fields">*</i>姓名拼音:</label>
			 				<input type="text" id="en_username" placeholder="ZHANGSAN" onChange={this.changeEnName.bind(this)} value={this.state.en_username}/>
			 			</div>
			 			<div className="form-item">
			 				<label><i className="mandatory-fields">*</i>护照号码:</label>
			 				<input type="text" id="passport" placeholder="护照号" onChange={this.changePassort.bind(this)}/>
			 			</div>
			 			<div className="form-item">
			 				<label><i className="mandatory-fields">*</i>生日:</label>
			 				<span className="calendar-box">
			 					{/*<input id="brithday" type="text" readOnly onClick={this.handleClick.bind(this)} value={convertDate(this.state.time,'YYYY-MM-DD')} onChange={this.change.bind(this)} />*/}
			 					<input id="brithday" type="text" readOnly  onClick={this.calendarShow.bind(this)}/>
			 					<i className="icon-calendar fa fa-calendar"></i>
			 				</span>
			 				{/*<DatePicker  theme="ios" dateFormat={this.state.dateFormat} value={this.state.time} isOpen={this.state.isOpen} 
			 					onSelect={this.handleSelect.bind(this)} onCancel={this.handleCancel.bind(this)} />*/}
			 			</div>
			 			<div className="form-item">
			 				<label>性别:</label>
			 				{/*<input type="text" id="sex" value='男' readOnly onClick={this.changeSex.bind(this)}/>*/}
			 				<select id="sex">
			 					<option value="男">男</option>
			 					<option value="女">女</option>
			 				</select>
			 			</div>
			 		</div>
			 		<div className="btm-btn">
			 			<button className="copybtn" data-clipboard-text={'我正在为你预定旅行产品,需要你填写信息!\n'+copyUrl}>邀请朋友填写</button>
			 			<button onClick={this.save.bind(this)}>保存</button>
			 			<button className="cancel" onClick={this.cancel.bind(this)}>取消</button>
			 		</div>
			 	<BtmNav/>
			 	<div className="copy-msg-tips">链接已复制，发给朋友填写！</div>
			 </div>
		 )
	}
}

export default AddVisitor;