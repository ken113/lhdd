import React from 'react';
import { render } from 'react-dom';
import IScroll from 'iScroll';
import './DatePicker.scss';


let yearList = [];
for(let i=1920;i<2018;i++){
	yearList.push( i );
}

class DatePicker extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			date: this.props.date ? new Date( this.props.date ) : new Date(),
			yearList:yearList,
			monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
			dayList:[],
			scrollConf: {
				snap : 'li',
				snapSpeed: 600,
				probeType : 1,
				tap : false
			}
		}
		
	}
	componentDidMount(){

		const that = this,
			year = this.state.date.getFullYear(),
			month = this.state.date.getMonth() + 1,
			days = new Date( year,month,0).getDate();

		let dayList = [];
		for(let i = 1; i<days+1;i++){
			dayList.push( i );
		}
		this.setState({
			dayList
		});

		setTimeout(function(){

			let container = document.getElementById('datePicker'),
				dpYear = container.querySelector('.dp_year'),
				dpMonth = container.querySelector('.dp_month'),
				dpDay = container.querySelector('.dp_day');

			const yearScroll = new IScroll('.dp_year', that.state.scrollConf);
			yearScroll.on('scrollEnd', function(){
				that.updateSelected( dpYear,this );
				const year = dpYear.querySelector('.selected').dataset.year*1,
					month = dpMonth.querySelector('.selected').dataset.month*1;
				that.updateDays( year,month );
			});

			const monthScroll = new IScroll('.dp_month', that.state.scrollConf);
			monthScroll.on('scrollEnd', function(){
				that.updateSelected( dpMonth,this );
				const year = dpYear.querySelector('.selected').dataset.year*1,
					month = dpMonth.querySelector('.selected').dataset.month*1;
				that.updateDays( year,month );
			});

			const dayScroll = new IScroll('.dp_day', that.state.scrollConf);
			dayScroll.on('scrollEnd', function(){
				that.updateSelected( dpDay,this );
			});


			const date = that.state.date,
				currentYear = date.getFullYear(),
				currentMonth = date.getMonth() + 1,
				currentDate = date.getDate(),
				yearLi = document.querySelectorAll('[data-year="'+ currentYear +'"]')[0],
				monthLi = document.querySelectorAll('[data-month="'+ currentMonth +'"]')[0],
				dateLi = document.querySelectorAll('[data-day="'+ currentDate +'"]')[0],
				height = document.getElementById('datePicker').getElementsByTagName('li')[0].clientHeight;

			yearLi.className += ' selected';
			monthLi.className += ' selected';
			dateLi.className += ' selected';

			//yearScroll.scrollToElement( yearLi );
			//monthScroll.scrollToElement( monthLi );
			//dayScroll.scrollToElement( dateLi );

			yearScroll.scrollTo( 0,-(currentYear-1920 )*height );
			monthScroll.scrollTo( 0,-(currentMonth-1)*height );
			dayScroll.scrollTo( 0,-(currentDate-1)*height );

		},0);
		
	}
	updateSelected( container, iscroll ){
		const index = (-iscroll.y) / document.getElementById('datePicker').getElementsByTagName('li')[0].clientHeight + 2,
			current = container.getElementsByTagName('li')[ index ];
		//alert( index );
		container.querySelector('li.selected') ? container.querySelector('li.selected').className = '' : void 0;
		current ? current.className += ' selected' : void 0;
	}
	updateDays( year,month ){

		const days = new Date( year, month, 0 ).getDate(),
			dpDay = document.querySelector('.dp_day'),
			that = this;

		let dayList = [];
		for(let i = 1; i<days+1;i++){
			dayList.push( i );
		}
		this.setState({
			dayList
		});

		setTimeout(function(){
			const dayScroll = new IScroll('.dp_day', that.state.scrollConf );
			dayScroll.on('scrollEnd', function(){
				that.updateSelected( dpDay,this );
			});
			document.querySelector('[data-day="1"]').className += ' selected';
			//dayScroll.scrollTo(0,0);
		},0)
		
	}
	ok(){
		const container = document.getElementById('datePicker'),
			dpYear = container.querySelector('.dp_year'),
			dpMonth = container.querySelector('.dp_month'),
			dpDay = container.querySelector('.dp_day'),
			year = dpYear.querySelector('.selected').dataset.year*1,
			month = dpMonth.querySelector('.selected').dataset.month*1,
			day = dpDay.querySelector('.selected').dataset.day*1;
		//container.style.display = "none";

		alert( year + '-' + month + '-' + day );
	}
	cancel(){
		const datePicker = document.getElementById('datePicker');
		datePicker.style.display = "none";
	}
	render(){
		return(
			<div id="datePicker" className="cpt-datepicker">
				<div className="dp_panel">
					<h3 className="dp_title">请选择时间</h3>
					<div className="dp_body">
						<div className="dp_item dp_year">
							<ul>
								<li></li><li></li>
								{this.state.yearList.map( (item,index) => (
									<li key={index} data-year={item}>{item}年</li>
								))}
								<li></li><li></li>
							</ul>
						</div>
						<div className="dp_item dp_month">
							<ul>
								<li></li><li></li>
								{this.state.monthList.map( (item,index) => (
									<li key={index} data-month={item}>{item}月</li>
								))}
								<li></li><li></li>
							</ul>
						</div>
						<div className="dp_item dp_day">
							<ul>
								<li></li><li></li>
								{this.state.dayList.map( (item,index) => (
									<li key={index} data-day={item}>{item}日</li>
								))}
							<li></li><li></li>
							</ul>
						</div>
					<div className="dp_indicate"></div>
				</div>
				<div className="dp_confirm">
					<a href="javascript:void(0);" className="dp_ok" onClick={this.ok.bind(this)}>确定</a>
					<a href="javascript:void(0);" className="dp_cancel" onClick={this.cancel.bind(this)}>取消</a>
				</div>
			</div>
		</div>
		)
	}
}

export default DatePicker;