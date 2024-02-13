import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [featuredPlace, setFeaturedPlace] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null); // Nuevo estado para almacenar el blog seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para controlar si el modal está abierto o cerrado
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

    const handleVerMasClick = (blog) => {
        setSelectedBlog(blog); // Establecer el blog seleccionado
        setIsModalOpen(true); // Abrir el modal
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Cerrar el modal
    };

    const handleVerBlogClick = () => {
        // Navegar a la ruta deseada cuando se hace clic en "Ver blog"
        navigate('/categories');
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
                                    <button onClick={() => handleVerMasClick(featuredPlace)} className="btn btn-primary">Ver más</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Restaurante del mes</h5>
                            <p className="card-text">¡Conoce nuestro restaurante destacado del mes!</p>
                            <button onClick={handleVerBlogClick} className="btn btn-primary">Ver blog</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedBlog && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedBlog.title}</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedBlog.Url_image} alt={selectedBlog.title} className="img-fluid mb-3" />
                                <p>{selectedBlog.content}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={handleVerBlogClick}>Ver Blog</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
