import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EditOppModal } from "../EditOppModal.jsx";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 80px - 80px); // 80px for Header and 80px for Footer
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  height: ${props => props.noOps < 10 ? `${props.noOps * 100}px` : "100%"};
  width: 100%;
  td {
    text-align: center;
  }
  tr {
    height: 100px;
    border-radius: 10px;
    &:not(:first-child) {
      border-top: 10px solid white;
    }
  }
`;

const StyledRow = styled.tr`
  background-color: grey;
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
  }, []);


    return (
      <Container>
        <StyledTable noOps={opportunities.length}>
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
          </tbody>
        </StyledTable>
        {selectedOpp && <EditOppModal opportunity={selectedOpp} setSelectedOpp={setSelectedOpp} />}
      </Container>
    )
}

export default Body;