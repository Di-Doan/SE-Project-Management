import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import axiosInstance from '../../ultilities/axiosInstance';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

function ProtectedRoute(props) {
	const [auth, setAuth] = useState(true);

	const checkAuth = async () => {
		try {
			const response = await axiosInstance.get('/');
			if (response.data.auth) {
				setAuth(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<>
			{auth ? (
				<div className='vw-100 min-vh-100 d-flex flex-row align-items-stretch'>
					<Sidebar />
					<div className='w-100 d-flex flex-column'>
						<TopBar />
						<Outlet />
					</div>
				</div>
			) : (
				<Navigate to='/login' replace={true} />
			)}
		</>
	);
}

export default ProtectedRoute;
