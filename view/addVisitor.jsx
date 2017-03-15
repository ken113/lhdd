import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import DatePicker from 'react-mobile-datepicker';
import { convertDate } from './../lib/common';

import TopNav from './topNav';
import BtmNav from './btmNav'

import './../sass/addVisitor.scss';

class AddVisitor extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			dateFormat: ['YYYY年', 'MM月', 'DD日'],
			time : new Date(),
			isOpen: false,
		}
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
	render(){

		return(
			 <div className="md-addVisitor">
			 	<TopNav title='新增常用游客'/>
			 		<div className="add-form">
			 			<div className="tips-msg">一次输入，永久保存，多次使用，更加方便</div>
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
			 				<label>生日:</label>
			 				<span className="calendar-box">
			 					<input type="text" readOnly onClick={this.handleClick.bind(this)} value={convertDate(this.state.time,'YYYY-MM-DD')} onChange={this.change.bind(this)} />
			 					<i className="icon-calendar fa fa-calendar"></i>
			 				</span>
			 				<DatePicker  theme="ios" dateFormat={this.state.dateFormat} value={this.state.time} isOpen={this.state.isOpen} 
			 					onSelect={this.handleSelect.bind(this)} onCancel={this.handleCancel.bind(this)} />
			 			</div>
			 			<div className="form-item">
			 				<label>性别:</label>
			 				<input type="text"/>
			 			</div>
			 		</div>
			 		<div className="btm-btn">
			 			<button>保存</button>
			 			<button className="cancel">取消</button>
			 		</div>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default AddVisitor;