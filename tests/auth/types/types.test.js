import { types } from "../../../src/auth";


describe('Pruebas en Types', () => {
    
    test('Debe de regresar estos Types', () => {
        
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });

    });
});

