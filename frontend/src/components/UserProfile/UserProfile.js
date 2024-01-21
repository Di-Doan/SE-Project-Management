import React, { useState, useEffect } from 'react';
import ProfileStyle from './UserProfile.module.css';
import defaultAva from '../../assets/avatar.jpg';
import axiosInstance from '../../ultilities/axiosInstance';

function UserProfile() {
	const [user, setUser] = useState({});
	const [oldData, setOldData] = useState();

	const getData = async () => {
		try {
			const response = await axiosInstance.get('/profile');
			setUser(response.data.user);
			setOldData(response.data.user);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const showGPA = () => {
		if (user.showGpa == 1) {
			setUser({ ...user, showGpa: 0 });
		} else return setUser({ ...user, showGpa: 1 });
	};

	const saveChanges = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.put('/profile', user);
			getData();
		} catch (error) {
			console.log(error);
		}
	};

	const cancelChanges = () => {
		setUser(oldData);
	};

	return (
		<div className='p-5'>
			<div>
				<div className={ProfileStyle.userProfile}>User Profile</div>
				<div className={ProfileStyle.vector75}></div>
				<div className={ProfileStyle.group16}>
					<img src={defaultAva} className={ProfileStyle.icon2} />
				</div>
				<div className={ProfileStyle.fullName}>{user.fullname ? user.fullname : 'Full Name'}</div>

				<div className={ProfileStyle.row3}>
					<button className={ProfileStyle.uploadPhoto}>Upload New Photo</button>
					<button className={ProfileStyle.delete}>Delete</button>
				</div>
			</div>

			<div>
				<div className={ProfileStyle.firstName}>Full Name</div>
				<div className={ProfileStyle.nameField}></div>
				<div className={ProfileStyle.egAlaa}>{user.fullname ? user.fullname : 'Student Name'}</div>
				<div className={ProfileStyle.lastName}>Mobile number</div>
				<div className={ProfileStyle.nameField2}></div>
				<div className={ProfileStyle.egMohamed}>
					{user.mobile ? user.mobile : 'Student Phone Number'}
				</div>
			</div>

			<div>
				<div className={ProfileStyle.emailAddress}>Email Address</div>
				<div className={ProfileStyle.studentEmail}>{user.email ? user.email : 'Student Mail'}</div>
			</div>

			<div>
				<div className={ProfileStyle.currentGPA}>Current GPA</div>
				<div className={ProfileStyle.studentGPA}>{user.gpa ? user.gpa : 'Student GPA'}</div>
				<input
					className={ProfileStyle.showGPA}
					type='checkbox'
					id='showGPA'
					name='showGPA'
					value='showGPA'
					checked={user.showGpa == 1 ? true : false}
					onClick={showGPA}
				/>
				<label className={ProfileStyle.showGPALabel} for='showGPA'>
					{' '}
					Show GPA
				</label>
			</div>

			<div>
				<button className={ProfileStyle.saveButton} onClick={saveChanges}>
					Save Changes
				</button>
				<button className={ProfileStyle.cancelButton} onClick={cancelChanges}>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default UserProfile;
