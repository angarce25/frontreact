import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import ContactForm from '../home/contact';

const Home = () => {
    const [featuredPlace, setFeaturedPlace] = useState(null);
    const [showFullText, setShowFullText] = useState(false);
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
    const handleToggleFullText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <main>
            <section className="container">
            <Carousel interval={3000}> {/* Cambia el intervalo a tu preferencia, 3000ms = 3 segundos */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../../images/vila.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption style={{ color: "black", textAlign: "center", top: "50%", transform: "translateY(-50%)" }}>
                            <h3>Comparte nuestras aventuras y sumérgete en ellas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../../images/altea1.jpg"
                            alt="Second slide"
                        />
                        <Carousel.Caption style={{ color: "black", textAlign: "center", top: "50%", transform: "translateY(-50%)" }}>
                            <h3>Recarga energías</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../../images/calpe1.jpg"
                            alt="third slide"
                        />
                        <Carousel.Caption style={{ color: "black", textAlign: "center", top: "50%", transform: "translateY(-50%)" }}>
                            <h3>Desconecta para reconectar</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="../../images/ibiza.jpg"
                            alt="fourth slide"
                        />
                        <Carousel.Caption style={{ color: "black", textAlign: "center", top: "50%", transform: "translateY(-50%)" }}>
                            <h3>Tu paz mental, no es negociable!!!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                
                <section className="row mt-4 mb-4 mb-lg-0">
                    <article className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                {featuredPlace && (
                                    <>
                                       <h2 className="card-title">{featuredPlace.title} - Destacado del mes</h2>
                                        <img src={featuredPlace.Url_image} className="card-img-top img-fluid" alt="Lugar destacado" style={{ maxWidth: "85%", height: "auto" }}/>
                                        <p className="card-text">
                                            {showFullText ? featuredPlace.content : `${featuredPlace.content.slice(0, 100)}...`}
                                            {!showFullText && (
                                                <button onClick={handleToggleFullText} className="btn btn-link">Leer más</button>
                                            )}
                                        </p>
                                        {/* Usar navigate en lugar de Link */}
                                        <button onClick={handleVerMasClick} className="btn btn-primary">Ver más</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </article>
                    <aside className="col-lg-6">
                        <ContactForm />
                    </aside>
                    <article className="col-12 mt-4">
                        <div className="card"   >
                            <div className="card-body">
                                <h2 className="card-title">Comparte tus experiencias de vida</h2>
                                <p className="card-text">¡Ayuda a nuestros lectores a seguir descubriendo experiencias!</p>
                                <button onClick={handleRestauranteClick} className="btn btn-primary">Crear</button>
                            </div>
                        </div>
                    </article>
                </section>
            </section>
        </main>
    );
};

export default Home;
