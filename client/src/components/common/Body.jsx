import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddEditOppModal } from "../AddEditOppModal.jsx";

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
  &:nth-child(odd) {
    background: lightgrey;
  }
  &:last-child {
    background: white;
  }
`;

const StyledRow = styled.tr`
  > td {
    border: 1px solid black;
  }
`;

const StyledAddButton = styled.button`
  width: 100%;
  height: 75%;
`;

const CollapsibleSection = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  padding: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const Body = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [openRow, setOpenRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const opportunities = await fetch(`http://localhost:${window.location.port}/api/opportunities`);
        const response = await opportunities.json();
        console.log(response);
        setOpportunities(response);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, [selectedOpp]);

  const toggleRow = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <Container>
      <StyledTable opps={opportunities.length}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Customer Name</th>
            <th>Opportunity Type</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp, index) => (
            <React.Fragment key={opp._id}>
              <StyledRow onClick={() => toggleRow(index)}>
                <td>{opp.title}</td>
                <td>{opp.description}</td>
                <td>{opp.status}</td>
                <td>{opp.customerName}</td>
                <td>{opp.opportunityType}</td>
                <td onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOpp(opp)
                  }}>Edit</td>
              </StyledRow>
              <tr style={{ display: openRow === index ? 'table-row' : 'none' }}>
                <td colSpan="7">
                  <CollapsibleSection isOpen={openRow === index}>
                    <p><strong>Created At:</strong> {opp.createdAt || 'N/A'}</p>
                    <p><strong>Updated At:</strong> {opp.updatedAt || 'N/A'}</p>
                    <p><strong>Start Date:</strong> {opp.startDate || 'N/A'}</p>
                  </CollapsibleSection>
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={7}>
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