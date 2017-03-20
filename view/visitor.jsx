import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import TopNav from './topNav';
import BtmNav from './btmNav';
import touch from 'touchjs';

import { convertDate,modal,setTitle,loading } from './../lib/common';

import './../sass/visitor.scss';


class User extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			travellersList : [],
		}
	}
	componentWillMount(){
		setTitle( '常用游客' );
	}
	componentDidMount(){
		const that = this;
		loading.show();
		axios.post('/Users/GetUserInfo',{
		}).then(function (response) {
			loading.hide();
			const data = response.data;
			
			if( data.ErrorCode === 200 ){

				that.setState({
					travellersList: [ ...data.UserInfo.Travellers ]
				});	

				sessionStorage.setItem( 'CustomerID', data.UserInfo.CustomerID );
			}

			touch.on('.user-box', 'swipeleft', function(ev){
				//ev.startRotate();
			    //ev.originEvent.preventDefault(); 
			    //ev.originEvent.stopPropagation(); 
			    let target = ev.target;
			    if( target.tagName === 'DIV' ){
			    	target.parentNode.parentNode.parentNode.className = 'user-wrap left';
			    }else{
			    	target.parentNode.parentNode.parentNode.parentNode.className = 'user-wrap left';
			    }
			    

			});
			touch.on('.user-box', 'swiperight', function(ev){
				//ev.startRotate();
			    //ev.originEvent.preventDefault(); 
			    //ev.originEvent.stopPropagation(); 
			    let target = ev.target;
			    //debugger;
			    if( target.tagName === 'DIV' ){
			    	target.parentNode.parentNode.parentNode.classList.remove('left');
			    }else{
			    	target.parentNode.parentNode.parentNode.parentNode.classList.remove('left');
			    }
			});
		})
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
			result.parentNode.remove();

		});
	}
	render(){

		//debugger;

		return(
			<div className="md-visitor">
			 	{/*<TopNav title='常用游客'/>*/}
			 	<div className="top-btn">
			 		<Link to="addVisitor"><span className="plus"><i className="fa fa-user-plus"></i>新增常用游客</span></Link>
			 		<a className="share" href="/addVisitor.html"><span className="share"><i className="fa fa-share-square-o"></i>邀请朋友填写</span></a>
			 	</div>
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
			 </div>
		 )
	}
}

export default User;