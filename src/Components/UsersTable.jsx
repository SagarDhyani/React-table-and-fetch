import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRow, getUsers } from "../myRedux/userSlice";
import { useTable, useSortBy } from "react-table";

import "./UserTable.css";
import { Delete, Edit, Sort } from "@material-ui/icons";
import { SortAlphaAsc } from "styled-icons/icomoon";
import { SortAlphabetically } from "styled-icons/typicons";
import { SortAscending, SortDescending } from "styled-icons/heroicons-outline";
import { SortDesc } from "styled-icons/octicons";
import { Header } from "styled-icons/open-iconic";

export const UsersTable = () => {
  // const columns = useMemo(() => COLUMNS, []);
  // const [data, setData] = useState(useMemo(() => myData));
  const myData = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const data = useMemo(() => myData);
  // const columns = useMemo(() => COLUMNS, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const COLUMNS = [
    // {
    //   Header: "Id",
    //   accessor: "id",
    // },

    {
      Header: "Name",
      accessor: "name",
    },

    {
      Header: "Email",
      accessor: "email",
    },

    {
      Header: "Website Name",
      accessor: "website",
    },

    {
      Header: "Phone Number",
      accessor: "phone",
    },

    {
      Header: "Company Name",
      accessor: "company.name",
    },

    {
      Header: "City",
      accessor: "address.city",
    },

    {
      Header: "Delete Rows",

      accessor: (str) => (
        <button
          className="Button"
          onClick={() => {
            dispatch(deleteRow(str));
          }}
        >
          <Delete className="Row" />
        </button>
      ),
    },

    // {
    //   Header: "Edit",

    //   accessor: (str) => (
    //     <button className="Button" onClick = {()=>{

    //     }}>
    //       <Edit className="Row" />
    //     </button>
    //   ),
    // },
  ];

  // const myData = useSelector((store) => store.users);

  const columns = useMemo(() => COLUMNS, []);

  // const data = useMemo(() => myData);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // console.log("tableInstance:", tableInstance);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}

                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <SortAscending className="sortIcon" />
                    ) : (
                      <SortDescending className="sortIcon" />
                    )
                  ) : (
                    ""
                    // <Sort className="sortIcon" />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
