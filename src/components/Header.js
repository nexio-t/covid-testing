import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';

const Header = ( ) => {

  return (
    <header>
      <Container type="content">
        <p>COVID-19 in the U.S.</p>
        <ul>
          <li>
            <Link to="/">Map</Link>
          </li>
          <li>
            <Link to="/page-2/">About</Link>
          </li>
          <li>
            <Link to="/data-summary/">Charts</Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
