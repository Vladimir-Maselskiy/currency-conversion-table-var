import {
  StyledTable,
  StyledTData,
  StyledTHead,
} from './RateTable.styled';
import { TableCell } from '../TableCell/TableCell';
import { Form, message } from 'antd';

export const RateTable = ({ ratesFromAPI24 }) => {
  const [form] = Form.useForm();

  const onFinish = value => {
    message.success('Submit success!');
  };

  const onFinishFailed = value => {
    message.error('Submit failed!');
  };

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
              ratesFromAPI24={ratesFromAPI24}
              name="usd_buy"
            ></TableCell>
            <TableCell
              form={form}
              ratesFromAPI24={ratesFromAPI24}
              name="usd_sale"
            ></TableCell>
          </tr>
          <tr>
            <StyledTData>EUR/UAH</StyledTData>
            <TableCell
              form={form}
              ratesFromAPI24={ratesFromAPI24}
              name={'eur_buy'}
            ></TableCell>
            <TableCell
              form={form}
              ratesFromAPI24={ratesFromAPI24}
              name={'eur_sale'}
            ></TableCell>
          </tr>
          <tr>
            <StyledTData>BTC/USD</StyledTData>
            <TableCell
              form={form}
              ratesFromAPI24={ratesFromAPI24}
              name={'btc_buy'}
            ></TableCell>
            <TableCell
              form={form}
              ratesFromAPI24={ratesFromAPI24}
              name={'btc_sale'}
            ></TableCell>
          </tr>
        </tbody>
      </StyledTable>
    </Form>
  );
};
