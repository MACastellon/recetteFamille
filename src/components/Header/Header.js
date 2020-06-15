import React, {useContext} from 'react';
import {NavLink,Link} from "react-router-dom";
import {Nav, Navbar, NavDropdown,Form,FormControl,Button} from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
function Header() {

    const {currentUser, logoutFn} = useContext(AuthContext);
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/accueil">Accueil</Nav.Link>
                        <Nav.Link as={NavLink} to="/recettes">Recettes</Nav.Link>
                        {currentUser ? (
                            <>
                                <NavDropdown title="Options" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={NavLink} to="/utilisateur/creer-recette">Créer une recette</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/utilisateur/mes-recettes">Mes Recettes</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutFn}>Se Déconnecter</NavDropdown.Item>
                                </NavDropdown>
                            </>

                        ) : (
                            <Nav.Link as={NavLink} to="/utilisateur/connexion">Se Connecter</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
