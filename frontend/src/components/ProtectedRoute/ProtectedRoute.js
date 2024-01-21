import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import axiosInstance from '../../ultilities/axiosInstance';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

function ProtectedRoute(props) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const fetchUser = async () => {
		try {
			const response = await axiosInstance.get('/profile');
			setUser(response.data.user);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : user ? (
				<div className='vw-100 min-vh-100 d-flex flex-row align-items-stretch'>
					<Sidebar />
					<div className='w-100 d-flex flex-column'>
						<TopBar />
						<Outlet context={{ user }} />
					</div>
				</div>
			) : (
				<Navigate to='/login' replace={true} />
			)}
		</>
	);
}

export default ProtectedRoute;
