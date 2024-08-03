
import { Trans } from "@lingui/macro";
import styled from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`;

const AppBody = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

function App() {
  return (
    <AppWrapper>
      <AppBody>
        <Trans>Hello</Trans>
      </AppBody>
    </AppWrapper>
  );
}

export default App;
