const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const message = `
  Name: ${body.name}\r\n
  \r\n
  Phone: ${body.phone}\r\n
  \r\n
  Email: ${body.email}\r\n
  \r\n
   Total Price: ${body.total}\r\n
  \r\n
  Items Needed: ${body.items}
  `;

  const data = {
    to: 'rafaysarr@gmail.com',
    from: 'shaikhabdurrafay@gmail.com',
    subject: 'New Order',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  };

  try {
    await mail.send(data);
  } catch (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ status: 'ok' });
}
