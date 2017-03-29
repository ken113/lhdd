import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { getUrlParam,convertDate,modal,setTitle } from './../lib/common';
//import DatePicker from 'react-mobile-datepicker';
//import TopNav from './topNav';
import BtmNav from './btmNav'
import axios from 'axios';

import './../sass/editVisitor.scss';


class EditVisitor extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			TravellerID:0,
			Birthday:convertDate(new Date(),'YYYY-MM-DD'),
			TravellerEnname:'',
			TravellerName:'',
			PassportNo:'',
			TravellerSex:'',
			TravellerDetail:{
				Height:'',
				ClothesSize:'',
				GlassesNum:'',
				ShoesSize:'',
				Weight:'',
			},
			time : new Date(),
			isOpen: false,
		}
	}
	componentWillMount(){
		setTitle('修改-常用游客-浪花朵朵');
	}
	componentDidMount(){


		setTimeout(function(){
			document.getElementsByClassName('md-nav')[0].getElementsByTagName('a')[1].className += ' selected';
		},0);

		const that = this,
			travellerId = getUrlParam( 'TravellerID' );

		axios.post('/Users/GetUserInfo',{
		}).then(function (response) {

			let data = response.data,
				travellers = null;
			
			if( data.ErrorCode === 200 ){

				for(let i = 0;i<data.UserInfo.Travellers.length;i++ ){
					if( travellerId == data.UserInfo.Travellers[i].TravellerID ){
						travellers = data.UserInfo.Travellers[i];
						break;
					}
				}

				if( !travellers.TravellerDetail.Height ){
					travellers.TravellerDetail.Height = '';
				}
				if( !travellers.TravellerDetail.ClothesSize ){
					travellers.TravellerDetail.ClothesSize = '';
				}
				if( !travellers.TravellerDetail.GlassesNum ){
					travellers.TravellerDetail.GlassesNum = '';
				}
				if( !travellers.TravellerDetail.ShoesSize ){
					travellers.TravellerDetail.ShoesSize = '';
				}
				if( !travellers.TravellerDetail.Weight ){
					travellers.TravellerDetail.Weight = '';
				}

				that.setState({
					TravellerID:travellers.TravellerID,
					Birthday:travellers.Birthday.substr(0,10),
					TravellerEnname:travellers.TravellerEnname,
					TravellerName:travellers.TravellerName,
					PassportNo:travellers.PassportNo,
					TravellerSex:travellers.TravellerSex ? '女' : '男',
					TravellerDetail:travellers.TravellerDetail,
				})

				if( travellers.TravellerDetail.Height ){
					document.getElementById('elseCheckBox').click();

					//document.documentElement.style.height = document.getElementsByClassName('user-form')[0].clientHeight;
				}
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

	}
	showElse( e ){
		//debugger;
		const elseBox = document.getElementById('elseBox'),
			target = e.target;

		if( target.tagName === 'INPUT' ){

			setTimeout(function(){
				if( target.checked ){
					elseBox.className = 'ei-box show';
				}else{
					elseBox.className = 'ei-box';
				}
			},10);

		}else{
			let checkbox = target.getElementsByTagName('input')[0];
			if( checkbox.checked ){
				elseBox.className = 'ei-box';
				checkbox.checked = false;
			}else{
				elseBox.className = 'ei-box show';
				checkbox.checked = true;
			}
		}
		

	}
	changeInput(e){
		
		this.setState({
			TravellerEnname:document.getElementById('en_username').value.toLocaleUpperCase().trim(),
			TravellerName:document.getElementById('username').value.trim(),
			PassportNo:document.getElementById('passport').value.trim(),
			TravellerDetail:{
				Height:document.getElementById('height').value.trim(),
				ClothesSize:document.getElementById('clothesSize').value.toLocaleUpperCase().trim(),
				GlassesNum:document.getElementById('glassesNum').value.trim(),
				ShoesSize:document.getElementById('shoesSize').value.trim(),
				Weight:document.getElementById('weight').value.trim(),
			},
		});

		if( e.target.id === 'sex' ){
			this.setState({
				TravellerSex:e.target.value
			});
		}
	}
	save(){

		let that = this,
			TravellerName = this.state.TravellerName,
			TravellerEnname = this.state.TravellerEnname,
			PassportNo = this.state.PassportNo,
			TravellerSex = this.state.TravellerSex;

		if( !TravellerName ){
			modal.error('请填写中文姓名');
			return;
		}
		if( !/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test( TravellerName ) ){
			modal.error('中文姓名填写有误');
			return;
		}
		if( !TravellerEnname ){
			modal.error('请填写姓名拼音');
			return;
		}
		if( !/^[A-Za-z]+$/.test( TravellerEnname ) ){
			modal.error('姓名拼音填写有误');
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

		//附加资料
		if( document.getElementById('elseCheckBox').checked ){

			const Height = document.getElementById('height').value,
				ClothesSize = document.getElementById('clothesSize').value,
				GlassesNum = document.getElementById('glassesNum').value,
				ShoesSize = document.getElementById('shoesSize').value,
				Weight = document.getElementById('weight').value;

			if( !Height ){
				modal.error('请填写身高');
				return;
			}
			if( !/^[0-9]*$/.test(Height) ){
				modal.error('身高填写有误');
				return;
			}
			if( !Weight ){
				modal.error('请填写体重');
				return;
			}
			if( !/^[0-9]*$/.test(Weight) ){
				modal.error('填写填写有误');
				return;
			}
			if( !ShoesSize ){
				modal.error('请填写鞋子码数');
				return;
			}
			if( !/^[0-9]*$/.test(ShoesSize) ){
				modal.error('鞋子码数填写有误');
				return;
			}
			if( !/^[A-Za-z]*$/.test(ClothesSize) ){
				modal.error('衣服码数填写有误');
				return;
			}
			if( !/^[0-9]*$/.test(GlassesNum) ){
				modal.error('近视度数填写有误');
				return;
			}

		}

		axios.post('/Users/EditTraveller',{
			TravellerID: that.state.TravellerID,
			TravellerName:that.state.TravellerName,
			TravellerEnname:that.state.TravellerEnname,
			PassportNo:that.state.PassportNo,
			Birthday:that.state.Birthday,
			TravellerSex: document.getElementById('sex').value === '男' ? 0 : 1
		}).then(function (response) {

			let data = response.data;
			if( data.ErrorCode === 200 ){
				

				if( document.getElementById('elseCheckBox').checked ){ 

					const date = +new Date();

					axios.post('/Users/EditTravellerDetail?t='+date,{
						TravellerID: that.state.TravellerID,
						TravellerDetail:{
							Height:document.getElementById('height').value,
							ClothesSize:document.getElementById('clothesSize').value,
							GlassesNum:document.getElementById('glassesNum').value,
							ShoesSize:document.getElementById('shoesSize').value,
							Weight:document.getElementById('weight').value,
						}
					}).then(function (response) {

						modal.success('修改成功',function(){
							window.location.hash = "#/visitor";
						});

					})
				}else{

					modal.success('修改成功',function(){
						window.location.hash = "#/visitor";
					});
					

				}
			}else{
				modal.error('修改失败');
			}
		})
	}
	showDatePicker(e){
		e.stopPropagation();
		e.preventDefault();
		$('#mdatetimer').removeClass('show');
		$('.mt_mask').removeClass('show');
		setTimeout(function(){
			//debugger;
			$('#mdatetimer').addClass('show');
			$('.mt_mask').addClass('show');
		},333)
		

	}
	render(){

		return(
			 <div className="md-editVisitor">
			 	{/*<TopNav title='修改常用游客'/>*/}
			 	<div className="user-form">
			 		<div className="base-info">
			 			<h3>基本资料<span style={{display:'none'}}><input type="checkbox" />设为本人</span></h3>
			 			<div className="form-item">
			 				<label><i className="mandatory-fields">*</i>中文姓名:</label>
			 				<input type="text" id="username" value={this.state.TravellerName} onChange={this.changeInput.bind(this)} placeholder="张三"/>
			 			</div>
			 			<div className="form-item">
			 				<label><i className="mandatory-fields">*</i>姓名拼音:</label>
			 				<input type="text" id="en_username" value={this.state.TravellerEnname} onChange={this.changeInput.bind(this)} placeholder="ZHANGSAN"/>
			 			</div>
			 			<div className="form-item">
			 				<label><i className="mandatory-fields">*</i>护照号码:</label>
			 				<input type="text" id="passport" value={this.state.PassportNo} onChange={this.changeInput.bind(this)} placeholder="请输入护照号码"/>
			 			</div>
			 			<div className="form-item" onClick={this.showDatePicker.bind(this)}>
			 				<label><i className="mandatory-fields">*</i>生日:</label>
			 				<span className="calendar-box">
			 					<input id="brithday" type="text" readOnly  value={this.state.Birthday} onChange={this.changeInput.bind(this)} placeholder="选择出生日期"/>
			 					<i className="icon-calendar fa fa-calendar"></i>
			 				</span>
			 			</div>
			 			<div className="form-item">
			 				<label>性别:</label>
			 				<select id="sex" value={this.state.TravellerSex} onChange={this.changeInput.bind(this)}>
			 					<option value="男">男</option>
			 					<option value="女">女</option>
			 				</select>
			 			</div>
			 		</div>
			 		<div className="else-info">
			 			<h3 onClick={this.showElse.bind(this)} ><input type="checkbox" id="elseCheckBox"/>附加资料</h3>
			 			<div className="ei-box" id="elseBox">
			 				<div className="form-item">
				 				<label><i className="mandatory-fields">*</i>身高:(CM)</label>
				 				<input type="text" id="height" value={this.state.TravellerDetail.Height} onChange={this.changeInput.bind(this)} placeholder="如:175"/>
				 			</div>
				 			<div className="form-item">
				 				<label><i className="mandatory-fields">*</i>体重:(KG)</label>
				 				<input type="text" id="weight" value={this.state.TravellerDetail.Weight} onChange={this.changeInput.bind(this)} placeholder="如:65"/>
				 			</div>
				 			<div className="form-item">
				 				<label><i className="mandatory-fields">*</i>鞋子码数:</label>
				 				<input type="text" id="shoesSize" value={this.state.TravellerDetail.ShoesSize} onChange={this.changeInput.bind(this)} placeholder="如:43"/>
				 			</div>
				 			<div className="form-item">
				 				<label>衣服码数:</label>
				 				<input type="text" id="clothesSize" value={this.state.TravellerDetail.ClothesSize } onChange={this.changeInput.bind(this)} placeholder="如:XL"/>
				 			</div>
				 			<div className="form-item">
				 				<label>近视度数:</label>
				 				<input type="text" id="glassesNum" value={this.state.TravellerDetail.GlassesNum} onChange={this.changeInput.bind(this)} placeholder="如:200"/>
				 			</div>
			 			</div>
			 		</div>

			 		<div className="btm-btn">
			 			<button onClick={this.save.bind(this)}>保存</button>
			 		</div>
			 	</div>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default EditVisitor;