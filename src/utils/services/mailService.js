import { sendEmail } from "../emailService.js";

export const sendStudentWelcomeMail = async (student) => {
    const { name, email } = student;
    const subject = `Welcome to Student Management, ${name}`;
    const text = `Hi ${student.name},
    
    You have been successfully registered in the Student Management system.

Regards,
Administration`;

    await sendEmail(
        email,
        subject,
        text
    )
}

export const sendStudentUpdateMail = async (student) => {
    const { name, email } = student;
    const subject = `Your student record was updated`;
    const text = `Hi ${name},
    
    Your student record has been updated. If you did not request this change, contact admin.

Regards,
Administration`;

    await sendEmail(
        email,
        subject,
        text
    )
}
export const sendStudentRecordDestroy = async (student) => {
    const { name, email } = student;
    const subject = `Your student record was removed`;
    const text = `Hi ${name},

    Your student record has been removed from the Student Management system. If this was unexpected, contact admin.

Regards,
Administration`;

    await sendEmail(
        email,
        subject,
        text
    )
}