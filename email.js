import sgMail from '@sendgrid/mail';

export default class MailClient {

    constructor(key) {
        sgMail.setApiKey(key);
    }

    async sendMail(msg) {
        return sgMail.send(msg);
    }
}