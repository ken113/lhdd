import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
//import TopNav from './topNav';
import BtmNav from './btmNav';
import classnames from 'classnames';
import axios from 'axios';
import { setTitle,loading,modal } from './../lib/common';
import './../sass/order.scss';


class OrderAll extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			allList:[]
		}
	}
	componentWillMount(){
		setTitle( '我的全部订单-行程-浪花朵朵' );
	}
	componentDidMount(){

		setTimeout(function(){
			document.getElementsByClassName('md-nav')[0].getElementsByTagName('a')[0].className += ' selected';
		},0);
		
		let that = this;
		loading.show();
		axios.post('/Orders/GetAllOrders',{
		}).then(function (response) {
			loading.hide();
			const data = response.data;
			
			that.setState({
				allList:[...data.Orders ]
			});	
			
		})
	}
	componentDidUpdate(){
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
	render(){

		return(
			 <div className="md-order">
			 	<section className="order-box all">
			 		
			 		<div className="order-list">
			 			{this.state.allList.map( (result,index) => (
			 				<div className="order-info" key={index} onClick={this.goNext.bind(this,result.CustomerState,result.OrderID)} >
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
			 	</section>
			 	<BtmNav/>
			 </div>
		 )
	}
}

export default OrderAll;



