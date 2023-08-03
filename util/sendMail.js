const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'thanhnho270701@gmail.com',
        pass: 'z x j f k c k t y r a a e w r l'
    }
});
module.exports = { transporter };