import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { AutoColumn } from "components/Column";
import { DarkCard, LightCard } from "components/Card";
import { ThemedText } from "theme";
import { Trans } from "@lingui/macro";
import { RowBetween, RowCenter, RowFlex } from "components/Row";
import useWeatherData from "hooks/useWeatherData";
import LoadingImage from "assets/images/Weather/loading.png";
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 5rem;
  `};
`;

const spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const Spinner = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: ${spin} 3s linear infinite;
  position: absolute;
  top: 48%;
  left: 48%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.mediaWidth.upToSmall`
    top: 50%;
    left: 40%;
  `};
`;

const CardBackground = styled(DarkCard)`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgCard0};
  background-image: ${({ $bg }) => $bg ? `url(${$bg})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
`;

const TemperatureContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end; 
  margin-top: auto;
  padding: 1rem; 
`;

const NotFoundData = styled(ThemedText.Title)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledLightCard = styled(LightCard)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: none;
  padding: 0;
`;

const DataContainer = styled(AutoColumn)`
  max-width: 400px;
  margin: auto;
  gap: 0.5rem;
  padding: 1rem;
`;

const Divider = styled.div`
  flex: 1;
  height: 3px;
  background-color: ${({ theme }) => theme.border1};
`;

const ForecastButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  position: absolute;
  left: 50%;
  bottom: -2%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  background: #fff;
  border: 2px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
`;

export default function WeatherCard({ city }) {
    const { weatherData, forecastData, loading, error } = useWeatherData(city);
    const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
    const [openForecast, setOpenForecast] = useState(false);
    const date = new Date();
    const bgCard = weatherData?.name
        ? `${process.env.PUBLIC_URL}/images/cities/${weatherData.name}.jpg`
        : null;

    if (loading) {
        return (
            <AutoColumn>
                <Spinner src={LoadingImage} alt="loading" />
            </AutoColumn>
        );
    }

    if (error || !weatherData || !forecastData) {
        return (
            <AutoColumn>
                <NotFoundData>
                    <Trans>No data available</Trans>
                </NotFoundData>
            </AutoColumn>
        );
    }

    // Función para avanzar al siguiente bloque
    const nextBlock = () => {
        if (currentBlockIndex < forecastData.length - 1) {
            setCurrentBlockIndex(currentBlockIndex + 1);
        }
    };

    // Función para retroceder al bloque anterior
    const prevBlock = () => {
        if (currentBlockIndex > 0) {
            setCurrentBlockIndex(currentBlockIndex - 1);
        }
    };

    return (
        <Wrapper>
            <CardBackground $bg={bgCard} >
                <RowBetween>
                    <RowFlex style={{ gap: '1rem' }}>
                        <ThemedText.ExtraLargeHeader>{weatherData.name}</ThemedText.ExtraLargeHeader>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/flags/${weatherData.sys.country}.svg`}
                            alt={weatherData.sys.country}
                            width="24px"
                        />
                    </RowFlex>
                    <ThemedText.MediumHeader>{date.toLocaleDateString()}</ThemedText.MediumHeader>
                </RowBetween>
                <TemperatureContainer>
                    <AutoColumn>
                        <ThemedText.ExtraLargeHeader>{weatherData.main.temp}°C</ThemedText.ExtraLargeHeader>
                        <RowBetween>
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                alt={weatherData.weather[0].description}
                            />
                            <ThemedText.Body>{weatherData.weather[0].description}</ThemedText.Body>
                        </RowBetween>
                    </AutoColumn>
                </TemperatureContainer>
            </CardBackground>
            <StyledLightCard>
                <DataContainer>
                    <RowBetween>
                        <ThemedText.Body>
                            <Trans>Minimum temperature</Trans>
                        </ThemedText.Body>
                        <ThemedText.Body>{weatherData.main.temp_min}°C</ThemedText.Body>
                    </RowBetween>
                    <RowBetween>
                        <ThemedText.Body>
                            <Trans>Maximum temperature</Trans>
                        </ThemedText.Body>
                        <ThemedText.Body>{weatherData.main.temp_max}°C</ThemedText.Body>
                    </RowBetween>
                    <RowBetween>
                        <ThemedText.Body>
                            <Trans>Feels like</Trans>
                        </ThemedText.Body>
                        <ThemedText.Body>{weatherData.main.feels_like}°C</ThemedText.Body>
                    </RowBetween>
                    <RowBetween>
                        <ThemedText.Body>
                            <Trans>Humidity</Trans>
                        </ThemedText.Body>
                        <ThemedText.Body>{weatherData.main.humidity}%</ThemedText.Body>
                    </RowBetween>
                    <RowBetween>
                        <ThemedText.Body>
                            <Trans>Wind speed</Trans>
                        </ThemedText.Body>
                        <ThemedText.Body>{weatherData.wind.speed}m/s</ThemedText.Body>
                    </RowBetween>
                </DataContainer>
                <ForecastButtonContainer>
                    <Button onClick={() => setOpenForecast(!openForecast)}>
                        <FontAwesomeIcon icon={openForecast ? faMinusCircle : faPlusCircle} color="#000080" fontSize={36} />
                    </Button>
                </ForecastButtonContainer>
                {openForecast && (
                    <>
                        <Divider />
                        <AutoColumn style={{ paddingBottom: '1rem' }}>
                            <ThemedText.LargeHeader textAlign="center" my="1rem">
                                <Trans>Forecast 3h</Trans>
                            </ThemedText.LargeHeader>
                            {forecastData.length > 0 && (
                                <RowFlex style={{ width: '345px', margin: 'auto' }}>
                                    <Button onClick={prevBlock} disabled={currentBlockIndex === 0}>
                                        <FontAwesomeIcon icon={faChevronCircleLeft} color={currentBlockIndex === 0 ? "#6d6d6d" : "#3b83bd"} fontSize={36} />
                                    </Button>
                                    <AutoColumn style={{ width: "100%" }}>
                                        {forecastData[currentBlockIndex].map((forecast, idx) => (
                                            <div key={idx}>
                                                <ThemedText.LargeHeader textAlign="center" mb="1rem">
                                                    {forecast.main.temp}°C
                                                </ThemedText.LargeHeader>
                                                <ThemedText.Body textAlign="center">
                                                    {format(forecast.dt, 'dd/MM/yyyy')} {format(forecast.dt, 'HH')}h
                                                </ThemedText.Body>
                                                <RowCenter style={{ gap: '0.2rem' }}>
                                                    <img
                                                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                                        alt={forecast.weather[0].description}
                                                    />
                                                    <ThemedText.Body>{forecast.weather[0].description}</ThemedText.Body>
                                                </RowCenter>
                                            </div>
                                        ))}
                                    </AutoColumn>
                                    <Button onClick={nextBlock} disabled={currentBlockIndex === forecastData.length - 1}>
                                        <FontAwesomeIcon icon={faChevronCircleRight} color={currentBlockIndex === forecastData.length - 1 ? "#6d6d6d" : "#3b83bd"} fontSize={36} />
                                    </Button>
                                </RowFlex>
                            )}
                        </AutoColumn>
                    </>
                )}
            </StyledLightCard>
        </Wrapper>
    );
}
