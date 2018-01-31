import * as React from 'react';
import styled from 'styled-components';

const ContactOuter = styled.div`
`;
const ContactHeader = styled.h1`
  text-align: center;
  font-weight: 100;
  letter-spacing: 3px;
`;
const ContactInner = styled.div`
  margin-top: 10px;
  max-width: 576px;
  margin: 0 auto;
  text-align: center;
`;
const ContactLine = styled.div`
`;
const HipsterLine = styled.div`
  margin-top: 20px;
`;

const Contact = () => (
  <ContactOuter className="Contact">
    <ContactHeader>CONTACT</ContactHeader>
    <ContactInner>
      <ContactLine>Jared Johnson</ContactLine>
      <ContactLine>(443) 694 - 0371</ContactLine>
      <ContactLine>stringsynced@gmail.com</ContactLine>
      <ContactLine>
        <a href="http://instagram.com/stringsynced">@stringsynced</a>
      </ContactLine>
      <ContactLine>
        <a href="http://instagram.com/jaredplaysguitar">@jaredplaysguitar</a>
      </ContactLine>
      <HipsterLine>
        <small><em>text me, yo</em></small>
      </HipsterLine>
    </ContactInner>
  </ContactOuter>
);

export default Contact;
