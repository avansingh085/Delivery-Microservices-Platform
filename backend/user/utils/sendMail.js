import transport from '../config/mail.js';

const sender = {
    address: "delivery@demomailtrap.co",
    name: "delivery",
};
const sendMail = async (to, subject, text) => {
    try {
        const info = await transport
            .sendMail({
                from: sender,
                to: to,
                subject: subject || "",
                text: text || "",
                category: "Integration Test",
            })
            console.log(info)


        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendMail;