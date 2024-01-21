import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import dayjs from 'dayjs';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(async (req) => {
	const authTokens = localStorage.getItem('authTokens')
		? JSON.parse(localStorage.getItem('authTokens'))
		: null;

	if (authTokens?.accessToken) req.headers.Authorization = `Bearer ${authTokens.accessToken}`;

	return req;
});

axiosInstance.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (err.response.status === 401) {
			const authTokens = localStorage.getItem('authTokens')
				? JSON.parse(localStorage.getItem('authTokens'))
				: null;

			if (authTokens?.refreshToken) {
				const response = await axios.post(`${baseURL}/auth/renew`, {
					refreshToken: authTokens.refreshToken,
				});

				if (response.status !== 200) {
					localStorage.removeItem('authTokens');
					return window.location.assign('/login');
				}

				localStorage.setItem('authTokens', JSON.stringify(response.data));

				const newResponse = await axiosInstance.request(err.response.config);
				return newResponse;
			}
		}
		return err;
	}
);

export default axiosInstance;
