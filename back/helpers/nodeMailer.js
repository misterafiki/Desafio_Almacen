import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import  {   fileURLToPath } from 'url'

dotenv.config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export const sendMail = async (to, subject, dynamicData, template) => {
    const htmlTemplatePath = path.join(projectRoot, 'templates', template);
    let htmlContent = fs.readFileSync(htmlTemplatePath, 'utf-8');

    Object.keys(dynamicData).forEach(key => {
        const value = dynamicData[key];
        htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    let mailOptions = {
        from: process.env.MAIL_USER,
        to: to,
        subject: subject,
        html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado exitosamente:', info.response);
        }
    });
}
