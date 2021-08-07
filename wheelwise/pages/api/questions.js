const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
  const body = JSON.parse(req.body);

  const message = `
  Name: ${body.name}\r\n
  \r\n
  Phone: ${body.phone}\r\n
  \r\n
  Email: ${body.email}\r\n
  \r\n
  Message: ${body.message}`;

  const data = {
    to: 'rafaysarr@gmail.com',
    from: 'shaikhabdurrafay@gmail.com',
    subject: 'New Iquiry',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  };

  try {
    mail.send(data);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ status: 'ok' });
}
