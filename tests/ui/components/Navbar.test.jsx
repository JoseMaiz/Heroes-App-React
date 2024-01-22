import { RouterProvider, createMemoryRouter} from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en Navbar', () => {
    
    const contextValue = {
        logged: true,
        user: {
            id:'ABC',
            name:"Juan Carlos Bodoque"
        },
        logout: jest.fn()
    }
    
    
    beforeEach(()=> jest.clearAllMocks());
    
    const config = [
        {
            path:'/',
            element: <Navbar/>
        },
        {
            path: '/login',
            element:<h1>Usted volvio al login</h1>
        }
    ]

    test('Debe de mostrar el nombre del usuario', () => {
        
        const router = createMemoryRouter(config,{initialEntries:['/']});
        
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        )

        expect(screen.getByText("Juan Carlos Bodoque")).toBeTruthy();

    });

    test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        
        const router = createMemoryRouter(config,{initialEntries:['/']});
        
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        )

        const logoutButton = screen.getByRole('button');

        fireEvent.click(logoutButton);

        // screen.debug();

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
    });
});