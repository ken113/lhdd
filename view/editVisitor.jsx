import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

import TopNav from './topNav';
import BtmNav from './btmNav'

import './../sass/editVisitor.scss';


class EditVisitor extends React.Component {
	constructor( props ) {
		super( props );
	}
	showElse( e ){
		//debugger;

		if( e.target.checked ){
			document.getElementById('elseBox').className = 'ei-box show';
		}else{
			document.getElementById('elseBox').className = 'ei-box';
		}

	}
	render(){

		return(
			 <div className="md-editVisitor">
			 	<TopNav title='修改常用游客'/>
			 	<div className="user-form">
			 		<div className="base-info">
			 			<h3>基本资料<span><input type="checkbox"/>设为本人</span></h3>
			 			<div className="form-item">
			 				<label>中文姓名:</label>
			 				<input type="text"/>
			 			</div>
			 			<div className="form-item">
			 				<label>姓名拼音:</label>
			 				<input type="text"/>
			 			</div>
			 			<div className="form-item">
			 				<label>护照号码:</label>
			 				<input type="text"/>
			 			</div>
			 			<div className="form-item">
			 				<label>生日</label>
			 				<input type="text"/>
			 			</div>
			 			<div className="form-item">
			 				<label>性别</label>
			 				<input type="text"/>
			 			</div>
			 		</div>
			 		<div className="else-info">
			 			<h3><input type="checkbox" onClick={this.showElse.bind(this)}/>附加资料</h3>
			 			<div className="ei-box" id="elseBox">
			 				<div className="form-item">
				 				<label>身高:(CM)</label>
				 				<input type="text"/>
				 			</div>
				 			<div className="form-item">
				 				<label>体重:(KG)</label>
				 				<input type="text"/>
				 			</div>
				 			<div className="form-item">
				 				<label>鞋子码数:</label>
				 				<input type="text"/>
				 			</div>
				 			<div className="form-item">
				 				<label>衣服码数:</label>
				 				<input type="text"/>
				 			</div>
				 			<div className="form-item">
				 				<label>近视度数:</label>
				 				<input type="text"/>
				 			</div>
			 			</div>
			 		</div>

			 		<div className="btm-btn">
			 			<button>保存</button>
			 		</div>
			 	</div>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default EditVisitor;