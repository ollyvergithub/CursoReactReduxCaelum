import React from 'react';
import {Link} from "react-router-dom"

const NotFoundPage = ({location}) => {
    console.log(location)

    return(
        <div className="container">
            A Url <strong>{location.pathname}
            </strong> não existe no Twitelum, se quiser voltar para a 
            <Link to="/"> Página Inicial clique aqui</Link>

        </div>
    )
}

export default NotFoundPage

