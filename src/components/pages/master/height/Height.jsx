import React from 'react'
import Wrapper from '../../../layouts/Wrapper'
import DataTable from '../DataTable';
import { Button } from 'reactstrap';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Height = () => {
  const heightOptions = [
    { id: 1, height: "4 ft 0 in", value: 4.0 },
    { id: 2, height: "4 ft 1 in", value: 4.1 },
    { id: 3, height: "4 ft 2 in", value: 4.2 },
    { id: 4, height: "4 ft 3 in", value: 4.3 },
    { id: 5, height: "4 ft 4 in", value: 4.4 },
    { id: 6, height: "4 ft 5 in", value: 4.5 },
    { id: 7, height: "4 ft 6 in", value: 4.6 },
    { id: 8, height: "4 ft 7 in", value: 4.7 },
    { id: 9, height: "4 ft 8 in", value: 4.8 },
    { id: 10, height: "4 ft 9 in", value: 4.9 },
    { id: 11, height: "4 ft 10 in", value: 4.1 },
    { id: 12, height: "4 ft 11 in", value: 4.11 },
    { id: 13, height: "5 ft 0 in", value: 5.0 },
    { id: 14, height: "5 ft 1 in", value: 5.1 },
    { id: 15, height: "5 ft 2 in", value: 5.2 },
    { id: 16, height: "5 ft 3 in", value: 5.3 },
    { id: 17, height: "5 ft 4 in", value: 5.4 },
    { id: 18, height: "5 ft 5 in", value: 5.5 },
    { id: 19, height: "5 ft 6 in", value: 5.6 },
    { id: 20, height: "5 ft 7 in", value: 5.7 },
    { id: 21, height: "5 ft 8 in", value: 5.8 },
    { id: 22, height: "5 ft 9 in", value: 5.9 },
    { id: 23, height: "5 ft 10 in", value: 5.1 },
    { id: 24, height: "5 ft 11 in", value: 5.11 },
    { id: 25, height: "6 ft 0 in", value: 6.0 },
    { id: 26, height: "6 ft 1 in", value: 6.1 },
    { id: 27, height: "6 ft 2 in", value: 6.2 },
    { id: 28, height: "6 ft 3 in", value: 6.3 },
    { id: 29, height: "6 ft 4 in", value: 6.4 },
    { id: 30, height: "6 ft 5 in", value: 6.5 },
    { id: 31, height: "6 ft 6 in", value: 6.6 },
    { id: 32, height: "6 ft 7 in", value: 6.7 },
    { id: 33, height: "6 ft 8 in", value: 6.8 },
    { id: 34, height: "6 ft 9 in", value: 6.9 },
    { id: 35, height: "6 ft 10 in", value: 6.1 },
    { id: 36, height: "6 ft 11 in", value: 6.11 },
    { id: 37, height: "7 ft 0 in", value: 7.0 },
  ];

  const columns = [
    {
      name: "Sl No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Height",
      selector: (row) => row.height,
    },
    {
      name: "Value",
      selector: (row) => row.value,
    },
  ];
  const nav = useNavigate();

  const handleNav = () => {
    nav("/master/height/add");
  };
  return (
    <Wrapper>
      <div className="common-db-head mb-4">
        <div className="align-items-center row">
          <div className="d-inline-flex col-md-6">

          </div>
          <div className="text-end col-md-6">
            <Button className="btn btn-style1" onClick={handleNav}>
              {" "}
              Add <FiPlus />
            </Button>
          </div>
        </div>
      </div>
       <DataTable
        columns={columns}
        data={heightOptions}
        pageSize={10}
        count={heightOptions?.length}
      />
    </Wrapper>
  )
}

export default Height