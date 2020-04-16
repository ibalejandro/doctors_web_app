import React from "react";
import {useAuth0} from "../../shared/Auth";
import {NavDropdown, Navbar, Container} from "react-bootstrap";
import styled from "styled-components";
import {FiChevronDown} from "react-icons/all";

const UserImageContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserImage = styled.img`
  object-fit: contain;
  width: 30px;
  border-radius: 50%;
`

const DropDownIcon = styled.div`
  color: black;
  font-weight: bold;
  display: inline-block;
  & span {
    margin-right: 5px;
  }
`

const DropDownButton = styled.div`
    & a::after {
      display: none;
    }
`

const NavBar = () => {
    const {isAuthenticated, logout, user} = useAuth0();

    if (!isAuthenticated) {
        return <div>Cargando...</div>
    }

    const userImage = user && user.picture


    return (
        <Navbar className="pt-5">
            <Container className="justify-content-end">
                <UserImageContainer>
                    <UserImage src={userImage} alt={user.nickname}/>
                </UserImageContainer>
                <DropDownButton>
                    <NavDropdown title={<DropDownIcon><span>{user.nickname}</span><FiChevronDown/></DropDownIcon>}
                                 id="nav-dropdown"
                                 alignRight>
                        {
                            isAuthenticated && (
                                <NavDropdown.Item onClick={() => logout({})}>Log out</NavDropdown.Item>
                            )
                        }
                    </NavDropdown>
                </DropDownButton>
            </Container>
        </Navbar>
    );
};

export default NavBar;
