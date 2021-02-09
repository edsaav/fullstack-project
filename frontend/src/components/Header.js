import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

// --- Styles --- //

const StyledHeader = styled.header`
  background-color: #f1f1f1;
  border: 1px solid #e5e5e5;
  color: #2c2c2c;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  justify-content: space-between;
  padding: 2rem;
`

const NavLinks= styled.ul`
  display: flex;
`

const NavLinkItem= styled.li`
  color: #2c2c2c;
  line-height: 1.2rem;
  padding-right: 2rem;
`

const NavButton= styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`

const NavRoute= styled(NavLink)`
  color: inherit;
  text-decoration: none;
`

const Logo= styled.h1`
  color: #29a693 !important;
  font-weight: bold;
`

// --- Component --- //

const Header = ({ login }) => {
  const [cookies,, removeCookie] = useCookies(['auth']);
  const history = useHistory();

  let account;
  const activeLinkStyle = { textDecoration: 'underline' };

  const logout = () => {
    removeCookie('auth');
    history.push('/');
    history.push();
  }

  if (cookies.auth) {
    account = (
      <NavLinkItem>
        <NavButton onClick={() => logout()}>Log Out</NavButton>
      </NavLinkItem>
    )
  } else {
    account = (
      <NavLinkItem>
        <NavButton onClick={login}>Log In</NavButton>
      </NavLinkItem>
    )
  }

  return (
    <StyledHeader>
      <Logo><NavRoute to='/'>GifyWell</NavRoute></Logo>
      <nav>
        <NavLinks>
          <NavLinkItem>
            <NavRoute to='/' exact activeStyle={activeLinkStyle}>
              Search
            </NavRoute>
          </NavLinkItem>
          {cookies.auth && <NavLinkItem>
            <NavRoute to='/favorites' exact activeStyle={activeLinkStyle}>
              Favorites
            </NavRoute>
          </NavLinkItem>}
          {account}
        </NavLinks>
      </nav>
    </StyledHeader>
  )
}

export default Header;
