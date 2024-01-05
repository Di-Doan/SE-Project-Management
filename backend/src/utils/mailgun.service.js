import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgunInstant = new Mailgun(FormData);
const mailgun = mailgunInstant.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY || '',
});

export default mailgun;
