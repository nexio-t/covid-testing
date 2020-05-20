import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p className="footer">&copy; { new Date().getFullYear() } U.S. Covid-19 Testing | Tomas Gear</p>
      </Container>
    </footer>
  );
};

export default Footer;
