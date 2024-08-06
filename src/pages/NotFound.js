import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemedText } from 'theme';

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 15%;
`;

const HomeLink = styled(Link)`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.link1};;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <ThemedText.Title>404</ThemedText.Title>
      <ThemedText.Title>Page Not Found</ThemedText.Title>
      <HomeLink to="/">Go back to Home</HomeLink>
    </NotFoundWrapper>
  );
};

export default NotFound;
