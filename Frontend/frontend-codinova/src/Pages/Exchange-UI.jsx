import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TablePagination } from "@mui/material";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import instance from "../instance";
import { useEffect } from "react";
import Loader from "../component/loader";

const Exchange = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchVal, setSearchVal] = useState("");
  const [fetchdata, setfetchdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchdata.length) : 0;

  const fetch = async () => {
    const res = await instance({
      url: `/get-exchange-data`,
      method: "GET",
    });

    setfetchdata(res.data.data);
  };

  const RefreshData = async () => {
    setLoading(true);
    const res = await instance({
      url: `/update-exchange-data`,
      method: "GET",
    });

    if (res.data.status) {
      setLoading(false);
      fetch();
    } else {
      alert("Update fail");
    }
  };

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    setPage(0);
    let tempArr = [];
    for (let ele of fetchdata) {
      let Crypname = "";
      if (ele.name === undefined) {
        Crypname = "undefined";
      } else {
        Crypname = ele.name.toLowerCase();
      }

      let cryptoname = Crypname;

      if (cryptoname.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }

    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center text-3xl font-bold mt-[1rem]">
        Top Crypto Exchanges
      </div>
      <div className="w-full flex justify-center">
        Compare All top Crypto Currencies.The List is ranked by trading volume
      </div>

      <div className="w-full flex justify-center text-blue-600 text-xl font-medium py-[1rem] ">
        <div className="border-2 border-slate-200 rounded-sm w-[10%] flex justify-center items-center shadow-sm shadow-slate-300">
          Exchanges
        </div>
      </div>
      <div className=" ml-[80%]">
        <Button
          variant="contained"
          className="!bg-green-400 w-[150px] h-[50px]"
          onClick={RefreshData}
        >
          {loading ? (
            <Loader />
          ) : (
            <span>
              <RefreshIcon /> Refresh
            </span>
          )}
        </Button>
      </div>
      <div className="flex w-[100%] px-[2rem] py-4 justify-center">
        <div className="flex w-[80%] ">
          <TableContainer component={Paper}>
            <Toolbar className="border-2 border-slate-300 flex justify-between">
              <div className="flex">
                <TextField
                  id="search-bar"
                  className="text"
                  onInput={(e) => {
                    handleSearch(e.target.value);
                  }}
                  label="Enter Exchange Name"
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  type="search"
                />
                <div className="bg-slate-300">
                  <IconButton
                    type="submit"
                    aria-label="search"
                    onClick={filterTable}
                  >
                    <SearchIcon style={{ fill: "blue" }} />
                  </IconButton>
                </div>
              </div>

              <TablePagination
                rowsPerPageOptions={[10, 50, 100, { label: "All", value: -1 }]}
                colSpan={3}
                count={
                  searchRow.length === 0 ? fetchdata.length : searchRow.length
                }
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Toolbar>

            <Table aria-label="simple table">
              <TableHead className=" !w-full">
                <TableRow>
                  {[
                    "#",
                    "Exchanges",
                    "volume-1hrs",
                    "volume-1days",
                    "volume-1month",
                  ].map((header, i) => (
                    <TableCell className="!font-black text-lg ">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {searchRow.length === 0
                  ? (rowsPerPage > 0
                      ? fetchdata.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : fetchdata
                    ).map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">
                          <div className="flex gap-3">
                            <div>
                              <img src={data.icon_url} width={"20px"} />
                            </div>

                            <div>{data.name}</div>
                          </div>
                        </TableCell>
                        <TableCell align="left" className="bg-slate-100">
                          {data.volume_1hrs_usd}
                        </TableCell>

                        <TableCell align="left" className="bg-slate-100">
                          {data.volume_1day_usd}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-100">
                          {data.volume_1mth_usd}
                        </TableCell>
                      </TableRow>
                    ))
                  : (rowsPerPage > 0
                      ? searchRow.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : searchRow
                    ).map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left" className="">
                          <div className="flex gap-3">
                            <div>
                              <img src={data.icon_url} width={"20px"} />
                            </div>

                            <div>{data.name}</div>
                          </div>
                        </TableCell>
                        <TableCell align="left" className="bg-slate-100">
                          {data.volume_1hrs_usd}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-100">
                          {data.volume_1day_usd}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-100">
                          {data.volume_1mth_usd}
                        </TableCell>
                      </TableRow>
                    ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 41 * emptyRows }}>
                    <TableRow colSpan={3} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
