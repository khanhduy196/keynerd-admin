import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle, BasicFormWrapper } from '../../styled';
import { getKeycapList } from '../../../redux/keycap/actionCreator';
import { createOrder } from '../../../redux/order/actionCreator';

const { TextArea } = Input;
const { Option } = Select;

function CreateOrder() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { paginatedList: paginatedKeycapList } = useSelector((state) => state.keycapStore);

  useEffect(() => {
    dispatch(getKeycapList(100000));
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(createOrder(values));
  };

  const getDetailsOfKeycap = (index, keycapId) => {
    let details = [];
    if (paginatedKeycapList.items.filter((item) => item.id === keycapId).length > 0) {
      details = paginatedKeycapList.items.filter((item) => item.id === keycapId)[0].details;

      // if (details.length === 1) {
      //   const formValues = form.getFieldsValue();
      //   formValues.details[index].keycapDetailId = details[0].keycapDetailId;
      //   form.setFieldsValue({ ...formValues });
      // }
    }
    return details;
  };

  const addDetail = () => {
    const newDetail = {
      keycapId: null,
      keycapDetailId: null,
      quantity: 1,
    };
    const formValues = form.getFieldsValue();
    formValues.details.push(newDetail);
    form.setFieldsValue({ ...formValues });
  };

  return (
    <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
      <GlobalUtilityStyle>
        <Row gutter={15}>
          <Col xs={24} className="mt-[25px]">
            <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
              <div className="flex justify-between py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                <Heading as="h4" className="text-lg font-medium mb-0">
                  Create Order
                </Heading>
              </div>
              <div className="p-[25px]">
                <BasicFormWrapper>
                  <Form
                    form={form}
                    name="createProject"
                    initialValues={{
                      note: '',
                      details: [
                        {
                          keycapId: null,
                          keycapDetailId: null,
                          quantity: 1,
                        },
                      ],
                    }}
                    validateTrigger={['onChange', 'onBlur']}
                    onFinish={onFinish}
                    layout="vertical"
                  >
                    {(formValues) => {
                      return (
                        <>
                          <Form.Item name="note" label="Note">
                            <TextArea rows={4} maxLength={1000} />
                          </Form.Item>
                          <Form.Item label="Detail" rules={[{ required: true }]}>
                            <Form.List name="details">
                              {(details) => {
                                return (
                                  <div>
                                    {details.map((_, index) => (
                                      <React.Fragment key={`detail-${index}`}>
                                        <Row gutter={30}>
                                          <Col md={7} xs={24} className="mb-25">
                                            <Form.Item
                                              label="Keycap"
                                              name={[index, 'keycapId']}
                                              rules={[{ required: true, message: 'Please select a keycap' }]}
                                            >
                                              <Select size="large" className="ninjadash-fullwidth-select">
                                                {!!paginatedKeycapList &&
                                                  paginatedKeycapList.items.map((option) => (
                                                    <Option value={option.id} key={option.id}>
                                                      {option.name}
                                                    </Option>
                                                  ))}
                                              </Select>
                                            </Form.Item>
                                          </Col>
                                          <Col md={7} xs={24} className="mb-25">
                                            <Form.Item
                                              label="Profile and Size"
                                              name={[index, 'keycapDetailId']}
                                              rules={[{ required: true, message: 'Please select profile and size' }]}
                                            >
                                              <Select size="large" className="ninjadash-fullwidth-select">
                                                {!!formValues.details[index].keycapId &&
                                                  getDetailsOfKeycap(index, formValues.details[index].keycapId).map(
                                                    (option) => (
                                                      <Option value={option.id} key={option.id}>
                                                        {`${option.profile} ${option.size}U`}
                                                      </Option>
                                                    ),
                                                  )}
                                              </Select>
                                            </Form.Item>
                                          </Col>
                                          <Col md={6} xs={24} className="mb-25">
                                            <Form.Item
                                              label="Quantity"
                                              name={[index, 'quantity']}
                                              rules={[{ required: true, message: 'Please input quantity' }]}
                                            >
                                              <Input name="quantity" />
                                            </Form.Item>
                                          </Col>
                                          {details.length > 1 && (
                                            <Col md={4} xs={24} className="mb-25">
                                              <Button size="large" outlined type="danger" block>
                                                Remove
                                              </Button>
                                            </Col>
                                          )}
                                        </Row>
                                      </React.Fragment>
                                    ))}
                                    <Button outlined type="dashed" size="large" onClick={() => addDetail()} block>
                                      Add Detail
                                    </Button>
                                  </div>
                                );
                              }}
                            </Form.List>
                          </Form.Item>
                          <Row>
                            <Col>
                              <div className="ninjadash-form-action">
                                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                                  Save
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </>
                      );
                    }}
                  </Form>
                </BasicFormWrapper>
              </div>
            </div>
          </Col>
        </Row>
      </GlobalUtilityStyle>
    </div>
  );
}

export default CreateOrder;
