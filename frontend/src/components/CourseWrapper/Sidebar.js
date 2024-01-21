// Sidebar.js
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import axiosInstance from '../../ultilities/axiosInstance.js';
import classes from './Sidebar.module.css';

const Sidebar = () => {
	const { course_id } = useParams();
	const [course, setCourse] = useState();

	const getCourse = async () => {
		try {
			const response = await axiosInstance.get(`/courses/${course_id}`);
			setCourse(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCourse();
	}, []);

	return (
		<div className={`${classes.sidebar} d-flex flex-column p-3 gap-2 h-100`}>
			<h3>{course && course.name}</h3>
			<NavLink
				className={`${classes.navlink} p-2 rounded-2 text-decoration-none text-light`}
				to={`/courses/${course_id}/chat/${course?.announcemenChatId}`}
			>
				Announcement room
			</NavLink>
			<NavLink
				className={`${classes.navlink} p-2 rounded-2 text-decoration-none text-light`}
				to={`/courses/${course_id}/chat/${course?.referenceChatId}`}
			>
				Reference room
			</NavLink>

			<h5 className='my-2 text-secondary'>Tutorial</h5>
			{course &&
				course.tutorials &&
				course.tutorials.map((tutorial) => (
					<NavLink
						className={`${classes.navlink} p-2 rounded-2 text-decoration-none text-light`}
						key={tutorial.id}
						to={`/courses/${course_id}/chat/${tutorial.chatId}`}
					>
						{tutorial.name}
					</NavLink>
				))}

			<h5 className='my-2 text-secondary'>Teams</h5>
			{course &&
				course.teams &&
				course.teams.map((team) => (
					<NavLink
						className={`${classes.navlink} p-2 rounded-2 text-decoration-none text-light`}
						key={team.id}
						to={`/courses/${course_id}/chat/${team.chatId}`}
					>
						{team.name}
					</NavLink>
				))}

			<NavLink
				className={`${classes.navlink} p-2 rounded-2 text-decoration-none text-light fs-5 my-2`}
				to={`/courses/${course_id}/people`}
			>
				People
			</NavLink>
		</div>
	);
};

export default Sidebar;
