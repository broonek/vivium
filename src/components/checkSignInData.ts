import React from "react";

interface userInputData {
  email: string;
  password: string;
  userInputEmail: string;
  userInputPassword: string;
}

const checkSignInData = ({
  email,
  password,
  userInputEmail,
  userInputPassword,
}: userInputData) => {
  return email === userInputEmail.trim() && password === userInputPassword;
};

export default checkSignInData;
