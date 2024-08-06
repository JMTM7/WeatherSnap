import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Row = styled(Box)`
  width: ${({ width }) => width || '100%'};
  display: flex;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
`;

export const RowCenter = styled(Row)`
  justify-content: center;
`;

export const RowLeft = styled(Row)`
  justify-content: left;
`;

export const RowRight = styled(Row)`
  justify-content: right;
`;

export const RowAround = styled(Row)`
  justify-content: space-around;
`;

export const AutoRow = styled(Row)`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify || 'flex-start'};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`;

export const RowFixed = styled(Row)`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`;

export const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Row;
