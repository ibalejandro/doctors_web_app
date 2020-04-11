import React from "react";
import { useAuth0 } from "../../shared/Auth";

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth0();

    if (!isAuthenticated) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </div>
    );
};

export default NavBar;
