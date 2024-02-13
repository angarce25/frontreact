import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const navbarStyle = {
        backgroundColor: '#E8F3F3',
        padding: '5px 0',
    };

    const logoStyle = {
        maxWidth: '70px', // Define el ancho máximo del logo
        maxHeight: 'auto', // Mantén la relación de aspecto
    };

    return (
        <nav className="navbar navbar-expand-md border-bottom mb-3" style={navbarStyle}>
            <div className="container">
              
                    <div >   
                         <NavLink to="/"><img className="logoStyle" src="../../images/logoTLF.png" alt="logo true love food con gominolas" style={logoStyle} /></NavLink>
                    </div>
                    <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link text-secondary" to="/" activeClassName="text-dark">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-secondary" to="/categories" activeClassName="text-dark">Blogs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-secondary" to="/contact" activeClassName="text-dark">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-secondary" to="/login" activeClassName="text-dark">Login</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
