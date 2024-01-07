import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import redis from '../../utils/redis.service.js';
import * as student from '../../entities/student.service.js';
import { generateRandomNumber } from '../../utils/helper.js';

export async function signup(req, res) {
	const { sid, fullname, mobile, gpa } = req.body;

	if (!sid || !fullname || !gpa)
		return res.status(400).json({ error: 'Missing required student property' });

	try {
		const createdUser = await student.createStudent({
			sid,
			fullname,
			mobile,
			gpa,
			email: `${sid}@rmit.edu.vn`,
		});

		if (createdUser) {
			res.status(201).json({ status: true });
		} else {
			res.status(500).json({ error: 'Internal server error' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export async function forgotPassword(req, res) {
	const { email } = req.body;
	if (!email) return res.status(400).json({ error: 'Missing email' });

	const user = await student.getStudentByUsername(email);
	if (!user) return res.status(400).json({ error: 'Invalid email' });

	try {
		const otp = generateRandomNumber(6);
		await redis.set(`otp:${email}`, otp, 'EX', 60 * 60);

		const apiUrl = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN_NAME || ''}/messages`;

		const formData = new FormData();
		formData.append(
			'from',
			`No Reply <noreply@${process.env.MAILGUN_DOMAIN_NAME || 'RMIT ChatConnect'}/>`
		);
		formData.append('to', email);
		formData.append('subject', 'RMIT ChatConnect - Reset password');
		formData.append(
			'text',
			`Hi ${user.rmitSID},

There was a request to change your password!
Your password reset code is: ${otp}

If you did not make this request then please ignore this email.`
		);

		axios
			.post(apiUrl, formData, {
				headers: {
					Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString(
						'base64'
					)}`,
				},
			})
			.then((response) => {
				console.log('Forgot Password Email sent successfully:', otp, response.data);
			})
			.catch((error) => {
				console.error('Error sending forgot password email:', otp, error.response.data);
			});

		return res.status(200).json({ status: true });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
}

export async function resetPassword(req, res) {
	const { email, code, password } = req.body;

	if (!email) return res.status(400).json({ error: 'Missing email' });
	if (!code) return res.status(400).json({ error: 'Missing validation code' });
	if (!password) return res.status(400).json({ error: 'Missing new password' });

	const confirmation = await redis.get(`otp:${email}`);
	if (!confirmation || confirmation != code)
		return res.status(400).json({ error: 'Invalid validation code' });

	const user = await student.getStudentByUsername(email);
	const result = await student.editStudentById(user.id, {
		password,
		status: student.STUDENT_STATUS.ACTIVE,
	});

	if (!result) return res.status(500).json({ error: 'Internal server error' });
	else return res.status(200).json({ status: true });
}

export async function signin(req, res) {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).json({ error: 'Missing username or password' });

	try {
		const user = await student.getStudentByUsername(username);
		if (!user) return res.status(400).json({ error: 'Incorrect student ID or password' });

		const validatePassword = await bcrypt.compare(password, user.password);
		if (!validatePassword)
			return res.status(400).json({ error: 'Incorrect student ID or password' });

		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY),
		});
		const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY),
		});

		return res.status(200).json({ accessToken, refreshToken });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
}

export async function renew(req, res) {
	const refreshToken = req.body.refreshToken;
	if (!refreshToken) {
		return res.status(400).json({ error: 'Missing refresh token' });
	}

	try {
		const isRevoked = await redis.get(`token:${refreshToken}`);
		if (isRevoked) return res.status(400).json({ error: 'Invalid refresh token' });

		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
		const user = await student.getStudentById(decoded.id);
		if (!user) return res.status(400).json({ error: 'Invalid refresh token' });

		const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY),
		});
		const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY),
		});

		return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ error: 'Invalid refresh token' });
	}
}

export async function signout(req, res) {
	const { refreshToken } = req.body;
	if (!refreshToken) return res.status(200).json({ status: true });

	try {
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
		if (decoded.id) {
			const expiration = decoded.exp - Math.floor(Date.now() / 1000);
			await redis.set(`token:${refreshToken}`, 'true', 'EX', expiration);
		}
	} catch (err) {
		console.error(err);
	} finally {
		return res.status(200).json({ status: true });
	}
}

export async function validateAuth(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ error: 'Unauthorized access' });
	if (!authHeader.startsWith('Bearer ') || !authHeader.split(' ')[1])
		return res.status(401).json({ error: 'Invalid access token' });

	const jwtToken = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(jwtToken, process.env.JWT_ACCESS_TOKEN_SECRET);
		const user = await student.getStudentById(decoded.id);

		if (!user) return res.status(401).json({ error: 'Invalid access token' });
		req.user = user;
		next();
	} catch (err) {
		console.error('Error validating authentication:', err);
		return res.status(401).json({ error: 'Invalid access token' });
	}
}

export async function validateRmitClient(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ error: 'Unauthorized access' });
	if (!authHeader.startsWith('Basic ') || !authHeader.split(' ')[1])
		return res.status(401).json({ error: 'Invalid access token' });

	const encodedCredential = authHeader.split(' ')[1];
	const decodedCredential = Buffer.from(encodedCredential, 'base64').toString('utf-8');
	const [clientId, clientSecret] = decodedCredential.split(':');

	if (
		clientId != process.env.BASIC_AUTH_RMIT_ID ||
		clientSecret != process.env.BASIC_AUTH_RMIT_SECRET
	)
		return res.status(401).json({ error: 'Invalid access token' });

	next();
}
