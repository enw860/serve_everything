const fs = require('fs');
const path = require("path");
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;

function compose_and_send_email(receivers, subject, emailBody, attachments, cc, bcc) {
    const email = compose_email.apply(this, arguments);
    return send_email(email);
}

function compose_email(receivers, subject, emailBody, attachments, cc, bcc) {
    const email = {
        to: receivers,
        from: FROM_EMAIL,
        cc: cc || [],
        bcc: bcc || [],
        subject: subject || "",
        html: emailBody || [],
        attachments: []
    };

    (attachments || []).forEach(attachment => {
        if (fs.existsSync(attachment.src)) {
            let data = fs.readFileSync(attachment.src, encoding = "base64");

            data && email.attachments.push({
                filename: attachment.filename,
                content: data,
                type: attachment.type,
                disposition: attachment.disposition || "attachment",
                content_id: attachment.content_id || ""
            })
        }
    })

    return email;
}

function send_email(email) {
    return sgMail.setApiKey(SENDGRID_API_KEY).send(email);
}

function fillRegularEmailTemplate(content, username) {
    const SRC = path.join(__dirname, "./EmailTemplate/regular.html");

    let data;
    if (fs.existsSync(SRC)) {
        data = fs.readFileSync(SRC, encoding = "utf-8");
        if (data) {
            data = data
                .replace("${USERNAME}", username || "User")
                .replace("${CONTENT}", content || "")
        }
    }

    return data || "";
}

function fillResetPasswordTemplate(secrete, username) {
    const SRC = path.join(__dirname, "./EmailTemplate/resetPassword.html");

    let data;
    if (fs.existsSync(SRC)) {
        data = fs.readFileSync(SRC, encoding = "utf-8");
        if (data) {
            data = data
                .replace("${USERNAME}", username || "User")
                .replace("${SECRETE}", secrete || "")
        }
    }

    return data || "";
}

module.exports = {
    compose_email,
    send_email,
    compose_and_send_email,
    fillRegularEmailTemplate,
    fillResetPasswordTemplate
}

/*
    Referring an image attachment in email:

    Following is an attachment you want it showing in the email: {
        filename: "img.png",
        type: "png",
        src: "<PATH>/img.png",
        disposition: "inline",
        content_id: "img"
    }

    Here is how you reference it in the email body:
    <img src ="cid:img" />
*/