import nodemailer from 'nodemailer';

const sendMail = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'honngduong25@gmail.com',
        pass: 'kazi uceo ktbo bngb'
    }
});

export default sendMail;