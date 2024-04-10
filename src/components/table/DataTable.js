import { Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function DataTable({ rowSelection, tableData, columns, pagination }) {
  return (
    <div className="table-responsive hover-tr-none table-th-shape-none table-last-th-text-right table-th-border-none table-head-rounded table-td-border-none ant-pagination-custom-style ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-4 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-4 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-4 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-4 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none dark-border-row">
      {rowSelection ? (
        <Table
          rowSelection={{
            // type: state.selectionType,
            ...rowSelection,
          }}
          rowKey="rowKey"
          pagination={pagination}
          dataSource={tableData}
          columns={columns}
        />
      ) : (
        <Table rowKey="rowKey" pagination={pagination} dataSource={tableData} columns={columns} />
      )}
    </div>
  );
}

DataTable.propTypes = {
  rowSelection: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  pagination: PropTypes.object,
};
export default DataTable;
