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
        // ID 1
        email: "carlosnormal2002@gmail.com",
        username: "Carlos Mortal",
        password: "12345678",
        role: 1,
    },
    {   
        // ID 2
        email: "carmandll96@gmail.com",
        username: "Carlos Supervisor",
        password: "12345678",
        role: 2,
    },
    {   
        // ID 3
        email: "carlos.lpz.2k02@gmail.com",
        username: "Carlos Admin",
        password: "12345678",
        role: 3,
    },
    {   
        // ID 4
        email: "americanormal17@gmail.com",
        username: "América Normal",
        password: "12345678",
        role: 1,
    },
    {   
        // ID 5
        email: "marianonormalmorat@gmail.com",
        username: "Mariano Normal",
        password: "12345678",
        role: 1,
    },
    {   
        // ID 6
        email: "americaloera145@gmail.com",
        username: "América Supervisora",
        password: "12345678",
        role: 2,
    },
    {   
        // ID 7
        email: "marianoroddhd@gmail.com",
        username: "Mariano Supervisor",
        password: "12345678",
        role: 2,
    },
    {   
        // ID 8
        email: "cabralmariano.c59@gmail.com",
        username: "Mariano Admin",
        password: "12345678",
        role: 3,
    },
    {   
        // ID 9
        email: "americaloa145@gmail.com",
        username: "América Admin",
        password: "12345678",
        role: 3,
    }
]