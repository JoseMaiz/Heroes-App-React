import { fireEvent, render, screen } from "@testing-library/react";
import { routesConfig } from "../../../src/router";
import { RouterProvider, createMemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=> mockUseNavigate,
}));


describe('Prueba en SearchPage', () => {
    
    const config = [
        {
            path:'/search',
            element: <SearchPage/>
        }
    ]

    test('Debe de mostrarse correctamente con valores por defecto', () => {
                
        const router = createMemoryRouter(config,{initialEntries:['/search']});        
        const {container} = render(
            <RouterProvider router={router}/>
        )

        expect(container).toMatchSnapshot()
    });

    test('Debe de mostrar a batman tanto en imagen como el input con el valor query string', () => {
        
        
        const router = createMemoryRouter(config,{initialEntries:['/search?q=batman']});        
        
        render(
            <RouterProvider router={router}/>
        )


        const input = screen.getByRole('textbox');
        const image = screen.getByRole('img');
        const divError = screen.getByLabelText('showError');
        const divSearch = screen.getByLabelText('showSearch');


        expect(input.value).toBe('batman');
        expect(image.src).toContain('/heroes/dc-batman.jpg');
        expect(divError.style.display).toBe('none');
        expect(divSearch.style.display).toBe('none');

        // screen.debug();
    });

    test('Debe de mostrar un error si no se encuentra hero(batman123)', () => {
        
        const router = createMemoryRouter(config,{initialEntries:['/search?q=batman123']});        
        
        render(
            <RouterProvider router={router}/>
        )

        const divError = screen.getByLabelText('showError');
        const divSearch = screen.getByLabelText('showSearch');

        expect(divError.style.display).not.toBe('none');
        expect(divSearch.style.display).toBe('none');

    });
    
    test('Debe de llamar el navigate a una pantalla nueva', () => {
        
        const router = createMemoryRouter(config,{initialEntries:['/search']});        
        
        const inputValue = 'superman'

        render(
            <RouterProvider router={router}/>
        )

        const inputSearch = screen.getByRole('textbox');
        const formSearch = screen.getByRole('form');

        // *Se introduce el valor en el input del form
        fireEvent.input(inputSearch,{target:{value: inputValue}});

        //* Otra manera de introducir el valor en el input del form
        // fireEvent.change(inputSearch,{target:{name:'searchText',value: inputValue}});
        
        //* Se envia el valor para obtener la busqueda
        fireEvent.submit(formSearch);


        expect(mockUseNavigate).toHaveBeenCalled()
        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)

    });

});