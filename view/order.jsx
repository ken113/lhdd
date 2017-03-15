import React from 'react';
import { render } from 'react-dom';

import TopNav from './topNav';
import BtmNav from './btmNav';

import './../sass/order.scss';


class Order extends React.Component {
	constructor( props ) {
		super( props );
	}
	render(){

		return(
			 <div className="md-order">
			 	<TopNav title='我的订单'/>
			 	<section className="order-box pending">
			 		<div className="title">
			 			<span>待处理订单</span>
			 			<p className="line"></p>
			 		</div>
			 		<div className="order-list">
			 			<div className="order-info">
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
			 			</div>
			 		</div>
			 	</section>
			 	<section className="order-box confirm">
			 		<div className="title">
			 			<span>已确认订单</span>
			 			<p className="line"></p>
			 		</div>
			 		<div className="order-list">
			 			<div className="order-info">
			 				<div className="if-lf">
			 					<div className="order-title">【InSee】浪花中文斯米兰一日游</div>
			 					<div className="order-person">人数:
			 						<span><em>2</em>成人</span>
			 						<span><em>0</em>儿童</span>
			 						<span><em>1</em>婴儿</span>
			 					</div>
			 				</div>
			 				<div className="if-rt yiqueren">
			 					<i className="fa fa-check"></i>
			 					<span className="">已确认</span>
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
			 				<div className="if-rt yiqueren">
			 					<i className="fa fa-check"></i>
			 					<span className="">已确认</span>
			 				</div>
			 			</div>
			 		</div>
			 	</section>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default Order;




