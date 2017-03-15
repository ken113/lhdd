import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

import TopNav from './topNav';
import BtmNav from './btmNav'

import './../sass/visitor.scss';


class User extends React.Component {
	constructor( props ) {
		super( props );
	}
	render(){

		return(
			<div className="md-visitor">
			 	<TopNav title='常用游客'/>
			 	<div className="top-btn">
			 		<Link to="addVisitor"><span className="plus"><i className="fa fa-user-plus"></i>新增常用游客</span></Link>
			 		<a className="share" href="/addVisitor.html"><span className="share"><i className="fa fa-share-square-o"></i>邀请朋友填写</span></a>
			 	</div>
			 	<div className="user-list">
			 		<Link to="/editVisitor">
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
				 	</Link>
			 	</div>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default User;