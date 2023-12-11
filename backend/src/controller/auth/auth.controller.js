import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as student from '../../entities/student.service.js';

export async function signup(req, res) {
	const { sid, fullname, mobile, gpa } = req.body;

	if (!sid || !fullname || !gpa)
		return res.status(400).json({ error: 'Missing required student property' });

	const createdUser = await student.createStudent({ sid, fullname, mobile, gpa });

	if (createdUser) return res.status(201).json(createdUser);
	else return res.status(500).json({ error: 'Internal server error' });
}

export async function forgotPassword(req, res) {
	const { email } = req.body;

	// Implement send email to user

	return res.status(200).json({ status: true });
}

export async function resetPassword(req, res) {
	const { code, id, password } = req.body;

	if (!code) res.status(400).json({ error: 'Missing validation code' });
	if (!id) res.status(400).json({ error: 'Missing student id' });
	if (!password) res.status(400).json({ error: 'Missing new password' });

	if (code != '123456') res.status(400).json({ error: 'Invalid validation code' });
	const result = await student.editStudentById(id, { password });

	if (!result) res.status(500).json({ error: 'Internal server error' });
	else res.status(200).json({ status: true });
}

export async function signin(req, res) {
	const { username, password } = req.body;
	try {
		const user = await student.getStudentByUsername(username, password);
		if (!user) res.status(400).json({ error: 'Incorrect usernam or password' });

		const validatePassword = await bcrypt.compare(password, user.passowrd);
		if (!validatePassword) res.status(400).json({ error: 'Incorrect usernam or password' });

		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY),
		});
		const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY),
		});

		return res.status(200).json({
			accessToken: accessToken,
			refreshToken: refreshToken,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
}

export async function validateAuth(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) res.status(401).json({ error: 'Unauthorized access' });
	if (!authHeader.startsWith('Bearer ') || !authHeader.split(' ')[1])
		res.status(401).json({ error: 'Invalid access token' });

	const jwtToken = authHeader.split(' ')[1];
	try {
		const decoded = jwt.decode(jwtToken, process.env.JWT_ACCESS_TOKEN_SECRET);
		const user = await student.getStudentById(decoded.id);

		if (!user) return res.status(401).json({ error: 'Invalid access token' });
		req.user = user;
		next();
	} catch (err) {
		console.err('Error validating authentication:', err);
		return res.status(401).json({ error: 'Invalid access token' });
	}
}

export async function signout(req, res) {
	// Implement redis to blacklist token
}

export async function getProfile(req, res) {
	const { user } = req;
	return res.status(200).json(user);
}

export async function updateProfile(req, res) {
	const { id } = req.user;
	const result = student.deleteStudent(id);
	if (!result) return res.status(500).json({ error: 'Invalid access token' });
	return res.status(500).json({ status: true });
}
