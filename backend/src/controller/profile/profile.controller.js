import { getCourses } from '../../entities/course.service.js';

export async function getProfile(req, res) {
	const { user } = req;
	const courses = await getCourses({ studentId: user.id });

	if (!courses) return res.status(500).json({ error: 'Internal server error' });
	return res.status(200).json({ user: { ...user, courses } });
}

export async function editProfile(req, res) {
	const { id } = req.user;
	const { fullname, mobilem, description, showGpa } = req.body;

	try {
		const updatedUser = await student.updateStudent(id, { name, email });

		if (!updatedUser) {
			return res.status(500).json({ error: 'Failed to update profile' });
		}

		return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
	} catch (err) {
		console.error('Error updating profile:', err);

		return res.status(500).json({ error: 'Internal server error' });
	}
}

export async function deleteProfile(req, res) {
	const { id } = req.user;
	const result = student.deleteStudent(id);
	if (!result) return res.status(500).json({ error: 'Invalid access token' });
	return res.status(500).json({ status: true });
}
