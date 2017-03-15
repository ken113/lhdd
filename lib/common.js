export function getUrlParam( param ){
	const reg = new RegExp(`${param}=([^&]*)(&?)`, 'i'),
		paramValue = location.hash.match(reg);
	return paramValue ? paramValue[1] : '';
}

export function letDivCenter( target ){

    const divHeight = target.offsetHeight,
    	divWidth = target.offsetWidth,
    	scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
    	scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
    	top = ( document.documentElement.clientHeight - divHeight) / 2,
    	left = (document.documentElement.clientWidth - divWidth) / 2;

    target.style.position = 'absolute';
    target.style.top = (scrollTop + top) + 'px';
    target.style.left = (scrollLeft + left) + 'px';
}

export function sleep( time ){
	return new Promise((resolve) => setTimeout(resolve, time));
}

export function convertDate(date, format) {
    let str = format;
    const o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    if (/(Y+)/.test(format)) {
        str = str.replace(RegExp.$1,
                (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
    }

    for (const k in o) { 
        if (new RegExp(`(${k})`).test(format)) {
            str = str.replace(RegExp.$1,
                (RegExp.$1.length === 1) ?
                o[k] : (`00${o[k]}`.substr((o[k].toString()).length)));
        }
    }

    return str;
}

export function getCookieValue(name) {
	let cookieValue = null;
	if( document.cookie && document.cookie != '' ){
		const cookies = document.cookie.split(';');
		for(let i = 0; i < cookies.length; i++ ){

			let cookie = cookies[i].trim();
			if( cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}


export function delCookie(name) {
	var exp = new Date();
	exp.setTime( exp.getTime() - 60 * 1000 );
	var cval = getCookieValue(name);

	document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toUTCString();
}

export const modal = {

	success( title = '系统提示', message ){

	},
	error( title = '系统提示', message ){
	},
	alert( message ){

		const alertModal = document.getElementById('md-modal-alert');

		if( alertModal ){
			alertModal.getElementsByClassName('modal-msg')[0].innerText = message;
			alertModal.className += ' show';
			return;	
		}

		const node = document.createElement('div'),
			html = `<div class="modal-icon"><i class="fa fa-exclamation-circle"></i></div>
			 		<div class="modal-msg">${message}</div>
			 		<div class="modal-btn" id="alert_ok_btn">确定</div>`;

		node.className = 'modal-box';
		node.id = 'md-modal-alert';
		node.innerHTML  = html ;
		document.body.appendChild(node);

		const am = document.getElementById('md-modal-alert');
		am.className += ' show';


		document.getElementById('alert_ok_btn').onclick = function(){
			am.className = 'modal-box';
		}

	},
	confirm( title, content, callback ){
	}
}

