const oneMinuteExpiry = (otpTime) => {
  try {
    otpTime = new Date(otpTime); // Ensure it's a Date object
    const now = new Date();
    const diffInMs = now - otpTime; // difference in milliseconds
    const diffInMinutes = diffInMs / 1000 / 60; // convert to minutes
    console.log('Expiry minutes:', diffInMinutes);

    return diffInMinutes >= 1; // true if more than 1 minute passed
  } catch (error) {
    console.error(error);
    return false;
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
