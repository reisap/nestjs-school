import nodemailer from 'nodemailer';

import Config from '../../../libs/common/src/config/config.json';

const mailConfig = Config.mail;

export const transporter = nodemailer.createTransport({ ...mailConfig });
