
import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';


describe('Pruebas en authReducer', () => { 

    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {})
        expect(state).toEqual({ logged: false })
    });
    
    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Fernando',
                email: '4ySjP@example.com',
            }
        }        
        const state = authReducer({ logged: false }, action)
        expect(state).toEqual({ logged: true, user: action.payload })
    });

    test('debe de (logout) borrar el name del usuario y logged en false', () => {

        const state = {
            logged: true,
            user: {
                id: '123',  
                name: 'Fernando'
            }
        }

        const action = {
            type: types.logout
        }

        const NewState = authReducer(state, action);
        
        console.log(NewState);
        
        
        expect(NewState).toEqual({ logged: false })
    });
 })