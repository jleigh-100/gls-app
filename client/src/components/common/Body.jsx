import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddEditOppModal } from "../AddEditOppModal.jsx";
import { formatDate } from "../utils/index.jsx";
import { useWindowDimensions } from "../../hooks/index.js";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 180px);
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  height: ${props => props.opps < 10 ? `${props.opps * 100}px` : "100%"};
  width: 100%;
  th {
    width: 100px;
  }
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
  const { width } = useWindowDimensions();

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

  useEffect(() => {
    if (selectedOpp) { // modal is open, remove scroll
      document.body.classList.add("overflow-y-hidden")
    } else {
      document.body.classList.remove("overflow-y-hidden")
    }
  }, [selectedOpp]);


  return (
    <Container>
      <StyledTable opps={opportunities.length}>
        <thead>
          <tr>
            <th>Title</th>
            {width > 769 && <th>Description</th>}
            <th>Status</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp, index) => (
            <React.Fragment key={opp._id}>
              <StyledRow onClick={() => toggleRow(index)}>
                <td>{opp.title}</td>
                {width > 769 && <td>{opp.description}</td>}
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
                    {width > 769 && <p><strong>Description:</strong>{opp.description}</p>}
                    <p><strong>Created At:</strong> {formatDate(opp.createdAt) || 'N/A'}</p>
                    <p><strong>Updated At:</strong> {formatDate(opp.updatedAt) || 'N/A'}</p>
                    <p><strong>Start Date:</strong> {formatDate(opp.startDate) || 'N/A'}</p>
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