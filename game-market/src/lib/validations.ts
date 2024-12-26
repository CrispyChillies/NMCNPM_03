export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

export const validateCitizenId = (id: string): boolean => {
  // Adjust this regex based on your country's citizen ID format
  const citizenIdRegex = /^[0-9]{9,12}$/;
  return citizenIdRegex.test(id);
};

export const validatePersonalInfo = (info: {
  firstName: string;
  lastName: string;
  citizenId: string;
  email: string;
  phoneNumber: string;
  userAddress: string;
}) => {
  const errors: Record<string, string> = {};

  if (!info.firstName.trim()) errors.firstName = "First name is required";
  if (!info.lastName.trim()) errors.lastName = "Last name is required";
  if (!info.userAddress.trim()) errors.userAddress = "Address is required";

  if (!validateEmail(info.email)) {
    errors.email = "Invalid email format";
  }

  if (!validatePhoneNumber(info.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number format";
  }

  if (!validateCitizenId(info.citizenId)) {
    errors.citizenId = "Invalid citizen ID format";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
