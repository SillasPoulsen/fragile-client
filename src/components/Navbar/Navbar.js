import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import styled, { createGlobalStyle } from "styled-components";
import { Feather, Target } from "react-feather";
import { Link } from "react-router-dom";

function TheNavBar() {
  const [windowDimension, setWindowDimension] = useState(null);
  const { logOutUser } = useContext(AuthContext);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  return (
    <Styles.Wrapper>
      <CSSReset />

      {isMobile ? (
        <MobileNavbar.Wrapper>
          <MobileNavbar.Items>
            <Link to="/">
              <MobileNavbar.Item>
                <MobileNavbar.Icon>
                  <Target size={16} />
                </MobileNavbar.Icon>
                Journeys
              </MobileNavbar.Item>
            </Link>
            {/* <MobileNavbar.Item> */}
            {/* <MobileNavbar.Icon> */}
            {/* <Bookmark size={16} /> */}
            {/* </MobileNavbar.Icon> */}
            {/* Blog */}
            {/* </MobileNavbar.Item> */}
            <Link to="/profile">
              <MobileNavbar.Item>
                <MobileNavbar.Icon>
                  <Feather size={16} />
                </MobileNavbar.Icon>
                Notes
              </MobileNavbar.Item>
            </Link>
          </MobileNavbar.Items>
        </MobileNavbar.Wrapper>
      ) : (
        <Navbar.Wrapper>
          <Link to="/">
            <Navbar.Logo>Flaws</Navbar.Logo>
          </Link>
          <Navbar.Items>
            <Navbar.Item onClick={logOutUser}>Logout</Navbar.Item>
            <Link to="/login">
              <Navbar.Item>Login</Navbar.Item>
            </Link>
          </Navbar.Items>
        </Navbar.Wrapper>
      )}
    </Styles.Wrapper>
  );
}

const Styles = {
  Wrapper: styled.main`
    display: flex;
    background-color: #eeeeee;
  `,
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
  `,
  Logo: styled.h1`
    padding: 0.5rem 1rem;
    font-family: Tomorrow;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #016a49;
    letter-spacing: 0.2em;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;
  `,
};

const MobileNavbar = {
  Wrapper: styled(Navbar.Wrapper)`
    position: fixed;
    width: 100vw;
    bottom: 0;

    justify-content: center;
  `,
  Items: styled(Navbar.Items)`
    flex: 1;
    padding: 0 2rem;

    justify-content: space-around;
  `,
  Item: styled(Navbar.Item)`
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1.2rem;
  `,
  Icon: styled.span``,
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;

export default TheNavBar;
