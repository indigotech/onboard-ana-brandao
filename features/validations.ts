export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com+\.br$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,50}$/;
  return passwordRegex.test(password);
};

export const isValidName = (name: string) => {
  if (name === '') {
    return false;
  } else {
    return true;
  }
};

export const isValidPhone = (phone: string) => {
  if (phone.length !== 11) {
    return false;
  } else {
    return true;
  }
};

export const isValidBirthDate = (birthDate: string) => {
  const birthDateRegex =
    /^(?:19\d{2}|200[0-7])-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])\b$/;
  return birthDateRegex.test(birthDate);
};
