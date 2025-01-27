import React from "react";
import Header from "./common/Header.jsx";
import Body from "./common/Body.jsx";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 100px;
`

const App = () => {
  return (
    <Container>
      <Header />
      <Body />
    </Container>
  );
}

export default App;