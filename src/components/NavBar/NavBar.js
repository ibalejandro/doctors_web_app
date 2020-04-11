import React from "react";
import { useAuth0 } from "../../shared/Auth";
import { NavDropdown, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth0();

    if (!isAuthenticated) {
        return <div>Loading...</div>
    }

    return (
        <Navbar>
            <Container className="justify-content-end">
                <NavDropdown title="Doctor Name" id="nav-dropdown" alignRight>
                    {isAuthenticated && (
                        <NavDropdown.Item onClick={() => logout({})}>Log out</NavDropdown.Item>
                    )}
                </NavDropdown>
            </Container>
        </Navbar>
    );
};

export default NavBar;
