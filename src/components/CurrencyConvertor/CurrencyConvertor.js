import { SwapOutlined } from '@ant-design/icons';
import { Button, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { initialCurrents } from '../../const';
import { useRatesContext } from '../../context/store';
import { Box } from '../Box/Box';
import { StyledLabel } from './CurrencyConvertor.styled';

export const CurrencyConvertor = () => {
  const { currentRate } = useRatesContext();

  const [valueTo, setValueTo] = useState('');
  const [valueFrom, setValueFrom] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState(
    initialCurrents[0].value
  );
  const [currencyTo, setCurrencyTo] = useState(
    initialCurrents[2].value
  );

  const onChangeInput = e => {
    setValueFrom(e);
  };

  const onSelectFrom = value => {
    setCurrencyFrom(value);
  };
  const onSelectTo = value => {
    setCurrencyTo(value);
  };

  const onSwapButtonClick = () => {
    const transitCurrency = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(transitCurrency);
  };

  useEffect(() => {
    const nameFrom = currencyFrom + '_buy';
    const nameTo = currencyTo + '_sale';
    const rateTo = currentRate[nameTo];
    const rateFrom = currentRate[nameFrom];
    if (typeof rateTo === 'number') {
      setValueTo(
        +((valueFrom * rateFrom) / rateTo).toFixed(5)
      );
    }
  }, [currencyFrom, currencyTo, valueFrom, currentRate]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      margin="50px auto 0 auto"
      width="100%"
      maxWidth="600px"
    >
      <Box position="relative">
        <StyledLabel>Change</StyledLabel>
        <InputNumber
          style={{ width: '150px' }}
          min={0}
          value={valueFrom}
          onChange={onChangeInput}
        ></InputNumber>
      </Box>
      <Select
        options={initialCurrents}
        value={currencyFrom}
        onSelect={onSelectFrom}
        style={{ width: '80px' }}
      ></Select>
      <Button
        onClick={onSwapButtonClick}
        type="ghost"
        shape="circle"
        icon={
          <SwapOutlined
            style={{
              fontSize: '25px',
              color: 'white',
            }}
          />
        }
      ></Button>

      <Box position="relative">
        <StyledLabel>Get</StyledLabel>
        <InputNumber
          readOnly={true}
          style={{ width: '150px' }}
          placeholder={valueTo}
          value={valueTo}
        ></InputNumber>
      </Box>
      <Select
        options={initialCurrents}
        value={currencyTo}
        onSelect={onSelectTo}
        style={{ width: '80px' }}
      ></Select>
    </Box>
  );
};
