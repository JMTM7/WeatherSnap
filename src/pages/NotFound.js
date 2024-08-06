import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemedText } from 'theme';
import { Trans } from '@lingui/macro';

const NotFoundWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.link1};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <ThemedText.Title textAlign="center">404</ThemedText.Title>
      <ThemedText.Title>
        <Trans>Page Not Found</Trans>
      </ThemedText.Title>
      <HomeLink to="/">
        <Trans>Go back to Home</Trans>
      </HomeLink>
    </NotFoundWrapper>
  );
};

export default NotFound;
