import * as express from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

// imports the MailGun type to apply
import MailGun from 'mailgun.js';

// imports the FormData function Mailgun needs as its constructor argument
import * as FormData from 'form-data';

// imports the new Mailgun() class to instantiate
//@ts-ignore
import * as Mailgun from 'mailgun.js';

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
	username: 'api',
	key: process.env.MAILGUN_KEY
});

const router = express.Router();

router.post('/api/hello', express.json(), async (req, res, next) => {
	try {
		const newEmail = req.body;
		const result = await mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
			to: 'przekwas@gmail.com',
			subject: newEmail.subject,
			from: newEmail.from,
			html: newEmail.message
		});
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
