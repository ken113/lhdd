import React from 'react';
import { render } from 'react-dom';

import TopNav from './topNav';
import BtmNav from './btmNav';
import classnames from 'classnames';
import axios from 'axios';
import { setTitle,loading } from './../lib/common';
import './../sass/order.scss';


class Order extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			pendingList:[],
			tripList:[],
			allList:[]
		}
	}
	componentWillMount(){
		setTitle( '我的订单' );
	}
	componentDidMount(){

		const that = this;
		loading.show();
		axios.post('/Orders/GetPendingOrders',{
		}).then(function (response) {

			const data = response.data;
			if( data.ErrorCode === 200 ){
				that.setState({
					pendingList:[...data.Orders ]
				});	
			}
			loading.hide();
		})

		axios.post('/Orders/GetTripOrders',{
		}).then(function (response) {
			
			const data = response.data;
			if( data.ErrorCode === 200 ){
				that.setState({
					tripList:[...data.Orders ]
				});	
			}
		})

		
	}
	showAll(){
		let that = this;
		
		axios.post('/Orders/GetAllOrders',{
		}).then(function (response) {
			
			const data = response.data;
			
			that.setState({
				allList:[...data.Orders ]
			});	
			
		})
	}
	render(){

		return(
			 <div className="md-order">
			 	{/*<TopNav title='我的订单'/>*/}
			 	<section className="order-box pending">
			 		<div className="title">
			 			<span>待处理订单</span>
			 			<p className="line"></p>
			 		</div>
			 		<div className="order-list">
			 			{/*<div className="order-info">
			 				<div className="if-lf">
			 					<div className="order-title">【InSee】浪花中文斯米兰一日游</div>
			 					<div className="order-person">人数:
			 						<span><em>2</em>成人</span>
			 						<span><em>0</em>儿童</span>
			 						<span><em>1</em>婴儿</span>
			 					</div>
			 				</div>
			 				<div className="if-rt weitianxie">
			 					<i className="fa fa-ellipsis-h"></i>
			 					<span className="">未填写</span>
			 				</div>
			 			</div>
			 			<div className="order-info">
			 				<div className="if-lf">
			 					<div className="order-title">【InSee】浪花中文斯米兰一日游</div>
			 					<div className="order-person">人数:
			 						<span><em>2</em>成人</span>
			 						<span><em>0</em>儿童</span>
			 						<span><em>1</em>婴儿</span>
			 					</div>
			 				</div>
			 				<div className="if-rt daihedui">
			 					<i className="fa fa-ellipsis-h"></i>
			 					<span className="">待核对</span>
			 				</div>
			 			</div>*/
			 			this.state.pendingList.map( (result,index) => (
			 				<div className="order-info" key={index}>
				 				<div className="if-lf">
				 					<div className="order-title">{result.cnItemName}</div>
				 					<div className="order-person">人数:
				 						<span><em>{result.AdultNum}</em>成人</span>
				 						<span><em>{result.ChildNum}</em>儿童</span>
				 						<span><em>{result.INFNum}</em>婴儿</span>
				 					</div>
				 				</div>
				 				<div className={ classnames('if-rt', { weitianxie : result.stateName == '未填写',
				 														daihedui:result.stateName == '待核对'} )  }>
				 					<i className="fa fa-ellipsis-h"></i>
				 					<span className="">{result.stateName}</span>
				 				</div>
				 			</div>
			 			))}
			 		</div>
			 	</section>
			 	<section className="order-box confirm">
			 		<div className="title">
			 			<span>已确认订单</span>
			 			<p className="line"></p>
			 		</div>
			 		<div className="order-list">
			 			{this.state.tripList.map( (result,index) => (
			 				<div className="order-info" key={index}>
				 				<div className="if-lf">
				 					<div className="order-title">{result.cnItemName}</div>
				 					<div className="order-person">人数:
				 						<span><em>{result.AdultNum}</em>成人</span>
				 						<span><em>{result.ChildNum}</em>儿童</span>
				 						<span><em>{result.INFNum}</em>婴儿</span>
				 					</div>
				 				</div>
				 				<div className="if-rt yiqueren">
				 					<i className="fa fa-check"></i>
				 					<span className="">{result.stateName}</span>
				 				</div>
				 			</div>
			 			))}
			 		</div>
			 	</section>
			 	<section className="order-box confirm">
			 		<div className="title" onClick={this.showAll.bind(this)}>
			 			<span>查看全部订单</span>
			 			<p className="line"></p>
			 		</div>
			 		<div className="order-list">
			 			{this.state.allList.map( (result,index) => (
			 				<div className="order-info" key={index}>
				 				<div className="if-lf">
				 					<div className="order-title">{result.cnItemName}</div>
				 					<div className="order-person">人数:
				 						<span><em>{result.AdultNum}</em>成人</span>
				 						<span><em>{result.ChildNum}</em>儿童</span>
				 						<span><em>{result.INFNum}</em>婴儿</span>
				 					</div>
				 				</div>
				 				<div className={ classnames('if-rt', { weitianxie : result.stateName == '未填写',
				 														daihedui:result.stateName == '待核对',
				 														yiqueren: result.stateName =='已确认'} )  }>
				 					{ result.stateName == '已确认' ? <i className="fa fa-check"></i> : <i className="fa fa-ellipsis-h"></i> }
				 					<span className="">{result.stateName}</span>
				 				</div>
				 			</div>
			 			))}
			 		</div>
			 	</section>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default Order;




