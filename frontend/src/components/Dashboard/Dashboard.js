import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../ultilities/axiosInstance.js';

import classes from './Design.module.css';

function Dashboard() {
	const [courses, setCourses] = useState([]);

	const getData = async () => {
		try {
			const response = await axiosInstance.get('/courses');
			console.log(response.data.data);
			setCourses(response.data.data || []);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className={`d-flex flex-column w-100 h-100 ${classes.dashboard}`}>
			<div className={`bg-light rounded-end-2 flex-grow-0 p-3 mt-5 ${classes.courses}`}>
				<div className='d-flex justify-content-between align-items-center'>
					<div className='fs-5'>Current Courses</div>
					<div className='fs-6 border p-2 rounded-1'>Current Semester</div>
				</div>
				<div className='d-flex flex-column gap-4 mt-3'>
					{courses.map((course) => (
						<div key={course.id} className={`${classes.course} px-4 py-3 rounded-1`}>
							<Link
								to={`/courses/${course.id}/people`}
								className='text-decoration-none text-dark fw-medium'
							>
								{course.name}
							</Link>
							<div className='text-secondary'>{course.code}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
