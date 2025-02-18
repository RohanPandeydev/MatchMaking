import React from 'react'
import Wrapper from '../../../layouts/Wrapper'
import DataTable from '../DataTable';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FiPlus } from 'react-icons/fi';

const Weight = () => {
  const weightOptions = [
    { id: 1, weight: "40 kg", value: 40 },
    { id: 2, weight: "41 kg", value: 41 },
    { id: 3, weight: "42 kg", value: 42 },
    { id: 4, weight: "43 kg", value: 43 },
    { id: 5, weight: "44 kg", value: 44 },
    { id: 6, weight: "45 kg", value: 45 },
    { id: 7, weight: "46 kg", value: 46 },
    { id: 8, weight: "47 kg", value: 47 },
    { id: 9, weight: "48 kg", value: 48 },
    { id: 10, weight: "49 kg", value: 49 },
    { id: 11, weight: "50 kg", value: 50 },
    { id: 12, weight: "51 kg", value: 51 },
    { id: 13, weight: "52 kg", value: 52 },
    { id: 14, weight: "53 kg", value: 53 },
    { id: 15, weight: "54 kg", value: 54 },
    { id: 16, weight: "55 kg", value: 55 },
    { id: 17, weight: "56 kg", value: 56 },
    { id: 18, weight: "57 kg", value: 57 },
    { id: 19, weight: "58 kg", value: 58 },
    { id: 20, weight: "59 kg", value: 59 },
    { id: 21, weight: "60 kg", value: 60 },
    { id: 22, weight: "61 kg", value: 61 },
    { id: 23, weight: "62 kg", value: 62 },
    { id: 24, weight: "63 kg", value: 63 },
    { id: 25, weight: "64 kg", value: 64 },
    { id: 26, weight: "65 kg", value: 65 },
    { id: 27, weight: "66 kg", value: 66 },
    { id: 28, weight: "67 kg", value: 67 },
    { id: 29, weight: "68 kg", value: 68 },
    { id: 30, weight: "69 kg", value: 69 },
    { id: 31, weight: "70 kg", value: 70 },
    { id: 32, weight: "71 kg", value: 71 },
    { id: 33, weight: "72 kg", value: 72 },
    { id: 34, weight: "73 kg", value: 73 },
    { id: 35, weight: "74 kg", value: 74 },
    { id: 36, weight: "75 kg", value: 75 },
    { id: 37, weight: "76 kg", value: 76 },
    { id: 38, weight: "77 kg", value: 77 },
    { id: 39, weight: "78 kg", value: 78 },
    { id: 40, weight: "79 kg", value: 79 },
    { id: 41, weight: "80 kg", value: 80 },
    { id: 42, weight: "81 kg", value: 81 },
    { id: 43, weight: "82 kg", value: 82 },
    { id: 44, weight: "83 kg", value: 83 },
    { id: 45, weight: "84 kg", value: 84 },
    { id: 46, weight: "85 kg", value: 85 },
    { id: 47, weight: "86 kg", value: 86 },
    { id: 48, weight: "87 kg", value: 87 },
    { id: 49, weight: "88 kg", value: 88 },
    { id: 50, weight: "89 kg", value: 89 },
    { id: 51, weight: "90 kg", value: 90 },
    { id: 52, weight: "91 kg", value: 91 },
    { id: 53, weight: "92 kg", value: 92 },
    { id: 54, weight: "93 kg", value: 93 },
    { id: 55, weight: "94 kg", value: 94 },
    { id: 56, weight: "95 kg", value: 95 },
    { id: 57, weight: "96 kg", value: 96 },
    { id: 58, weight: "97 kg", value: 97 },
    { id: 59, weight: "98 kg", value: 98 },
    { id: 60, weight: "99 kg", value: 99 },
    { id: 61, weight: "100 kg", value: 100 },
    { id: 62, weight: "101 kg", value: 101 },
    { id: 63, weight: "102 kg", value: 102 },
    { id: 64, weight: "103 kg", value: 103 },
    { id: 65, weight: "104 kg", value: 104 },
    { id: 66, weight: "105 kg", value: 105 },
    { id: 67, weight: "106 kg", value: 106 },
    { id: 68, weight: "107 kg", value: 107 },
    { id: 69, weight: "108 kg", value: 108 },
    { id: 70, weight: "109 kg", value: 109 },
    { id: 71, weight: "110 kg", value: 110 },
  ];
  const columns = [
    {
      name: "Sl No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      name: "Value",
      selector: (row) => row.value,
    },
  ];
  const nav = useNavigate();

  const handleNav = () => {
    nav("/master/weight/add");
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
        data={weightOptions}
        pageSize={10}
        count={weightOptions?.length}
      />
    </Wrapper>
  )
}

export default Weight