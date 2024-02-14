import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica para enviar el formulario
        // Por ejemplo, enviar los datos del formulario a través de onSubmit
        // onSubmit(formData);

        // Mostrar el modal después de enviar el formulario
        setShowModal(true);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Formulario de Contacto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre y Apellidos</label>
                        <input type="text" className="form-control" id="name" maxLength={60} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input type="tel" pattern="[0-9]{10}" className="form-control" id="phone" maxLength={10} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="comments" className="form-label">Comentarios</label>
                        <textarea className="form-control" id="comments" maxLength={400} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>

            {/* Modal de agradecimiento */}
            {showModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">¡Gracias por contactarnos!</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Hemos recibido tu mensaje. Nos pondremos en contacto contigo lo antes posible.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
