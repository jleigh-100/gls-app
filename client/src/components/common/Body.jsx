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
    &:not(:nth-child(n-1)) 
      border: 1px solid black;
    }
    text-align: center;
  }
  tr {
    height: 100px;
    background: white;
    &:not(:first-child) {
      border-top: 1px solid black;
    }
    &:nth-child(odd) {
      background: lightgrey;
    }
    &:last-child {
      background: white;
    }
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
  cursor: pointer;
`;

const CollapsibleSection = styled.div`
  display: block;
  padding: 7.5px;
`;

const Body = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [openRow, setOpenRow] = useState(null);
  const [sort, setSort] = useState('desc');
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:${window.location.port}/api/opportunities?sort=${sort}`;
        const opportunities = await fetch(url);
        const response = await opportunities.json();
        console.log(response);
        setOpportunities(response);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, [selectedOpp, sort]);

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
            <th
              onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
              style={{ cursor: "pointer" }}>
              Created At ({sort})
            </th>
            <th>Options</th>
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
                <td>{formatDate(opp.createdAt)}</td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOpp(opp)
                  }}
                  style={{ cursor: "pointer" }}>
                  Edit
                </td>
              </StyledRow>
              {openRow === index && 
                <tr style={{ display: openRow === index ? 'table-row' : 'none' }}>
                  <td colSpan="7">
                    <CollapsibleSection >
                      {width < 769 && <p><strong>Description:</strong>{opp.description}</p>}
                      <p><strong>Updated At:</strong> {formatDate(opp.updatedAt) || 'N/A'}</p>
                      {opp.startDate && <p><strong>Start Date:</strong> {formatDate(opp.startDate) || 'N/A'}</p>}
                      {opp.endDate && <p><strong>End Date:</strong> {formatDate(opp.endDate) || 'N/A'}</p>}
                    </CollapsibleSection>
                  </td>
                </tr>
              }
            </React.Fragment>
          ))}
          <tr>
            <td></td>
            <td colSpan={width < 769 ? 4 : 5}>
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