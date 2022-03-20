import { ISignInValidation } from "../utils/Interfaces";
const checkSignInData = ({
  email,
  password,
  userInputEmail,
  userInputPassword,
}: ISignInValidation) => {
  return email === userInputEmail.trim() && password === userInputPassword;
};

export default checkSignInData;
