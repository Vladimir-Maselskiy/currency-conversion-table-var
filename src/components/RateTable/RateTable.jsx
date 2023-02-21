import React, { useEffect, useState } from 'react';
import {
  StyledTable,
  StyledTData,
  StyledTHead,
} from './RateTable.styled';
import axios from 'axios';

export const RateTable = () => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    axios
      .get(
        'https://scrapper-fs-dev.onrender.com/api/rate/privat24'
      )
      .then(console.log);
  }, []);
  return (
    <StyledTable>
      <tr>
        <StyledTHead>Company</StyledTHead>
        <StyledTHead>Contact</StyledTHead>
        <StyledTHead>Country</StyledTHead>
      </tr>
      <tr>
        <StyledTData>Alfreds Futterkiste</StyledTData>
        <StyledTData>Maria Anders</StyledTData>
        <StyledTData>Germany</StyledTData>
      </tr>
      <tr>
        <StyledTData>
          Centro comercial Moctezuma
        </StyledTData>
        <StyledTData>Francisco Chang</StyledTData>
        <StyledTData>Mexico</StyledTData>
      </tr>
    </StyledTable>
  );
};
