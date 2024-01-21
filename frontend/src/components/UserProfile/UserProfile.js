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
			<div className={`${ProfileStyle.userProfile} mb-5`}>User Profile</div>
			<div className='w-100 d-flex justify-content-between mb-5'>
				<div className='d-flex gap-3'>
					<div className={ProfileStyle.group16}>
						<img src={defaultAva} className={ProfileStyle.icon2} alt='user image' />
					</div>
					<div className={ProfileStyle.fullName}>{user.fullname ? user.fullname : 'Full Name'}</div>
				</div>

				<div className={ProfileStyle.row3}>
					<button className={ProfileStyle.uploadPhoto}>Upload New Photo</button>
					<button className={ProfileStyle.delete}>Delete</button>
				</div>
			</div>

			<div className='d-flex gap-4 mb-5'>
				<div className='d-flex flex-column flex-grow-1'>
					<label className={ProfileStyle.firstName}>Full Name</label>
					<input
						disabled
						className={ProfileStyle.nameField}
						value={user.fullname ? user.fullname : 'Student Name'}
					/>
				</div>
				<div className='d-flex flex-column flex-grow-1'>
					<label className={ProfileStyle.lastName}>Mobile number</label>
					<input
						disabled
						className={ProfileStyle.nameField2}
						value={user.mobile ? user.mobile : 'Student Phone Number'}
					/>
				</div>
			</div>

			<div className='mb-5'>
				<div className={ProfileStyle.emailAddress}>Email Address</div>
				<div className={ProfileStyle.studentEmail}>{user.email ? user.email : 'Student Mail'}</div>
			</div>

			<div className='mb-5 row'>
				<div className='col-6'>
					<div className={ProfileStyle.currentGPA}>Current GPA</div>
					<div className={ProfileStyle.studentGPA}>{user.gpa ? user.gpa : 'Student GPA'}</div>
				</div>
				<div className='col-6'>
					<input
						className={`${ProfileStyle.showGPA} me-3`}
						type='checkbox'
						id='showGPA'
						name='showGPA'
						value='showGPA'
						checked={Number(user.showGpa) === 1}
						onClick={showGPA}
					/>
					<label className={ProfileStyle.showGPALabel} for='showGPA'>
						Show GPA
					</label>
				</div>
			</div>

			<div className='d-flex gap-4 w-100 justify-content-end'>
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
