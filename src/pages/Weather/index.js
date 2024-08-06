import React from "react";
import styled from "styled-components";
import { AutoColumn } from "components/Column";
import WeatherCard from "./components/WeatherCard";
import { useParams } from "react-router-dom";

const PageWrapper = styled(AutoColumn)`
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};
`;


export default function Weather() {
  const { city } = useParams();
  return (
    <PageWrapper>
      <WeatherCard city={city} />
    </PageWrapper >
  );
}
