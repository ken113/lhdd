import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
//import TopNav from './topNav';
import BtmNav from './btmNav';
import classnames from 'classnames';
import axios from 'axios';
import { setTitle,loading,modal } from './../lib/common';
import './../sass/order.scss';


class Order extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			pendingList:[],
			tripList:null,
			tripDate:[],
			allList:[]
		}
	}
	componentWillMount(){
		setTitle( '行程-浪花朵朵' );
		const badDatePicker = sessionStorage.getItem('badDatePicker');
		if( badDatePicker ){
			sessionStorage.removeItem('badDatePicker');
			window.location.reload();
		}
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

				let dates = [];
				for(let item of data.Orders ){
					dates.push( item.TravelDate );
				}

				dates = [...new Set( dates ) ];

				let newData = { };
				for(let i=0;i<dates.length;i++){
					newData[ dates[i] ] = [];
					data.Orders.forEach(function( item,index ){

						if( dates[i] === item.TravelDate ){
							newData[ dates[i] ].push( item );
						}
					})
				}

				that.setState({
					tripDate:[ ...dates ],
					tripList:newData
				});
			}
		})
	}
	componentDidUpdate(){
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
	goNext( status,orderId ){
		
		if( status === 0 ){
			window.location.href = '/wap/modifyOrder.html?OrderID=' + orderId;
		}else if( status === 10 ){
			modal.alert('请联系旺旺客服帮您处理订单');
		}else if( status ===  20 ){
			window.location.href = '/wap/modifyOrder.html?OrderID=' + orderId;
		}else if( status === 30 ){
			modal.alert('请联系旺旺客服帮您处理订单');
		}else if( status === 40 ){
			window.location.hash = "#/orderDetail?OrderID=" + orderId;
		}else if( status === 50 ){
			window.location.hash = "#/orderDetail?OrderID=" + orderId;
		}else if( status === 60 ){
			window.location.hash = "#/orderDetail?OrderID=" + orderId;
		}else if( status === 70 ){
			window.location.hash = "#/orderDetail?OrderID=" + orderId;
		}else{
			return;
		}
	}
	convertDay( time ){
		let dt = new Date( time ),
			now = new Date(),
			month = dt.getMonth() + 1,
			date = dt.getDate(),
			days = Math.floor( ( dt - now ) / ( 24*60*60*1000 ) );

		if( days === -1 ){
			return month + '月' + date + '日 今天';
		}else if( days === 0 ){
			return month + '月' + date + '日 明天';
		}else if( days === 1 ){
			return month + '月' + date + '日 后天';
		}else{
			return month + '月' + date + '日';
		}
		

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
			 			{this.state.pendingList.map( (result,index) => (
			 				<div className="order-info" key={index} onClick={this.goNext.bind(this,result.CustomerState,result.OrderID)}>
				 				<div className="if-lf">
				 					<div className="order-title">{result.cnItemName}</div>
				 					<div className="order-person">人数:
				 						<span><em>{result.AdultNum}</em>成人</span>
				 						<span><em>{result.ChildNum}</em>儿童</span>
				 						<span><em>{result.INFNum}</em>婴儿</span>
				 					</div>
				 				</div>
				 				<div className={ 'if-rt status-' + result.CustomerState }>
				 					<i className="fa fa-ellipsis-h"></i>
				 					<span className="">{result.stateName}</span>
				 				</div>
				 			</div>
			 			))}
			 		</div>
			 	</section>
			 	<section className="order-box done">
			 		<div className="title">
			 			<span>我的行程</span>
			 			<p className="line"></p>
			 		</div>
			 		<div className="order-list">
			 			{this.state.tripDate.map( ( date,ix ) => (
			 				<div className="order-container" key={ix}>
			 					<div className="order-date">{ this.convertDay(date) }</div>
			 					{this.state.tripList[ date ].map( ( result,index) => (
					 				<div className="order-info" key={index} onClick={this.goNext.bind(this,result.CustomerState,result.OrderID)}>
						 				<div className="if-lf">
						 					<div className="order-title">{result.cnItemName}</div>
						 					<div className="order-person">人数:
						 						<span><em>{result.AdultNum}</em>成人</span>
						 						<span><em>{result.ChildNum}</em>儿童</span>
						 						<span><em>{result.INFNum}</em>婴儿</span>
						 					</div>
						 				</div>
						 				<div className={ 'if-rt status-' + result.CustomerState }>
						 					<i className={'fa icon-face'+result.CustomerState}></i>
						 					<span className="">{result.stateName}</span>
						 				</div>
						 			</div>
					 			))}
					 		</div>
			 			))}
			 		</div>
			 	</section>
			 	<section className="order-box all">
			 		<div className="btn" >
			 			{/*<Link to="orderAll">查看我的全部订单</Link>*/}
			 			<a href="http://my.dodotour.cn/Orders/allOrder" >查看我的全部订单</a>
			 		</div>
			 	</section>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default Order;




