import React from "react";
import { default as DataTableView } from "react-data-table-component";
import Pagination from "../../../utils/Pagination";

const DataTable = ({ columns, data, pageSize, count }) => {
  return (
    <DataTableView
      columns={columns}
      data={data}
      // pagination
      paginationComponentOptions={{ noRowsPerPage: true }}
      paginationComponent={(props) => (
        <Pagination pageSize={pageSize} count={count} />
      )}
    />
  );
};

export default DataTable;
