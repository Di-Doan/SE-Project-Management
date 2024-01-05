import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);
export default mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY || '',
});
