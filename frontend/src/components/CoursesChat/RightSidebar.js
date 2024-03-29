import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../ultilities/axiosInstance';

import './RightSidebar.css';

function RightSidebar() {
	const [people, setPeople] = useState([]);
	const { course_id } = useParams(); // Get the course_id from useParams

	const getPeople = async () => {
		try {
			const response = await axiosInstance.get(`/courses/${course_id}/students`);
			setPeople(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPeople();
	}, []);

	return (
		<div className='right-sidebar'>
			<h2>Users</h2>
			<ul>
				{Array.isArray(people) && people.length > 0 ? (
					people.map((item) => (
						<li key={item.id}>
							<div className='user-name'>{item.fullname}</div>
						</li>
					))
				) : (
					<li>No users available</li>
				)}
			</ul>
		</div>
	);
}

export default RightSidebar;
