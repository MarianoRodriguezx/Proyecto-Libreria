/* eslint-disable @typescript-eslint/naming-convention */
export interface IUser {
    email: string;
    username: string;
    password: string;
    role: number;
}
// Se puede usar correos inventados para los roles "1", ya que no se mandará correo.
export const users: IUser[] = [
    {   
        email: "carlosnormal2002@gmail.com",
        username: "Carlos Mortal",
        password: "12345678",
        role: 1,
    },
    {   
        email: "carmandll96@gmail.com",
        username: "Carlos Supervisor",
        password: "12345678",
        role: 2,
    },
    {   
        email: "carlos.lpz.2k02@gmail.com",
        username: "Carlos Admin",
        password: "12345678",
        role: 3,
    }
]