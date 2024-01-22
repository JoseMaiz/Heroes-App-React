import { render, screen } from '@testing-library/react';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { AuthContext } from '../../src/auth';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('Pruebas en el PrivateRoute', () => {
    
    Storage.prototype.setItem = jest.fn();

    beforeEach(()=>jest.clearAllMocks());
    
    test('Debe de mostrar el children si esta autenticado y verificar que se activa la funcion "localStorage.setItem"', () => {

        
        const contextValue = {
            logged: true,
            user: {
                id: "ABC",
                name: "Jose Maiz"
            }
        };

        const config = [
            {
                path: '/',
                element:
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
            },
        ];

        const router = createMemoryRouter(config,{initialEntries: ['/']})

    
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
    });


    test('Debe de navegar si no esta autenticado', () => {

        
        const contextValue = {
            logged: false,
            user: null
        };

        const config = [
            {
                path: '/',
                element:
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
            },
            {
                path: '/login',
                element: <h1>Pagina de login</h1>
            },
        ];

        const router = createMemoryRouter(config,{initialEntries: ['/']})

    
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Pagina de login')).toBeTruthy();
    });
    
});