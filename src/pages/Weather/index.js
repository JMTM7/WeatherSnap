import React from "react";
import styled from "styled-components";
import { AutoColumn } from "components/Column";
import WeatherCard from "./components/WeatherCard";
import { useParams } from "react-router-dom";
import { useActiveLocale } from "hooks/useActiveLocale";

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
  const currentLang = useActiveLocale();
  return (
    <PageWrapper>
      <WeatherCard city={city} lang={currentLang.split('-')[1]} />
    </PageWrapper >
  );
}
