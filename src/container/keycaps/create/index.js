/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Select, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle, BasicFormWrapper } from '../../styled';
import { createKeycap } from '../../../redux/keycap/actionCreator';
import { converObjectToDropdownOptions } from '../../../utility/utility';
import { KeycapProfiles, KeycapSizes } from '../../../utility/constants';
import usePrevious from '../../../utility/usePrevious';
import routePaths from '../../../routes/routePaths';

const { Option } = Select;

function CreateKeycap() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isCreatingKeycap, isCreatingKeycapFail } = useSelector((state) => state.keycapStore);
  const formValues = {
    photos: [],
    name: '',
    details: [
      {
        profile: '',
        size: '',
        file: null,
      },
    ],
  };

  const previousIsCreatingKeycap = usePrevious(isCreatingKeycap);

  const profileOptions = converObjectToDropdownOptions(KeycapProfiles);

  const sizeOptions = converObjectToDropdownOptions(KeycapSizes);

  useEffect(() => {
    if (previousIsCreatingKeycap && !isCreatingKeycap && !isCreatingKeycapFail) {
      navigate(routePaths.keycap.list);
    }
  }, [isCreatingKeycap]);

  const onFinish = (values) => {
    dispatch(createKeycap(values));
  };

  const photosOnChange = (data) => {
    form.setFieldsValue({
      photos: data.fileList.map((file) => file.originFileObj),
    });
  };

  const detailFileOnChange = (index, data) => {
    const fieldsValue = form.getFieldsValue();
    const { details } = fieldsValue;

    if (data.fileList.length > 0) {
      details[index].file = data.fileList[0].originFileObj;
    } else {
      details[index].files = null;
    }
  };

  return (
    <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
      <GlobalUtilityStyle>
        <Row gutter={15}>
          <Col xs={24} className="mt-[25px]">
            <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
              <div className="flex justify-between py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                <Heading as="h4" className="text-lg font-medium mb-0">
                  Create Keycap
                </Heading>
              </div>
              <div className="p-[25px]">
                <BasicFormWrapper>
                  <Form
                    form={form}
                    name="createProject"
                    initialValues={formValues}
                    validateTrigger={['onChange', 'onBlur']}
                    onFinish={onFinish}
                    layout="vertical"
                  >
                    {() => {
                      return (
                        <>
                          <Form.Item
                            name="photos"
                            label="Photos"
                            rules={[{ required: true, message: 'Please upload an image' }]}
                          >
                            <Upload
                              name="photos"
                              listType="picture-card"
                              className="avatar-uploader"
                              multiple
                              beforeUpload={() => false}
                              onChange={photosOnChange}
                            >
                              <div className="ant-upload-text">Upload</div>
                            </Upload>
                          </Form.Item>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input a value' }]}
                          >
                            <Input placeholder="Name" maxLength={1000} />
                          </Form.Item>
                          <Form.Item label="Detail" rules={[{ required: true }]}>
                            <Form.List name="details">
                              {(details, { add, remove }) => {
                                return (
                                  <div>
                                    {details.map((_, index) => (
                                      <React.Fragment key={`detail-${index}`}>
                                        <Row gutter={30}>
                                          <Col md={7} xs={24} className="mb-25">
                                            <Form.Item
                                              name={[index, 'profile']}
                                              rules={[{ required: true, message: 'Please select profile' }]}
                                            >
                                              <Select size="large" className="ninjadash-fullwidth-select">
                                                {profileOptions.map((option) => (
                                                  <Option value={option.value} key={option.value}>
                                                    {option.display}
                                                  </Option>
                                                ))}
                                              </Select>
                                            </Form.Item>
                                            {details.profile}
                                            {/* {form.isFieldTouched(`details[${index}].profile`) === true ? 'yes' : 'no'} */}
                                          </Col>
                                          <Col md={7} xs={24} className="mb-25">
                                            <Form.Item
                                              name={[index, 'size']}
                                              rules={[{ required: true, message: 'Please select size' }]}
                                            >
                                              <Select size="large" className="ninjadash-fullwidth-select">
                                                {sizeOptions.map((option) => (
                                                  <Option value={option.value} key={option.value}>
                                                    {option.display}
                                                  </Option>
                                                ))}
                                              </Select>
                                            </Form.Item>
                                          </Col>
                                          <Col md={6} xs={24} className="mb-25">
                                            <Form.Item name={[index, 'file']}>
                                              <Upload
                                                beforeUpload={() => false}
                                                onChange={(data) => detailFileOnChange(index, data)}
                                              >
                                                <Button className="btn-outlined" size="large" type="light" outlined>
                                                  <UploadOutlined /> Upload
                                                </Button>
                                              </Upload>
                                            </Form.Item>
                                          </Col>
                                          {details.length > 1 && (
                                            <Col md={4} xs={24} className="mb-25">
                                              <Button
                                                size="large"
                                                outlined
                                                type="danger"
                                                onClick={() => remove()}
                                                block
                                              >
                                                Remove
                                              </Button>
                                            </Col>
                                          )}
                                        </Row>
                                      </React.Fragment>
                                    ))}
                                    <Button outlined type="dashed" size="large" onClick={() => add()} block>
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
                                <Button
                                  className="btn-signin"
                                  htmlType="submit"
                                  type="primary"
                                  size="large"
                                  disabled={isCreatingKeycap}
                                >
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

export default CreateKeycap;
