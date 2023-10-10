import styled from '@emotion/styled';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fffff; /* Change to white */
`;

export const Logo = styled.div`
  img {
    height: 40px;
    width: auto;
  }
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    background-color: #ffffff; /* Change to white */
    z-index: 1;
  }

  a {
    color: #333;
    text-decoration: none;
    margin: 0 1rem;

    @media (max-width: 768px) {
      margin: 1rem 0;
    }
  }

  /* Add styles for the "About" link */
  a.about {
    font-weight: bold;
  }
`;

export const Hamburger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;
