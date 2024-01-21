import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import defaultAva from '../../assets/avatar.jpg';
import axiosInstance from '../../ultilities/axiosInstance';
import TeamStyle from './FindTeam.module.css';
import GroupBox from './GroupBox';
import Sidebar from '../ProtectedRoute/Sidebar';

function FindTeam() {
	const [auth, setAuth] = useState(false);
	const [team, setTeam] = useState([]);
	const [teamId, setTeamId] = useState();
	const [filter, setFilter] = useState('all');
	const { course_id } = useParams();

	if (auth) {
		window.location = '/login';
	}

	const getUser = async () => {
		try {
			const response = await axiosInstance.get('/profile');
		} catch (error) {
			if (error) {
				setAuth(true);
			}
		}
	};

	useEffect(() => {
		getUser();
		getTeamId();
		getTeam();
	}, []);

	const getTeam = async () => {
		try {
			const response = await axiosInstance.get(`/courses/${course_id}/teams`);
			setTeam(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getTeamId = async () => {
		try {
			const response = await axiosInstance.get(`/courses/${course_id}/teamId`);
			setTeamId(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className={TeamStyle.body}>
				<div className='profile-top-bar'>
					<div className={TeamStyle.topLink}>
						<Link className={TeamStyle.link} to={`/Dashboard`}>
							Dashboard
						</Link>
						<Link className={TeamStyle.link} to={`/people/${course_id}`}>
							People
						</Link>
						<Link className={TeamStyle.link} to={`/team/${course_id}`}>
							Team
						</Link>
					</div>
				</div>
				<div className={TeamStyle.createGroupBtn}>
					<button className={TeamStyle.createBtn}>Create Group</button>
				</div>

				<div className={TeamStyle.groupFilter}>
					<select
						className={TeamStyle.groupSelect}
						name='team-sort'
						id='team-sort'
						onChange={(e) => {
							setFilter(e.target.value);
						}}
					>
						<option defaultChecked value='all'>
							All
						</option>
						<option value='availability'>Availability</option>
					</select>
				</div>

				<div className={TeamStyle.groupList}>
					{team
						.filter((item) => {
							if (filter == 'availability') {
								return item.memberCount < 4;
							} else {
								return item;
							}
						})
						.map((item) => (
							<GroupBox
								name={item.name}
								member={item.memberCount}
								teamId={item.id}
								courseId={course_id}
								id={teamId}
							></GroupBox>
						))}
				</div>
			</div>
		</div>
	);
}

export default FindTeam;
