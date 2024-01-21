import * as chat from '../../entities/chat.service.js'

export async function getMessageLog(req, res) {
    const {filter} = req.body;
    const {id: chatId} = req.params;

    if (!chatId) return res.status(400).json({ error: 'Missing required chat_id' });

    const chatLog = await chat.getMessageLog(chatId, filter);
    if (chatLog.length > 0) return res.status(200).json({ chatLog });
    return res.status(404).json({ error: 'Chat log not found!' });
}

export async function postMessage(req, res) {
    const {message} = req.body;
    const {id: studentId} = req.user;
    const {id: chatId} = req.params;

    if (!message || !chatId) return res.status(400).json({ error: 'Missing required message properties.' });

    const postedMessageId = chat.postMessage(message, chatId, studentId);
    if (postedMessageId) return res.status(201).json({ status: true });
    return res.status(500).json({ error: 'Fail to post mesage'})
}