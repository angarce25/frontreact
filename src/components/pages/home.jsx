import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [featuredPlace, setFeaturedPlace] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedPlace = async () => {
            try {
                const response = await axios.get('http://localhost:8000/blogs'); // Cambia esta URL a tu URL real de la API
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setFeaturedPlace(response.data[0]); // Establece el primer blog como el lugar destacado
                }
            } catch (error) {
                console.error('Error fetching featured place:', error);
            }
        };

        fetchFeaturedPlace();
    }, []);

    const handleVerMasClick = () => {
        // Navegar a la ruta deseada cuando se hace clic en "Ver más"
        navigate('/categories');
    };
    const handleRestauranteClick = () => {
        // Navegar a la página de edición cuando se hace clic en "Ver más" del restaurante
        navigate('/create');
    };
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            {featuredPlace && (
                                <>
                                    <h5 className="card-title">{featuredPlace.title} - Destacado del mes</h5>
                                    <img src={featuredPlace.Url_image} className="card-img-top img-fluid" alt="Lugar destacado" />
                                    <p className="card-text">{featuredPlace.content}</p>
                                    {/* Usar navigate en lugar de Link */}
                                    <button onClick={handleVerMasClick} className="btn btn-primary">Ver más</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Comparte tus experiencias de vida</h5>
                            <p className="card-text">¡Ayuda a nuestros lectores a seguir descubriendo experiencias!</p>
                            <button onClick={handleRestauranteClick} className="btn btn-primary">Crear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
