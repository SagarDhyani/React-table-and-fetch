import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../myRedux/userSlice";
import { useTable } from "react-table";
import "./UserTable.css";

export const UsersTable = () => {
  // const columns = useMemo(() => COLUMNS, []);
  // const [data, setData] = useState(useMemo(() => myData));
  const myData = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const data = useMemo(() => myData);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
    },

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
      Header: "Delete Items",

      // accessor: (str) => <button onClick = {(data)=>{
      //   console.log("kas", da)
      // }}>Delete</button>,

     
     
    },
  ];

  // const myData = useSelector((store) => store.users);

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => myData);

  const tableInstance = useTable({
    columns,
    data,
  });

  console.log("tableInstance:", tableInstance);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
