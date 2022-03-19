export interface ISignInFormInput {
  email: string;
  password: string;
}
export interface IModalError {
  isError: boolean;
  message: string | undefined;
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
