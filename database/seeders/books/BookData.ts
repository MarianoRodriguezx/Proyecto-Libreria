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

const nodeEnv:string = Env.get('NODE_ENV')
const imageBasePath = nodeEnv === 'development' ? 'testing/images/' :  'oficial/images/';
const pdfBasePath = nodeEnv === 'development' ? 'testing/pdf/' :  'oficial/pdf/';

export const books: IEditorial[] = [
    {
        // ID 1   
        name: "A la orilla de la luz",
        description: "Bogotá se encuentra en la cima de una montaña, a la orilla de la luz. Es una capital caótica, contaminada y ruidosa, construida sobre los restos de un cementerio indígena. Sus habitantes tratan de sobrevivir a la rutina, tienen preocupaciones, trabajos, aficiones, amigos y parejas. Algunos aman la ciudad y otros sueñan con marcharse de allí en el futuro.s",
        book_path: `${pdfBasePath}clgj15t4f0002cwqv8dwddgpd.pdf`,
        cover_path: `${imageBasePath}clgj15t4f0002cwqv8dwddgpd.jpeg`,
        posted_by: 5,
        author_id: 6,
        category_id: 3,
        editorial_id: 2,
    },
    {
        // ID 2  
        name: "Harry Potter y la Piedra Filosofal",
        description: "En su undécimo cumpleaños se entera de que es un mago y la trama de los libros se centra principalmente en los años en los que el huérfano Potter concurre al Colegio Hogwarts de Magia y Hechicería para practicar bajo la guía del director Albus Dumbledore y demás profesores.",
        book_path: `${pdfBasePath}clgk2jllj0002f0qvbthebzhy.pdf`,
        cover_path: `${imageBasePath}clgk2jllj0002f0qvbthebzhy.jpeg`,
        posted_by: 5,
        author_id: 5,
        category_id: 2,
        editorial_id: 6,
    },
    {
        // ID 3
        name: "Luna nueva",
        description: "La Saga Crepúsculo es una saga de novelas de género fantasía/romance escrita por Stephenie Meyer. Relata la vida de Isabella Bella Swan, una adolescente que se traslada a Forks, Washington y cuya vida ,cambia radicalmente cuando se enamora de un vampiro llamado Edward Cullen.",
        book_path: `${pdfBasePath}clgk2r17l0002rkqvba7y4q8z.pdf`,
        cover_path: `${imageBasePath}clgk2r17l0002rkqvba7y4q8z.jpeg`,
        posted_by: 5,
        author_id: 5,
        category_id: 3,
        editorial_id: 3,
    },
    {
        // ID 4
        name: "Una perfecta confusión",
        description: "Un rumor, una confusión, un noviazgo falso y dos chicos que aprenderán que los sentimientos son más complicados de lo que parecen. ¿El amor puede surgir de un simple error o será un error que surja el amor entre ellos?",
        book_path: `${pdfBasePath}clgk2s70s0005rkqv86255hza.pdf`,
        cover_path: `${imageBasePath}clgk2s70s0005rkqv86255hza.jpeg`,
        posted_by: 4,
        author_id: 5,
        category_id: 3,
        editorial_id: 1,
    },
    {
        // ID 4
        name: "El Psicoanalista",
        description: "Así comienza el anónimo que recibe Starks, psicoanalista con una larga experiencia y una tranquila vida cotidiana. Starks tendrá que emplear toda su astucia y rapidez para, en quince días, averiguar quién es el autor de esa amenazadora misiva que promete hacerla la existencia imposible",
        book_path: `${pdfBasePath}clgk3br8l00022oqvcfzl2sis.pdf`,
        cover_path: `${imageBasePath}clgk3br8l00022oqvcfzl2sis.jpeg`,
        posted_by: 4,
        author_id: 4,
        category_id: 5,
        editorial_id: 5,
    }
]

export const booksProd: IEditorial[] = [
    
]