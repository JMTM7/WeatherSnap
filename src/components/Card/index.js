import { Box } from "rebass/styled-components";
import styled from "styled-components";

const Card = styled(Box)`
  width: ${({ width }) => width || "100%"};
  padding: ${({ padding }) => padding || "1rem"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "16px"};
  border: ${({ border }) => border};
`;

export default Card;

export const DarkCard = styled(Card)`
  background-color: ${({ theme }) => theme.bgCard0};
`;

export const LightCard = styled(Card)`
  background-color: ${({ theme }) => theme.bgCard1};
`;
