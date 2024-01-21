import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar.js';

function CourseWrapper() {
	return (
		<div className='d-flex w-100 h-100 align-items-stretch'>
			<Sidebar />
			<Outlet />
		</div>
	);
}

export default CourseWrapper;
