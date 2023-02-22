import { Empty, Layout } from 'antd';
import './App.css';
import { Box } from './components/Box/Box';
import { RateTable } from './components/RateTable/RateTable';
import {
  contentStyle,
  footerStyle,
  headerStyle,
} from './App.styled';
import { CurrencyConvertor } from './components/CurrencyConvertor/CurrencyConvertor';
import { initialMessage } from './const';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAllRates } from './utils/getAllRates';

import logo from './logo.svg';
import { useRatesContext } from './context/store';
const { Header, Footer, Content } = Layout;

function App() {
  const { setCurrentRate } = useRatesContext();

  const [rates, setRates] = useState(initialMessage);
  const [fetchCounter] = useState(
    localStorage.getItem('fetchCounter')
  );
  const [isServerError, setIsServerError] = useState(false);
  useEffect(() => {
    axios
      .get(
        'https://scrapper-fs-dev.onrender.com/api/rate/privat24'
      )
      .then(resp => {
        const res = resp.data.resp;

        setRates(getAllRates(res));
        setCurrentRate(getAllRates(res));
      });
    if (!fetchCounter)
      localStorage.setItem('fetchCounter', +fetchCounter);
    if (fetchCounter) {
      localStorage.setItem(
        'fetchCounter',
        +fetchCounter + 1
      );
    }
  }, [fetchCounter, setCurrentRate]);

  useEffect(() => {
    if (fetchCounter >= 4) {
      localStorage.setItem('fetchCounter', 0);
      setIsServerError(true);
    }
  }, [fetchCounter]);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      minWidth="565px"
    >
      <Header style={headerStyle}>
        <p>Cyrrensy Rates </p>
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          width={50}
        />
      </Header>
      <Content style={contentStyle}>
        {!isServerError ? (
          <>
            <RateTable ratesFromAPI24={rates} />

            <CurrencyConvertor rates={rates} />
          </>
        ) : (
          <Empty />
        )}
      </Content>

      <Footer style={footerStyle}>
        2020 all right reserved
      </Footer>
    </Box>
  );
}

export default App;
