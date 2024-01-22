import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"
import queryString from 'query-string'
import { getHeroByName } from "../helpers"

export const SearchPage = () => {

    // *CustomHook de react router para la navegación entre los router
    const navigate =useNavigate();
    // *CustomHook de react router para poder obtener los valores de los query 
    const location = useLocation();

    const {q = ''} = queryString.parse(location.search);

    const heroes = getHeroByName(q);

    const {searchText,onInputChange} = useForm({
        searchText: q,
    });

    // *Condicionales para mostrar los mensajes en la busqueda
    const showSearch = (q.length === 0);
    const showError = (q.length !== 0) && (heroes.length === 0);

    const onSearchSubmit = (event) =>{
        event.preventDefault();
        
        navigate(`?q=${searchText}`);
    };

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    
                    <h4>Searching</h4>
                    <hr />
                    
                    <form onSubmit={onSearchSubmit} aria-label="form">
                        <input type="text"
                            placeholder="Search a hero" 
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />

                        <button className="btn btn-outline-primary mt-2">
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Result</h4>
                    <hr />

                    {/*
                    Manera alternativa de mostrar los mensajes 
                    {
                        (q==='')
                        ?<div className="alert alert-primary">Search a hero</div>
                        : (heroes.length === 0) 
                            && <div className="alert alert-danger">There's not hero with <b>{q}</b></div>
                    }
                    */}

                    <div 
                        className="alert alert-primary animate__animated animate__fadeIn"
                        style={{display: (showSearch) ? '' : 'none'}}
                        aria-label="showSearch"
                    >
                        Search a hero
                    </div>

                    <div 
                        className="alert alert-danger animate__animated animate__fadeIn"
                        style={{display: (showError) ? '' : 'none'}}
                        aria-label="showError"
                    >
                        There's not hero with <b>{q}</b>
                    </div>

                    {
                        heroes.map(hero =>(
                            
                            <div key={hero.id}>
                                <HeroCard {...hero}/>
                                <br />
                            </div>
                            
                        ))
                    }

                </div>
            
            </div>


        </>
    )
}


