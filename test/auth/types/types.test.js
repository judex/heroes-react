import { types } from "../../../src/auth/types/types";

describe('Pruebas en Types.js', () => { 
    test('deebe de tener estos types', () => { 
        console.log(types);
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        })        
     })
 })