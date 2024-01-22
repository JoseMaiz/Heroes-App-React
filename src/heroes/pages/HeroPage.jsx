import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";


export const HeroPage = () => {

    // *CustomHook de react router para obtener el id que se puede encontrar en determinadas rutas
    const {id} = useParams();

    const hero = useMemo(() => getHeroById(id), [id]);

    const urlImage = `/heroes/${id}.jpg`;

    const navigate = useNavigate();

    const onNavigateBack = ()=>{
        (hero.publisher === "DC Comics")
            ?navigate('/dc')           
            :navigate('/')

        // *Manera alternativa
        // navigate(-1)
    }

    if (!hero){
        return <Navigate to={"/"}/>
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={urlImage}
                    alt={hero.superhero}
                    className="img-thumbnail animate__animated animate__fadeInLeft" />
            </div>

            <div className="col-8">
                <h3>{hero.superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b>Alter ego:</b> {hero.alter_ego}</li>
                    <li className="list-group-item"> <b>Publisher:</b> {hero.publisher}</li>
                    <li className="list-group-item"> <b>First appearance:</b> {hero.first_appearance}</li>
                </ul>

                <h5 className="mt-3">Characters</h5>
                <p>{hero.characters}</p>

                <button 
                    className="btn btn-outline-primary"
                    onClick={onNavigateBack}
                    >
                    Back
                </button>
            </div>
        </div>
    )
}


