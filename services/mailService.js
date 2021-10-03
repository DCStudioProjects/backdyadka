const nodemailer = require("nodemailer");

class MailService {
  async sendActivationMail(to, link) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта у Дядьки в кино",
      text: "",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html lang="en">
      
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Static Template</title>
          <style>
              .ExternalClass {
                  width: 100%;
              }
          </style>
      </head>
      
      <body style="color: #000;font-family: Segoe UI, sans-serif;margin: auto;text-align: center;">
          <h1 style="font-size: 25px; font-weight: 400">Дядька в кино</h1>
          <h2 style="font-size: 25px; font-weight: 500; margin-bottom: 30px;">
              Нажми на кнопку ниже и активируй свой аккаунт!
          </h2> <a style="font-size: 15px;background: #3f2aff;border-radius: 10px;color: #fff;text-decoration: none;padding: 10px;" href="${link}">Активировать аккаунт</a>
          <p style="font-size: 18px;margin-top: 30px;">Всё сломалось? Воспользуйся ссылкой ниже!</p>
          <a href="${link}" style="color: #000;">${link}</a>
          <p style="font-size: 18px;"> Не регистрировался у нас?
              <br /> Пора сделать это, но если не готов, то проигнорируй это письмо — ничего не произойдёт! </p>
          <p style="font-size: 18px;"> Ну и напоследок, не отвечай на данное письмо, оно было создано автоматически! </p>
      </body>
      
      </html>`,
    });
  }
}

module.exports = new MailService();
