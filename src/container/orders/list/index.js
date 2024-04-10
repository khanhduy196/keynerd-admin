/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Select } from 'antd';
import './style.scss';
import { CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import usePrevious from '../../../utility/usePrevious';
import Heading from '../../../components/heading/heading';
import DataTable from '../../../components/table/DataTable';
import routePaths from '../../../routes/routePaths';
import { GlobalUtilityStyle, PaginationStyle } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { getOrderList, updateOrderStatus } from '../../../redux/order/actionCreator';
import { OrderStatuses, DEFAULT_PAGE_SIZE } from '../../../utility/constants';
import { converObjectToDropdownOptions } from '../../../utility/utility';

function Orders() {
  const dispatch = useDispatch();
  const { paginatedList, isUpdatingOrderStatus } = useSelector((state) => state.orderStore);
  const [tableDataScource, setTableDataScource] = useState([]);
  const previousisUpdatingOrderStatus = usePrevious(isUpdatingOrderStatus);
  const orderStatusOptions = converObjectToDropdownOptions(OrderStatuses);

  useEffect(() => {
    if (dispatch) {
      dispatch(getOrderList(DEFAULT_PAGE_SIZE, 1, OrderStatuses.TO_DO));
    }
  }, [dispatch]);

  useEffect(() => {
    if (previousisUpdatingOrderStatus && !isUpdatingOrderStatus) {
      dispatch(getOrderList(DEFAULT_PAGE_SIZE, 1, OrderStatuses.TO_DO));
    }
  }, [isUpdatingOrderStatus, previousisUpdatingOrderStatus]);

  const onTableChange = (page, pageSize) => {
    dispatch(getOrderList(pageSize, page, OrderStatuses.TO_DO));
  };

  const modifyOrderStatus = (id, orderStatus) => {
    if (orderStatus === OrderStatuses.TO_DO) {
      dispatch(updateOrderStatus({ id, status: OrderStatuses.PRODUCT_COMPLETED }));
    } else if (orderStatus === OrderStatuses.PRODUCT_COMPLETED) {
      dispatch(updateOrderStatus({ id, status: OrderStatuses.DONE }));
    }
  };

  const filterOnChange = (value) => {
    dispatch(getOrderList(DEFAULT_PAGE_SIZE, 1, value));
  };

  useEffect(() => {
    if (paginatedList) {
      setTableDataScource(
        paginatedList.items.map((item) => {
          const { id, orderStatus, details } = item;
          return {
            rowKey: id,
            id: <span className="text-body dark:text-white60 text-[15px] font-medium">{`#${id}`}</span>,
            detail: (
              <span className="text-body dark:text-white60 text-[15px] font-medium">
                {details.map((detail) => (
                  <div key={detail.id} className="order-detail-item mb-5">
                    <img src={detail.photos[0]} alt="ninjadash Product" />
                    <div className="ml-5">
                      <Link to={`${routePaths.keycap.view.replace(':id', detail.keycapId)}`}>
                        <p>{detail.name}</p>
                      </Link>
                      <p>Quantity: {detail.quantity}</p>
                      <p>
                        Style: {detail.profile} {detail.size}U
                      </p>
                    </div>
                  </div>
                ))}
              </span>
            ),
            status: (
              <span className="inline-flex items-center justify-center bg-success-transparent text-success min-h-[24px] px-3 text-xs font-medium rounded-[15px]">
                {orderStatus}
              </span>
            ),
            action: (
              <div className="min-w-[150px] text-end -m-2">
                {orderStatus !== OrderStatuses.DONE && (
                  <Link className="inline-block m-2" to="#" onClick={() => modifyOrderStatus(id, orderStatus)}>
                    <CheckOutlined className="w-4 text-light-extra dark:text-white60" />
                  </Link>
                )}
              </div>
            ),
          };
        }),
      );
    }
  }, [paginatedList]);

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return (
    <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
      <GlobalUtilityStyle>
        <Row gutter={15}>
          <Col xs={24} className="mt-[25px]">
            <PaginationStyle>
              <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="flex justify-between  py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Orders
                  </Heading>
                  <Link to={`${routePaths.order.create}`}>
                    <Button
                      className="px-5 text-sm font-semibold rounded-md h-11"
                      size="default"
                      type="primary"
                      key="1"
                    >
                      Create Order
                    </Button>
                  </Link>
                </div>

                <div className="p-[25px]">
                  <div className="ninjadash-datatable-filter__left mb-5">
                    <div className="ninjadash-datatable-filter__input">
                      <span className="label mr-2">Status:</span>
                      <Select
                        style={{ width: 200 }}
                        className="ninjadash-data-status"
                        defaultValue={OrderStatuses.TO_DO}
                        onChange={filterOnChange}
                      >
                        {orderStatusOptions.map((option) => {
                          return (
                            <Select.Option key={option.value} value={option.value}>
                              {option.display}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  <DataTable
                    tableData={tableDataScource}
                    columns={dataTableColumn}
                    rowSelection={false}
                    pagination={{
                      total: paginatedList.totalItems,
                      pageSize: DEFAULT_PAGE_SIZE,
                      showSizeChanger: true,
                      onChange: onTableChange,
                    }}
                  />
                </div>
              </div>
            </PaginationStyle>
          </Col>
        </Row>
      </GlobalUtilityStyle>
    </div>
  );
}

export default Orders;
