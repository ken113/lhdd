import React from 'react';
import { render } from 'react-dom';

import TopNav from './topNav';
import BtmNav from './btmNav'

import './../sass/modifyPwd.scss';


class ModifyPwd extends React.Component {
	constructor( props ) {
		super( props );
	}

	render(){

		return(
			<div className="md-mofifyPwd">
				<TopNav title="修改密码"/>
			 	<BtmNav />
			</div>
		 )
	}
}

export default ModifyPwd;