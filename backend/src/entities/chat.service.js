import pool from '../utils/mysql.service.js';

const LIMIT_QUERY_BOOL = true;
const LIMIT_QUERY_VAL = 20;

export const createChat = async (description, connection) => {
	const db = connection || pool;
	try {
		const [results] = await db.query('INSERT INTO Chat VALUES (?, NOW())', [{ chat_description: description }]);
		return results.insertId;
	} catch (err) {
		console.error('Failed to create chat:', err);
		return null;
	}
};

export const getMessageLog = async (chat_id,filter) => {
    var [results] = await pool.query('SELECT * FROM Chat WHERE Chat.chat_id = ?', [chat_id]);
    if (results.length === 0) return null;

    var whereQuery = '';

    // search for message with smaller id (older messages)
    if (filter && filter.message_id) {
        whereQuery += `message.message_id < ${pool.escape(filter.message_id)}`;
    }

    const queryString_ = `
        SELECT message.message_id, message.message_text, student.student_id, message.created_at
        FROM Message as message
        JOIN Student as student on message.message_sender = s.student_id
        WHERE message.chat_id = ${pool.escape(chat_id)} ${whereQuery? `AND ${whereQuery}` : ``}
        ORDER BY message.message_id DESC
        ${LIMIT_QUERY_BOOL ? `LIMIT ${LIMIT_QUERY_VAL}` : ``}
    `;

    const queryString = `
        SELECT * FROM Message
        JOIN Student as student on message.message_sender = student.student_id
        WHERE message.chat_id = ${pool.escape(chat_id)} ${whereQuery? `AND ${whereQuery}` : ``}
        ORDER BY message.message_id DESC
        ${LIMIT_QUERY_BOOL ? `LIMIT ${LIMIT_QUERY_VAL}` : ``}
    `;

    try {
        const [results] = await pool.query(queryString);
        return results.map((m) => ({
            id: m.message_id,
            message: m.message_text,
            sender: m.student_id,
            timestamp: m.creat_at
        }));
    } catch(err) {
        console.error('Failed to get chat log: ', err);
        return null;
    }
}

export const postMessage = async (message, chat_id, student_id) => {
    try {
        // check chat_id
        var [results] = await pool.query('SELECT * FROM Chat WHERE Chat.chat_id = ?', [chat_id]);
        if (results.length === 0) return null;

        // check student id
        [results] = await pool.query('SELECT * FROM Student WHERE Student.student_id = ?', [student_id]);
        if (results.length === 0) return null;

        [results] = await pool.query(
            'INSERT INTO Message (message_text, message_sender,create_at, chat_id) VALUES (?, ?, NOW(), ?)',
            [message, results.student_id, chat_id]
        );
        return results.insertId;
        // io.to(chat_id).emit('newMessage', { message_id, message, sender: rmit_sid });
    } catch (err) {
        console.error('Failed to post message to chat: ', err);
    }
}

export const getNewMessage = async (message_id, chat_id) => {
    var [results] = await pool.query('SELECT * FROM Chat WHERE Chat.chat_id = ?', [chat_id]);
    if (results.length === 0) return null;

    var whereQuery = '';

    // search for message with bigger id (newer messages)
    if (filter.message_id) {
        whereQuery += `message.message_id > ${pool.escape(message_id)}`;
    }

    const queryString = `
        SELECT * FROM Message
        JOIN Student as student on message.message_sender = student.student_id
        WHERE message.chat_id = ${pool.escape(chat_id)} ${whereQuery? `AND ${whereQuery}` : ``}
        ORDER BY message.message_id DESC
        ${LIMIT_QUERY_BOOL ? `LIMIT ${LIMIT_QUERY_VAL}` : ``}
    `;
    try {
        const [results] = await pool.query(queryString, [message_id]);
        return results.map((m) => ({
            id: m.message_id,
            message: m.message_text,
            sender: m.student_id,
            timestamp: m.creat_at
        }));
    } catch (err) {
        console.error('Failed to retrieve message: ', err);
        return null;
    }
}
