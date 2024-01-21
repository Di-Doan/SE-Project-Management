import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBell } from '@fortawesome/free-regular-svg-icons';

import classes from './TopBar.module.css';

function TopBar(props) {
	return (
		<div className='w-100 d-flex justify-content-between bg-light px-3 py-4 border-bottom'>
			<div className='search-box'></div>
			<div className='d-flex gap-5 align-items-center'>
				<FontAwesomeIcon icon={faMessage} size='lg' />
				<FontAwesomeIcon icon={faBell} size='lg' />
				{/* <div className={`${classes.avatar} rounded-pill`}></div> */}
			</div>
		</div>
	);
}

export default TopBar;
