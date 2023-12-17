import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import redis from '../../utils/redis.service.js';
import { STUDENT_STATUS } from '../../entities/student.service.js';

import * as student from '../../entities/student.service.js';

export async function signup(req, res) {
	const { sid, fullname, mobile, gpa } = req.body;

	if (!sid || !fullname || !gpa)
		return res.status(400).json({ error: 'Missing required student property' });

	const createdUser = await student.createStudent({
		sid,
		fullname,
		mobile,
		gpa,
		email: `${sid}@rmit.edu.vn`,
	});

	if (createdUser) return res.status(201).json({ status: true });
	else return res.status(500).json({ error: 'Internal server error' });
}

export async function forgotPassword(req, res) {
	const { email } = req.body;

	// Implement send email to user

	return res.status(200).json({ status: true });
}

export async function resetPassword(req, res) {
	const { code, id, password } = req.body;

	if (!code) return res.status(400).json({ error: 'Missing validation code' });
	if (!id) return res.status(400).json({ error: 'Missing student id' });
	if (!password) return res.status(400).json({ error: 'Missing new password' });

	if (code != '123456') return res.status(400).json({ error: 'Invalid validation code' });
	const result = await student.editStudentById(id, { password, status: STUDENT_STATUS.ACTIVE });

	if (!result) return res.status(500).json({ error: 'Internal server error' });
	else return res.status(200).json({ status: true });
}

export async function signin(req, res) {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).json({ error: 'Missing username or password' });

	try {
		const user = await student.getStudentByUsername(username);
		if (!user) return res.status(400).json({ error: 'Incorrect username or password' });

		const validatePassword = await bcrypt.compare(password, user.password);
		if (!validatePassword) return res.status(400).json({ error: 'Incorrect username or password' });

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
	const { refreshToken } = req.body;
	if (!refreshToken) return res.status(400).json({ error: 'Missing refresh token' });
	try {
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
		const user = await student.getStudentById(decoded.id);
		if (!user) return res.status(400).json({ error: 'Invalid refresh token' });

		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY),
		});
		const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY),
		});

		return res.status(200).json({ accessToken, refreshToken });
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
		console.err('Error validating authentication:', err);
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
