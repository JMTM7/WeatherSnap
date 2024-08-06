import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "pages/Home";
import Weather from "pages/Weather";
import Form from "pages/Form";
import NotFound from "pages/NotFound";

const AppWrapper = styled.div`
  width: 100%;
`;

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppWrapper>
      <Header />
      <AppBody>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/weather/:city" element={<Weather />} />
          <Route path="/contact" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppBody>
    </AppWrapper>
  );
}

export default App;
