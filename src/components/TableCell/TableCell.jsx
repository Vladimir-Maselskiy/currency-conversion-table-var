import React, { useEffect, useState } from 'react';
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

export const TableCell = ({ data, form, name }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [displeydData, setDispleydData] = useState(data);

  useEffect(() => {
    setDispleydData(data);
  }, [data]);

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
        setDispleydData(resp[name].toFixed(2));
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
          <StyledRate>{displeydData}</StyledRate>
        </Popover>
      ) : (
        <Popover
          trigger="focus"
          content={
            <Space>
              <Button
                shape="circle"
                // htmlType="submit"
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
                max: data * 1.1,
                min: data / 1.1,
              },
            ]}
            initialValue={displeydData}
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
