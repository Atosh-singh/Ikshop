const oneMinuteExpiry = async (otpTime) => {
  try {
    // Make sure otpTime is a Date object
    if (!(otpTime instanceof Date)) {
      otpTime = new Date(otpTime); // Convert it to Date if it's not
    }

    const currentDate = new Date();
    const differenceValue = (currentDate.getTime() - otpTime.getTime()) / 1000 / 60; // Convert ms to minutes

    console.log('Expiry minutes: ', Math.abs(differenceValue));

    // If more than 1 minute has passed
    if (Math.abs(differenceValue) >= 1) {
      return true;  // Allow OTP to be sent
    }
    return false; // Don't allow OTP to be sent
  } catch (error) {
    console.log(error);
  }
};


const fiveMinuteExpiry = async (otpTime) => {
  try {
    // Make sure otpTime is a Date object
    if (!(otpTime instanceof Date)) {
      otpTime = new Date(otpTime); // Convert it to Date if it's not
    }

    const currentDate = new Date();
    const differenceValue = (currentDate.getTime() - otpTime.getTime()) / 1000 / 60; // Convert ms to minutes

    console.log('Expiry minutes: ', Math.abs(differenceValue));

    // If more than 1 minute has passed
    if (Math.abs(differenceValue) >= 5) {
      return true;  // Allow OTP to be sent
    }
    return false; // Don't allow OTP to be sent
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  oneMinuteExpiry,
  fiveMinuteExpiry
};
