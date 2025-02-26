export const checkValidData = (email, password, name) => {
  const isEmailValidate = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );
  const isPasswordValidate =
    /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(password);

  //const isNameValidate = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  //if (!isNameValidate) return "Name is not valid";
  if (!isEmailValidate) return "Email is not valid";
  if (!isPasswordValidate) return "Password is not valid";

  return null;
};
