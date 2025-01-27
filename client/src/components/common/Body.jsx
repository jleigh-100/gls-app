import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddEditOppModal } from "../EditOppModal.jsx";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 180px);
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  height: ${props => props.opps < 10 ? `${props.opps * 100}px` : "100%"};
  width: 100%;
  td {
    text-align: center;
  }
  tr {
    height: 100px;
    &:not(:first-child) {
      border-top: 1px solid black;
    }
  &:nth-child(even) {
    background-color: lightgrey;
  }
  &:last-child {
    background-color: white;
  }
`;

const StyledRow = styled.tr`
  background-color: grey;
  > td {
    border: 1px solid black;
  }
`;

const StyledAddButton = styled.button`
  width: 100%;
  height: 75%;
`;


const Body = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const opportunities = await fetch("http://localhost:3000/api/opportunities");
        const response = await opportunities.json();
        console.log(response);
        setOpportunities(response);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, [selectedOpp]);


    return (
      <Container>
        <StyledTable opps={opportunities.length}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Customer Name</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity, index) => (
              <StyledRow key={index}>
                <td>{opportunity.title}</td>
                <td>{opportunity.status}</td>
                <td>{opportunity.customerName}</td>
                <td>{opportunity.opportunityType}</td>
                <td>{opportunity.createdAt}</td>
                <td onClick={() => setSelectedOpp(opportunity)}>edit</td>
              </StyledRow>
            ))}
            <tr>
              <td colSpan={6}>
                <StyledAddButton onClick={() => setSelectedOpp(true)}>Add new</StyledAddButton>
              </td>
            </tr>
          </tbody>
        </StyledTable>
        {selectedOpp && <AddEditOppModal opportunity={selectedOpp} setSelectedOpp={setSelectedOpp} />}
      </Container>
    )
}

export default Body;