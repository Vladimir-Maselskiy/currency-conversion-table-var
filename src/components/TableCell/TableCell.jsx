import React, { useState } from 'react';
import {
  Button,
  Form,
  InputNumber,
  Popover,
  Space,
} from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import {
  StyledRate,
  StyledTData,
} from './TableCell.styled';
import { useRatesContext } from '../../context/store';

export const TableCell = ({
  ratesFromAPI24,
  form,
  name,
}) => {
  const { currentRate, setCurrentRate } = useRatesContext();
  const [isEditable, setIsEditable] = useState(false);

  const onClickEdit = () => {
    setIsEditable(true);
  };
  const onClickClose = () => {
    setIsEditable(false);
  };
  const onClickSubmit = () => {
    form
      .validateFields([name])
      .then(resp => {
        setIsEditable(false);
        setCurrentRate(prev => ({
          ...prev,
          [name]: resp[name],
        }));
        form.submit();
      })
      .catch(error => {});
  };
  return (
    <StyledTData>
      {!isEditable ? (
        <Popover
          trigger="hover"
          content={
            <Button
              shape="circle"
              icon={<EditOutlined />}
              style={{ padding: 0 }}
              onClick={onClickEdit}
            />
          }
        >
          <StyledRate>{currentRate[name]}</StyledRate>
        </Popover>
      ) : (
        <Popover
          trigger="focus"
          content={
            <Space>
              <Button
                shape="circle"
                onClick={onClickSubmit}
                icon={
                  <CheckOutlined
                    style={{ color: 'green' }}
                  />
                }
              />
              <Button
                shape="circle"
                icon={
                  <CloseOutlined style={{ color: 'red' }} />
                }
                onClick={onClickClose}
              />
            </Space>
          }
        >
          <Form.Item
            name={name}
            style={{ margin: 0, padding: 10 }}
            rules={[
              { required: true },
              {
                type: 'number',
                max: ratesFromAPI24[name] * 1.1,
                min: ratesFromAPI24[name] / 1.1,
              },
            ]}
            initialValue={currentRate[name]}
          >
            <InputNumber
              style={{ width: 100 }}
              step={0.05}
            />
          </Form.Item>
          <></>
        </Popover>
      )}
    </StyledTData>
  );
};
