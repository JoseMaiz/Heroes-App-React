import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe('Prueba en PublicRoute', () => {

    test('Debe de mostrar el children si no esta autenticado', () => {
        
        const contextValue = {
            logged: false,
            user: null
        };
    
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Publica')).toBeTruthy();        
    });

    test('Debe de navegar si esta autenticado', () => {
        
        const contextValue = {
            logged: true,
            user:{
                id:'ABC123',
                name:'Jose Maiz',
            }
        };

        // *Configuraciones de rutas elaboradas para la prueba
        const config = [
            {
                path: '/login',
                element:
                    <PublicRoute>
                        <h1>Ruta Publica</h1>
                    </PublicRoute>,
            },
            {
                path: '/',
                element: <h1>Pagina de marvel</h1>
            }
        ];

        // *Crear las rutas con las configuraciones ya establecidas y estableciendo la ruta de inicio con el path "/login"
        const router = createMemoryRouter(config, {initialEntries: ['/login']});

        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect(screen.getByText('Pagina de marvel')).toBeTruthy();
    
    });
});