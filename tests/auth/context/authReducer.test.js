import { authReducer } from "../../../src/auth";
import { types } from "../../../src/auth";

describe('Prueba en authReducer', () => {

    const initialState = {
        logged: false,
        user: null,
    };

    test('Debe de eretornar el estado por defecto', () => {

        const newState = authReducer(initialState,{});

        expect(newState).toBe(initialState);        
    });

    test('Debe de (login) llamar el login autenticar y establecer el user', () => {
        
        const action = {
            type: types.login,
            payload:{
                id: 'ABC',
                name:'Jose Maiz'
            },
        }
        const newState = authReducer(initialState,action);

        expect(newState.user).toBe(action.payload);
        expect(newState.logged).toBeTruthy();
        expect(newState).toEqual({logged: true, user: action.payload});

    });

    test('Debe de (logout) borrar el name del usuario y logged en false', () => {
        
        const initialStatelogout = {
            logged: true,
            user:{
                id: 'ABC',
                name:'Jose Maiz'
            },
        }

        const action = {
            type: types.logout,

        };

        const newState = authReducer(initialStatelogout,action);

        expect(newState.user).toBe(null);
        expect(newState.logged).toBeFalsy();
        expect(newState).toEqual(initialState);

    })
});

