import React from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  width: 300px;
  height: 170px;
  position: absolute;
  background-color: grey;
  z-index: 4;
  border: 1px solid black;
  margin-top: ${props => props.below ? "29px" : "-189px"};
  margin-left: 158px;
`;

export const Calendar = ({ onChange, position="below" }) => {
  return (
    <Container position={position}>
      <ReactCalendar onChange={onChange} />
    </Container>
  );
}