import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogStyle from './LoginForm.module.css';
import axios from 'axios';
import axiosInstance from '../../ultilities/axiosInstance';

function LoginForm() {
	const [data, setData] = useState({ username: '', password: '' });
	const [error, setError] = useState('');

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		localStorage.removeItem('authTokens');
		try {
			const response = await axiosInstance.post('/auth/signin', data);
			localStorage.setItem('authTokens', JSON.stringify(response.data));
			window.location = '/dashboard';
		} catch (error) {
			console.log(error);
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.error);
			}
		}
	};

	return (
		<div className={LogStyle.body}>
			<div className={LogStyle.box}>
				<div className={LogStyle.form}>
					<form className='login' onSubmit={handleSubmit}>
						<h1 className={LogStyle.title}>Login</h1>
						{error && <div className={LogStyle.error}>{error}</div>}
						<div className={LogStyle.input}>
							<label htmlFor='id'>Student ID</label>
							<div>
								<input
									type='text'
									name='username'
									id='username'
									value={data.id}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className={LogStyle.input}>
							<label htmlFor='password'>Password</label>
							<div>
								<input
									type='password'
									name='password'
									id='password'
									value={data.password}
									onChange={handleChange}
								/>
							</div>
						</div>
						<button
							className={LogStyle.btn}
							type='submit'
							name='login'
							value='Login'
							onChange={handleSubmit}
						>
							Login
						</button>
					</form>

					<div>
						<Link to='/forgot-password'>Forget your password?</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;
