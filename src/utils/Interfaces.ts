export interface ISignInFormInput {
  email: string;
  password: string;
}
export interface IModalError {
  isError: boolean;
  message: string | undefined;
}
export interface ITeamsName {
  id: string;
  name: string;
}
export interface IDrivers {
  id: number;
  position: number;
  constructorName: string;
  name: string;
  driverNumber: number;
  points: number;
  wins: number;
  dateOfBirth: Date;
  nationality: string;
}

export interface IfilteredDrivers {
  DriverDataReducer: IDrivers[];
}

export interface ISignInValidation {
  email: string;
  password: string;
  userInputEmail: string;
  userInputPassword: string;
}

export interface IPrivateRoute {
  children: React.ReactNode;
  path?: string;
  isUserAuth: Boolean;
}

export interface IShowModal {
  show: boolean;
}
