/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Link } from 'react-router-dom';
import Heading from '../../../components/heading/heading';
import DataTable from '../../../components/table/DataTable';
import routePaths from '../../../routes/routePaths';
import { GlobalUtilityStyle, PaginationStyle } from '../../styled';
import { getKeycapList, deleteKeycap } from '../../../redux/keycap/actionCreator';
import { Button } from '../../../components/buttons/buttons';
import { DEFAULT_PAGE_SIZE } from '../../../utility/constants';

function Keycaps() {
  const dispatch = useDispatch();

  const [tableDataScource, setTableDataScource] = useState([]);
  const { paginatedList } = useSelector((state) => state.keycapStore);

  useEffect(() => {
    if (dispatch) {
      dispatch(getKeycapList(DEFAULT_PAGE_SIZE));
    }
  }, [dispatch]);

  const onTableChange = (page, pageSize) => {
    dispatch(getKeycapList(pageSize, page));
  };

  useEffect(() => {
    if (paginatedList.items.length > 0) {
      setTableDataScource([
        ...paginatedList.items.map((item) => {
          const { id, name } = item;
          return {
            id: (
              <span className="text-body dark:text-white60 text-[15px] font-medium" key={`item-${id}`}>{`#${id}`}</span>
            ),
            name: (
              <Link to={`${routePaths.keycap.view.replace(':id', id)}`}>
                <span className="text-body dark:text-white60 text-[15px] font-medium" key={`item-${id}`}>
                  {name}
                </span>
              </Link>
            ),
            action: (
              <div className="min-w-[150px] text-end -m-2" key={`item-${id}`}>
                <Link className="inline-block m-2" to={`${routePaths.keycap.view.replace(':id', id)}`}>
                  <UilEye className="w-4 text-light-extra dark:text-white60" />
                </Link>
                <Link to={`${routePaths.keycap.update.replace(':id', id)}`} className="inline-block m-2">
                  <UilEdit className="w-4 text-light-extra dark:text-white60" />
                </Link>
                <Link className="inline-block m-2" onClick={() => dispatch(deleteKeycap(id))}>
                  <UilTrash className="w-4 text-light-extra dark:text-white60" />
                </Link>
              </div>
            ),
          };
        }),
      ]);
    }
  }, [paginatedList]);

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  // function onChange(pagination, filters, sorter, extra) {
  //   setState({ ...state, values: { pagination, filters, sorter, extra } });
  // }

  return (
    <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
      <GlobalUtilityStyle>
        <Row gutter={15}>
          <Col xs={24} className="mt-[25px]">
            <PaginationStyle>
              <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="flex justify-between py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Keycap List
                  </Heading>
                  <Link to={`${routePaths.keycap.create}`}>
                    <Button
                      className="px-5 text-sm font-semibold rounded-md h-11"
                      size="default"
                      type="primary"
                      key="1"
                    >
                      Create Keycap
                    </Button>
                  </Link>
                </div>
                <div className="p-[25px]">
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

export default Keycaps;
