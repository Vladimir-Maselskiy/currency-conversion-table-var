import React, { useEffect, useState } from 'react';
import {
  StyledTable,
  StyledTData,
  StyledTHead,
} from './RateTable.styled';

import axios from 'axios';
import { initialMessage } from '../../const';

import { TableCell } from '../TableCell/TableCell';
import { Form, message } from 'antd';

export const RateTable = () => {
  const [rates, setRates] = useState(initialMessage);
  const [displaydRates, setDisplaydRates] =
    useState(initialMessage);

  useEffect(() => {
    setDisplaydRates(rates);
  }, [rates]);

  const [form] = Form.useForm();

  const onFinish = value => {
    message.success('Submit success!');
  };

  const onFinishFailed = value => {
    message.error('Submit failed!');
    console.log('value', value);
  };

  useEffect(() => {
    axios
      .get(
        'https://scrapper-fs-dev.onrender.com/api/rate/privat24'
      )
      .then(resp => {
        const res = resp.data.resp;

        setRates({
          eur_buy: +parseFloat(res[0].buy).toFixed(2),
          eur_sale: +parseFloat(res[0].sale).toFixed(2),
          usd_buy: +parseFloat(res[1].buy).toFixed(2),
          usd_sale: +parseFloat(res[1].sale).toFixed(2),
        });
      });
  }, []);
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateTrigger="onSubmit"
      style={{ color: 'white' }}
    >
      <StyledTable>
        <thead>
          <tr>
            <StyledTHead>
              Currency/Current
              <br />
              Date
            </StyledTHead>
            <StyledTHead>Buy</StyledTHead>
            <StyledTHead>Sell</StyledTHead>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StyledTData>USD/UAH</StyledTData>
            <TableCell
              form={form}
              data={displaydRates.usd_buy}
              name="usd_buy"
            ></TableCell>
            <TableCell
              form={form}
              data={displaydRates.usd_sale}
              name="usd_sale"
            ></TableCell>
          </tr>
          <tr>
            <StyledTData>EUR/UAH</StyledTData>
            <TableCell
              form={form}
              data={displaydRates.eur_buy}
              name={'eur_buy'}
            ></TableCell>
            <TableCell
              form={form}
              data={displaydRates.eur_sale}
              name={'eur_sale'}
            ></TableCell>
          </tr>
          <tr>
            <StyledTData>BTC/USD</StyledTData>
            <TableCell
              form={form}
              data={11500}
              name={'btc_buy'}
            ></TableCell>
            <TableCell
              form={form}
              data={11700}
              name={'btc_sale'}
            ></TableCell>
          </tr>
        </tbody>
      </StyledTable>
    </Form>
  );
};
