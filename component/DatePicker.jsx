import React from 'react';
import { render } from 'react-dom';
import IScroll from 'iScroll';
import './DatePicker.scss';

class DatePicker extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			date: this.props.date ? new Date( this.props.date ) : new Date(),
			scrollConf: {
				snap : 'li',
				snapSpeed: 600,
				probeType : 1,
				tap : false
			}
		}
		
	}
	componentDidMount(){

		const that = this;

		this.initYear();
		this.initMonth();
		this.initDay();

		setTimeout(function(){

			let container = document.getElementById('datePicker'),
				dpYear = container.querySelector('.dp_year'),
				dpMonth = container.querySelector('.dp_month'),
				dpDay = container.querySelector('.dp_day');

			const yearScroll = new IScroll('.dp_year', that.state.scrollConf);
			yearScroll.on('scrollEnd', function(){
				that.updateSelected( dpYear,this );
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
	initYear(){
		let yearList = document.createElement('ul'),
			html = '<li class="dp_note">选择年份</li><li></li>';
		for(let i = 1920;i<2018;i++){
			html += '<li data-year='+ i +'>'+ i +'年</li>';
		}
		html += '<li></li><li></li>';
		yearList.innerHTML = html;
		document.querySelector('.dp_year').appendChild( yearList );
	}
	initMonth(){
		let monthList = document.createElement('ul'),
			html = '<li class="dp_note">选择月份</li><li></li>';
		for(let i = 1;i<13;i++){
			html += '<li data-month='+ i +'>'+ i +'月</li>';
		}
		html += '<li></li><li></li>';
		monthList.innerHTML = html;
		document.querySelector('.dp_month').appendChild( monthList );
	}
	initDay(){

		let dayList = document.createElement('ul'),
			html = '<li class="dp_note">选择日期</li><li></li>',
			date = this.state.date,
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			days = new Date( year,month,0).getDate();
		for(let i = 1;i<days+1;i++){
			html += '<li data-day='+ i +'>'+ i +'日</li>';
		}
		html += '<li></li><li></li>';
		dayList.innerHTML = html;
		document.querySelector('.dp_day').appendChild( dayList );
	}
	updateSelected( container, iscroll ){
		const index = (-iscroll.y) / document.getElementById('datePicker').getElementsByTagName('li')[0].clientHeight + 2,
			current = container.getElementsByTagName('li')[ index ];
		//alert( index );
		container.querySelector('li.selected') ? container.querySelector('li.selected').className = '' : void 0;
		current ? current.className += ' selected' : void 0;
	}
	updateDays( year,month ){

		const days = new Date(year, month, 0).getDate(),
			dpDay = document.querySelector('.dp_day'),
			that = this;

		dpDay.innerHTML = "";
		let dayList = document.createElement('ul'),
			html = '<li class="dp_note">选择日期</li><li></li>';
		for(let i = 1;i< days+1;i++){
			html += '<li data-day='+ i +'>'+ i +'日</li>';
		}
		html += '<li></li><li></li>';
		dayList.innerHTML = html;
		dpDay.appendChild( dayList );

		const dayScroll = new IScroll('.dp_day', that.state.scrollConf );
		dayScroll.on('scrollEnd', function(){
			that.updateSelected( dpDay,this );
		});

		document.querySelector('[data-day="1"]').className += ' selected';

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
						</div>
						<div className="dp_item dp_month">
						</div>
						<div className="dp_item dp_day">
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