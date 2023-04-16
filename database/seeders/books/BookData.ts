/* eslint-disable @typescript-eslint/naming-convention */

import Env from '@ioc:Adonis/Core/Env'

export interface IEditorial {
    name: string;
    description: string;
    book_path: string;
    cover_path: string;
    posted_by: number;
    author_id: number;
    category_id: number;
    editorial_id: number;
}

const imageBasePath = Env.get('NODE_ENV') === 'development' ? 'testing/images/' :  'oficial/images/';
const pdfBasePath = Env.get('NODE_ENV') === 'development' ? 'testing/pdf/' :  'oficial/pdf/';

export const books: IEditorial[] = [
    {
        // ID 1   
        name: "A la orilla de la luz",
        description: "Libro de los Morats",
        book_path: `${pdfBasePath}clgj15t4f0002cwqv8dwddgpd.pdf`,
        cover_path: `${imageBasePath}clgj15t4f0002cwqv8dwddgpd.jpeg`,
        posted_by: 5,
        author_id: 6,
        category_id: 3,
        editorial_id: 2,
    }
]