import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
//import TopNav from './topNav';
import BtmNav from './btmNav';
import touch from 'touchjs';
//import DatePicker from './../component/DatePicker';

import { convertDate,modal,setTitle,loading } from './../lib/common';

import './../sass/visitor.scss';


class User extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			travellersList : [],
			CustomerID: 0
		}
	}
	componentWillMount(){
		setTitle( '常用游客-浪花朵朵' );
		const badDatePicker = sessionStorage.getItem('badDatePicker');
		if( badDatePicker ){
			sessionStorage.removeItem('badDatePicker');
			window.location.reload();
		}
	}
	componentDidMount(){

		const that = this;
		loading.show();
		axios.post('/Users/GetUserInfo',{
		}).then(function (response) {
			loading.hide();
			const data = response.data;
			
			if( data.ErrorCode === 200 ){

				let tl = data.UserInfo.Travellers || [];
				
				that.setState({
					travellersList: [ ...tl ],
					CustomerID:data.UserInfo.CustomerID,
					CustomerName:data.UserInfo.CustomerName,
					EncryptCustomerID:data.UserInfo.EncryptCustomerID
				});	

				sessionStorage.setItem( 'CustomerID', data.UserInfo.CustomerID );
			}

			touch.on('.user-box', 'swipeleft', function(ev){
				ev.startRotate();
			    ev.originEvent.preventDefault(); 
			    ev.originEvent.stopPropagation(); 
			    let target = ev.target;
			    if( target.tagName === 'DIV' ){
			    	target.parentNode.parentNode.parentNode.className = 'user-wrap left';
			    }else{
			    	target.parentNode.parentNode.parentNode.parentNode.className = 'user-wrap left';
			    }
			    

			});
			touch.on('.user-box', 'swiperight', function(ev){
				ev.startRotate();
			    ev.originEvent.preventDefault(); 
			    ev.originEvent.stopPropagation(); 
			    let target = ev.target;
			    //debugger;
			    if( target.tagName === 'DIV' ){
			    	target.parentNode.parentNode.parentNode.classList.remove('left');
			    }else{
			    	target.parentNode.parentNode.parentNode.parentNode.classList.remove('left');
			    }
			});

			/*touch.on('.md-visitor', 'swipeup', function(ev){
				//debugger;
				const wrap = document.getElementsByClassName('md-visitor')[0];
				//wrap.scrollTop += 200;
			});
			touch.on('.md-visitor', 'swipedown', function(ev){
				//debugger;
				const wrap = document.getElementsByClassName('md-visitor')[0];
				//wrap.scrollTop -= 200;
			});*/

		})

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
	deleteUser(e){
		//debugger;
		let target = e.target, 
			travellerId = target.dataset.travellerid,
			that = this;
		modal.confirm( '确认删除该旅客?',function(){
			
			axios.post('/Users/DelTraveller',{
				id : travellerId
			}).then(function (response) {
				const data = response.data;
				
				if( data.ErrorCode === 200 ){
					target.parentNode.remove();
				}
			});
			//target.parentNode.remove();

		});
	}
	copyUrl(){

		/*const copy = document.getElementById('copyUrl');
		if( copy.style.display === 'none' ){
			copy.style.display = 'block';
		}else{
			copy.style.display = 'none';
		}*/
	}
	render(){

		//debugger;
		const copyUrl = 'http://' + window.location.host+'/wap/addVisitor.html?EncryptCustomerID='+this.state.EncryptCustomerID;

		return(
			<div className="md-visitor">
			 	{/*<TopNav title='常用游客'/>*/}
			 	<div className="top-btn">
			 		<Link to="addVisitor"><span className="plus"><i className="fa fa-user-plus"></i>新增常用游客</span></Link>
			 		<a className="share copybtn" onClick={this.copyUrl.bind(this)} data-clipboard-text={'我正在为你预定旅行产品,需要你填写信息!\n'+copyUrl}><span className=""><i className="fa fa-share-square-o"></i>邀请朋友填写</span></a>
			 	</div>
			 	<div className="copy-url" id="copyUrl" style={{ display:'none'}}>{ copyUrl }</div>
			 	<div className="copy-msg-tips">链接已复制，发给朋友填写！</div>
			 	<div className="user-list">
			 		{/*<Link to="/editVisitor">
				 		<div className="user-box">
				 			<div className="username"><label>袁丁</label><span>YUANDINT</span></div>
				 			<div className="userelse"><label>护照号</label><span>G234242</span></div>
				 			<div className="userelse"><label>生日</label><span>2013-01-12</span><i className="icon-right fa fa-angle-right"></i></div>
				 			<div className="userelse"><label>性别</label><span>男</span></div>
				 			<div className="userelse"><label>附加资料</label><span className="weitianxie">未填写</span></div>
				 		</div>
			 		</Link>
			 		<Link to="/editVisitor">
				 		<div className="user-box">
				 			<div className="username"><label>袁丁1</label><span>YUANDINT</span></div>
				 			<div className="userelse"><label>护照号</label><span>G234242</span></div>
				 			<div className="userelse"><label>生日</label><span>2013-01-12</span><i className="icon-right fa fa-angle-right"></i></div>
				 			<div className="userelse"><label>性别</label><span>男</span></div>
				 			<div className="userelse"><label>附加资料</label><span className="">已填写</span></div>
				 		</div>
				 	</Link>*/
				 	this.state.travellersList.map( (result,index) => (
				 		<div className="user-wrap" key={index} >
						 	<div className="user-box">
						 		<Link to={'editVisitor/?TravellerID=' + result.TravellerID } key={index}>
						 			<div className="username"><label>{result.TravellerName}</label><span>{result.TravellerEnname}</span></div>
						 			<div className="userelse"><label>护照号</label><span>{result.PassportNo}</span></div>
						 			<div className="userelse"><label>生日</label><span>{ result.Birthday.substring(0,10)}</span><i className="icon-right fa fa-angle-right"></i></div>
						 			<div className="userelse"><label>性别</label><span>{result.TravellerSex === 0 ? '男' : '女' }</span></div>
						 			<div className="userelse"><label>附加资料</label><span className={result.TravellerDetail.Height ? '':'weitianxie'}>{result.TravellerDetail.Height ? '已填写':'未填写'}</span></div>
						 		</Link>
						 	</div>
					 		<div className="user-delete" data-travellerId={result.TravellerID} onClick={this.deleteUser.bind(this)}>删除</div>
					 	</div>
					))}
			 	</div>
			 	<BtmNav/>
			 	{/*<DatePicker/>*/}
			 </div>
		 )
	}
}

export default User;