import React from 'react';
import placesData from '../../data/places.json';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const featuredPlaceId = 3;
    const featuredPlace = placesData.find(place => place.id === featuredPlaceId);

    const handleVerMasClick = () => {
        // Navegar a la ruta deseada cuando se hace clic en "Ver más"
        navigate('/categories');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{featuredPlace?.name} - Destacado del mes</h5>
                            <img src={featuredPlace?.imgUrl} className="card-img-top img-fluid" alt="Lugar destacado" />
                            <p className="card-text">{featuredPlace?.description}</p>
                            {/* Usar navigate en lugar de Link */}
                            <button onClick={handleVerMasClick} className="btn btn-primary">Ver más</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Restaurante del mes</h5>
                            <p className="card-text">¡Conoce nuestro restaurante destacado del mes!</p>
                            <a href="#" className="btn btn-primary">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
