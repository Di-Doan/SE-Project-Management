import pool from '../../utils/mysql.service.js';
import * as directChatService from '../../entities/direct_chat.service.js';
import * as studentService from '../../entities/student.service.js';
import * as chatService from '../../entities/chat.service.js';

export const getDirectChats = async (req, res) => {
	const { id: userId } = req.user;

	const directChat = await directChatService.getDirectChatByStudentId(userId);
	if (!directChat) {
		return res.status(500).json({ message: 'Failed to get direct chat by student id' });
	}

	return res.status(200).json({ data: directChat });
};

export const createDirectChat = async (req, res) => {
	const { id: userId } = req.user;
	const { friendId } = req.body;

	const friend = await studentService.getStudentById(friendId);
	if (!friend) return res.status(404).json({ message: 'Friend ID not found' });
	const connection = await pool.getConnection();
	await connection.beginTransaction();

	try {
		const chatId = await chatService.createChat(
			'This your beginning of your direct messages.',
			connection
		);
		if (!chatId) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create chat' });
		}

		const directChatId = await directChatService.createDirectChat(
			userId,
			friendId,
			chatId,
			connection
		);
		if (directChatId == null) {
			await connection.rollback();
			return res.status(500).json({ message: 'Failed to create direct chat' });
		}

		await connection.commit();
		return res.status(200).json({
			first_std_id: userId,
			second_std_id: friendId,
			chat_id: chatId,
			status: directChatService.DIRECT_CHAT_STATUS.INACTIVE,
		});
	} catch (err) {
		console.error('Failed to create direct chat:', err);
		await connection.rollback();
		return res.status(500).json({ message: 'Failed to create direct chat' });
	} finally {
		connection.release();
	}
};
