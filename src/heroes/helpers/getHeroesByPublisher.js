import { heroes } from "../data/heroes";

export const getHeroesByPublisher = ( publisher ) => {
    const validPublisher = ['DC Comics', 'Marvel Comics']; // esto es un array que se llama validPublisher para validar si el publisher es valido

    if ( !validPublisher.includes( publisher ) ) {    
        throw new Error( `Publisher "${ publisher }" is not valid` );
    }                    
    return heroes.filter( hero => hero.publisher === publisher );
}