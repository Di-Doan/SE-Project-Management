import { Outlet, useOutletContext } from 'react-router-dom';

import Sidebar from './Sidebar.js';

function CourseWrapper() {
	const { user } = useOutletContext();

	return (
		<div className='d-flex w-100 h-100 align-items-stretch'>
			<Sidebar />
			<Outlet context={{ user }} />
		</div>
	);
}

export default CourseWrapper;
