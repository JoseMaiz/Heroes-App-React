import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routesConfig } from "../src/router/routesConfig";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../src/auth";


describe('Prueba en main', () => {
    
    test('Debe de mostrar el login si no esta autenticado', () => {
        
        const contextValue = {
            logged: false,
            user: null,
        }

        const router = createMemoryRouter(routesConfig,{initialEntries:['/marvel']});

        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        );

        expect(screen.getAllByText('Login').length).toBe(2);

    });

    test('Debe de mostrar el componente de marvel si esta autenticado', () => {
        
        const contextValue = {
            logged: true,
            user: {
                id: "ABC",
                name: "Juan Carlos Bodoque"
            }
        };

        const router = createMemoryRouter(routesConfig,{initialEntries:['/login']});

        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        );

        expect(screen.getAllByRole('heading',{level: 5}).length).toBe(10);

    });
});

