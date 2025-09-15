const otpStore = new Map(); // email -> { otp, expiresAt }

function saveOtp(email, otp) {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
  });
}

function verifyOtp(email, otp) {
  const record = otpStore.get(email);
  if (!record) return false;

  if (record.expiresAt < Date.now()) {
    otpStore.delete(email);
    return false; // expired
  }

  return record.otp === otp;
}

module.exports = { saveOtp, verifyOtp };
