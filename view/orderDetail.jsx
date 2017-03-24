import React from 'react';
import { render } from 'react-dom';

//import TopNav from './topNav';
import BtmNav from './btmNav';
import classnames from 'classnames';
import axios from 'axios';
import { setTitle,loading,getUrlParam } from './../lib/common';
import './../sass/orderDetail.scss';


class OrderDetail extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			CustomerName:'',
			cnItemName:'',
			SupplierCode:'',
			CustomerTBCode:''
		}
	}
	componentWillMount(){
		setTitle( '订单详情' );
	}
	componentDidMount(){
		setTimeout(function(){
			document.getElementsByClassName('md-nav')[0].getElementsByTagName('a')[0].className += ' selected';
		},0);
		const that = this;
		loading.show();
		axios.post('/Orders/GetOrderDetail',{
			id: getUrlParam('OrderID'),
		}).then(function (response) {

			const data = response.data;
			if( data.ErrorCode === 200 ){

				document.getElementsByClassName('detail-table')[0].innerHTML = data.OrderDetail.Html;

				that.setState({
					CustomerName:data.OrderDetail.CustomerName,
					cnItemName:data.OrderDetail.cnItemName,
					SupplierCode:data.OrderDetail.SupplierCode,
					CustomerTBCode:data.OrderDetail.CustomerTBCode
				});
			}
			loading.hide();
		})
	}

	render(){

		const pageTitle = this.state.SupplierCode + '-' + this.state.CustomerName + '-' +this.state.CustomerTBCode +'-' + this.state.cnItemName;

		return(
			 <div className="md-orderDetail">
			 	<div className='top-user-name'>{pageTitle}</div>
			 	<div id="onebookingorder" className="bookingorder" data-servicetype="2">
				    <div className="orderdetailtitle" style={{textAlign:'center'}}>
				        <span className="icon"><img src="images/dodotour_logo.png" /></span>
				        <span className="word">预订单 Booking Sheet</span>
				    </div>
				    
				    <div className="detail-table"></div>
				    <div className="QR-CODE">
				        <div className="left">
				            <img src="images/QR_WeiX_Tmall.jpg"/>
				            <div className="marktips">
				                <div className="one-line">扫码好处多多</div>
				                <div className="one-line">快速优惠预订</div>
				                <div className="one-line">订单状态通知</div>
				                <div className="one-line">确认单随身带</div>
				            </div>
				            <div className="line-vertical"></div>
				        </div>
				        <div className="right">
				            产品服务信息：本产品由 dodotour 提供服务，本公司不是组团社，仅代游客进行预订，一切责任由提供产品的当地旅游经营者承担。
				        </div>
				    </div>
				</div>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default OrderDetail;



