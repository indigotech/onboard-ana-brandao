export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com+\.br$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,50}$/;
  return passwordRegex.test(password);
};

export const isValidPhone = (phone: string) => {
  const phoneRegex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/;
  return phoneRegex.test(phone);
};

export const isValidBirthDate = (birthDate: string) => {
  const birthDateRegex =
    /^(?:19\d{2}|200[0-7])-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])\b$/;
  return birthDateRegex.test(birthDate);
};

export const isValidRole = (role: string) => {
  if (role !== 'Admin' && role !== 'User') {
    return false;
  } else {
    return true;
  }
};
