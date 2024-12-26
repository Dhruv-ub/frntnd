// import React from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// const HeaderContainer = styled.div`
//   background: linear-gradient(45deg, #ff9a9e, #fad0c4);
//   padding: 15px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const NavLink = styled(Link)`
//   color: white;
//   text-decoration: none;
//   font-size: 18px;
//   margin: 0 15px;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// function Header() {
//   return (
//     <HeaderContainer>
//       <h1 style={{ color: 'white' }}>API Configurator</h1>
//       <div>
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/api-details/1">API Details</NavLink>
//       </div>
//     </HeaderContainer>
//   );
// }

// export default Header;


import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin: 0 15px;

  &:hover {
    text-decoration: underline;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <h1 style={{ color: 'white' }}>API Configurator</h1>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/api-details/1">API Details</NavLink>
        <NavLink to="/api-flow">API Flow</NavLink> {/* Added API Flow link */}
      </div>
    </HeaderContainer>
  );
}

export default Header;
