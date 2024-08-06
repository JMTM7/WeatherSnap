import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { AutoColumn } from "components/Column";
import Landscape from "assets/images/Home/landscape.png";
import { ThemedText } from "theme";
import { Trans } from "@lingui/macro";

const PageWrapper = styled(AutoColumn)`
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};
`;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 1rem;
  margin-top: 8%;
`;

const fadeIn = keyframes`
  from {
    filter: blur(20px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: 1;
  }
`;

const Title = styled(ThemedText.Title)`
  text-align: center;
  transition: opacity 1s ease-out, filter 1s ease-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  filter: ${({ $isLoaded }) => ($isLoaded ? "blur(0)" : "blur(20px)")};
  animation: ${({ $isLoaded }) => ($isLoaded ? fadeIn : "none")} 1s ease-out;
`;


const StyledImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  transition: opacity 1s ease-out, filter 1s ease-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  filter: ${({ $isLoaded }) => ($isLoaded ? "blur(0)" : "blur(20px)")};
  animation: ${({ $isLoaded }) => ($isLoaded ? fadeIn : "none")} 1s ease-out;
`;

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Landscape;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <PageWrapper>
      <Wrapper>
        <StyledImage src={Landscape} alt="landscape" $isLoaded={isLoaded} />
        <Title $isLoaded={isLoaded} fontStyle="italic">
          <Trans>Your Window to Tomorrow's Weather</Trans>
        </Title>
      </Wrapper>
    </PageWrapper>
  );
}
