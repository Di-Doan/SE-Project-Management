import React, { useState, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import defaultAva from '../../assets/avatar.jpg';
import axiosInstance from '../../ultilities/axiosInstance';
import PeopleStyle from './People.module.css';
import PeopleBlock from './PeopleBlock';

function People() {
	const [people, setPeople] = useState([]);
	const { course_id } = useParams();
	const [filter, setFilter] = useState({
		search: '',
		gpa: null,
		tutorial: null,
		availability: null,
	});
	const [clear, setClear] = useState(null);
	const [auth, setAuth] = useState(false);

	if (auth) {
		window.location = '/login';
	}

	const getData = async () => {
		try {
			const response = await axiosInstance.get('/profile');
		} catch (error) {
			if (error) {
				setAuth(true);
			}
		}
	};

	const getPeople = async () => {
		try {
			const response = await axiosInstance.get(`/courses/${course_id}/students`);
			setPeople(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const submitFilter = async () => {
		try {
			let query = `/courses/${course_id}/students?`;

			if (filter.search) {
				query += `q=${filter.search}$`;
			}

			if (filter.availability) {
				{
					query += `availability=${filter.availability}$`;
				}
			}

			if (filter.gpa) {
				query += `gpa=${filter.gpa}&`;
			}

			if (filter.tutorial) {
				query += `sameTutorial=${filter.tutorial}&`;
			}

			const response = await axiosInstance.get(query);
			setClear(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPeople();
		getData();
	}, []);

	return (
		<div>
			<div className='profile-top-bar'>
				<div className={PeopleStyle.topLink}>
					<Link className={PeopleStyle.link} to={`/courses/${course_id}/people`}>
						People
					</Link>
					<Link className={PeopleStyle.link} to={`/team/${course_id}/team`}>
						Team
					</Link>
				</div>
			</div>
			<div className={PeopleStyle.box}>
				<div>
					<div className={PeopleStyle.checkbox}>
						<input
							type='text'
							placeholder='Search: sid, full name'
							name='search'
							id='search'
							value={filter.search}
							onChange={(e) => {
								setFilter({ ...filter, search: e.target.value });
							}}
						></input>
					</div>

					<div className={PeopleStyle.checkbox}>
						<input
							type='checkbox'
							name='gpa'
							id='gpa'
							checked={filter.gpa}
							onChange={() => {
								filter.gpa
									? setFilter({ ...filter, gpa: null })
									: setFilter({ ...filter, gpa: true });
							}}
						></input>
						<label for='gpa'>Sort by GPA</label>
					</div>

					<div className={PeopleStyle.checkbox}>
						<input
							type='checkbox'
							name='tutorial'
							id='tutorial'
							checked={filter.tutorial}
							onChange={() => {
								filter.tutorial
									? setFilter({ ...filter, tutorial: null })
									: setFilter({ ...filter, tutorial: true });
							}}
						></input>
						<label for='tutorial'>Only display students with same tutorial class</label>
					</div>

					<div className={PeopleStyle.checkbox}>
						<input
							type='checkbox'
							name='availability'
							id='availabilty'
							checked={filter.availability}
							onChange={() => {
								filter.availability
									? setFilter({ ...filter, availability: null })
									: setFilter({ ...filter, availability: true });
							}}
						></input>
						<label for='availabilty'>Only display students without team</label>
					</div>

					<div className={PeopleStyle.checkbox}>
						<button
							// type="submit"
							className={PeopleStyle.btn}
							onClick={submitFilter}
						>
							Filter
						</button>
					</div>

					<div className={PeopleStyle.checkbox}>
						<button
							// type="submit"
							className={PeopleStyle.btn}
							onClick={() => {
								setClear(null);
								setFilter({
									search: '',
									gpa: null,
									tutorial: null,
									availability: null,
								});
							}}
						>
							Clear Filter
						</button>
					</div>
				</div>

				<div className={PeopleStyle.tableBlock}>
					<table className={PeopleStyle.table}>
						<thead className={PeopleStyle.thead}>
							<tr>
								<th className={PeopleStyle.th}></th>
								<th className={PeopleStyle.th}>Name</th>
								<th className={PeopleStyle.th}>SID</th>
								<th className={PeopleStyle.th}>Direct Message</th>
							</tr>
						</thead>
						<tbody className={PeopleStyle.tbody}>
							{!clear
								? people.map((item) => (
										<PeopleBlock name={item.fullname} rmitId={item.rmitSID}></PeopleBlock>
								  ))
								: clear.map((item) => (
										<PeopleBlock name={item.fullname} rmitId={item.rmitSID}></PeopleBlock>
								  ))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default People;
