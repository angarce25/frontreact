import React from 'react';

function Footer() {
    const footerStyle = {
        backgroundColor: '#E8F3F3',
        borderTop: '1px solid #ddd',
        padding: '20px 0',
        textAlign: 'center',
        width: '100%',
        marginTop: '20px' // Añade margen superior al footer
    };

    const socialIconsStyle = {
        fontSize: '20px',
        margin: '0 10px',
    };

    return (
        <footer style={footerStyle}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <ul className="list-unstyled" style={{ margin: '0', padding: '0' }}>
                            <li style={{ display: 'inline-block' }}>
                                <a href="#" className="text-secondary"><i className="fab fa-facebook" style={socialIconsStyle}></i></a>
                            </li>
                            <li style={{ display: 'inline-block' }}>
                                <a href="#" className="text-secondary"><i className="fab fa-twitter" style={socialIconsStyle}></i></a>
                            </li>
                            <li style={{ display: 'inline-block' }}>
                                <a href="#" className="text-secondary"><i className="fab fa-instagram" style={socialIconsStyle}></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

