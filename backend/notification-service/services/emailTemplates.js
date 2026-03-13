const templates = {
  ORDER_SUCCESS: (data) => ({
    subject: `Your order ${data?.orderId} was successful!`,
    text: `Hi, your order ${data?.orderId} has been placed successfully.`,
    html: `<p>Hi,</p><p>Your order <strong>${data?.orderId}</strong> has been placed successfully.</p>`,
  }),

  ORDER_FAILED: (data) => ({
    subject: `Your order ${data?.orderId} failed`,
    text: `Hi, unfortunately your order ${data?.orderId} could not be processed.`,
    html: `<p>Hi,</p><p>Unfortunately your order <strong>${data?.orderId}</strong> could not be processed.</p>`,
  }),

  OTP_VERIFICATION: (data) => ({
    subject: "Your OTP Code",
    text: `Your OTP code is: ${data.otp}`,
    html: `<p>Your OTP code is: <strong>${data.otp}</strong></p>`,
  }),

  PASSWORD_RESET: (data) => ({
    subject: "Reset Your Password",
    text: `Click the link to reset your password: ${data.resetLink}`,
    html: `<p>Click <a href="${data.resetLink}">here</a> to reset your password.</p>`,
  }),

  GENERAL_NOTIFICATION: (data) => ({
    subject: data.subject || "Notification",
    text: data.message,
    html: `<p>${data.message}</p>`,
  }),

  PROMOTIONAL: (data) => ({
    subject: data.subject || "Special Offer!",
    text: data.message,
    html: `<h3>${data.subject || "Special Offer!"}</h3><p>${data.message}</p>`,
  }),

  ACCOUNT_ACTIVATION: (data) => ({
    subject: "Activate Your Account",
    text: `Please activate your account using this link: ${data.activationLink}`,
    html: `<p>Click <a href="${data.activationLink}">here</a> to activate your account.</p>`,
  }),

  SUBSCRIPTION_RENEWAL: (data) => ({
    subject: "Subscription Renewal Reminder",
    text: `Your subscription will expire on ${data.expiryDate}.`,
    html: `<p>Your subscription will expire on <strong>${data.expiryDate}</strong>. Please renew to continue enjoying the service.</p>`,
  }),
};

export const getEmailTemplate = (event, data) => {
  const templateFn = templates[event];
  if (!templateFn) return null;
  return templateFn(data);
};