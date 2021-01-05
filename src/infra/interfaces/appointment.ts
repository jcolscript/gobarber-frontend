import { IUser } from './user';

export interface IAppointment {
  id: string;
  date: string;
  hourFormated: string;
  user: IUser;
}
