import React, { useState, useEffect } from "react";
// import MaterialTable from "material-table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Map = require("./Map.js");

const convertTotime = (epoch) => {
  const timeObj = new Date(epoch * 1000);
  const timeStr = timeObj.toLocaleString();
  return timeStr;
};

const List = () => {
  const [content, setContent] = useState({ now: 0, aircraft: [] });
  useEffect(() => {
    const INTERVAL_TIME = 1000;
    setTimeout(() => {
      // fetch("/data/aircraft.json")
      fetch("/data/test.json")
        .then((res) => res.json())
        .then((json) => setContent(json))
        .then((content) => console.log(content));
    }, INTERVAL_TIME);
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);

  const useStyles = makeStyles({
    table: {
      minWidth: 400,
    },
    container: {
      maxHeight: 600,
    },
  });

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowSelected = (row) => {
    console.log("row selected");
    // marker = new Map.L.Marker([row.lon, row.lat]);

  };

  const columns = [
    { id: "hex", label: "ICAO", minWidth: 50 },
    {
      id: "flight",
      label: "Flight No.",
      minWidth: 50,
      align: "right",
    },
    {
      id: "alt_baro",
      label: "Altitude(ft)",
      minWidth: 50,
      align: "right",
    },
    {
      id: "tas",
      label: "Speed(kt)",
      minWidth: 50,
      align: "right",
    },
    {
      id: "track",
      label: "Track",
      minWidth: 50,
      align: "right",
    },
    {
      id: "lat",
      label: "Lat",
      minWidth: 50,
      align: "right",
    },
    {
      id: "lon",
      label: "Lon",
      minWidth: 50,
      align: "right",
    },
    {
      id: "squawk",
      label: "Squawk",
      minWidth: 50,
      align: "right",
    },
    {
      id: "seen",
      label: "Seen",
      minWidth: 50,
      align: "right",
    },
  ];

  return (
    <div>
      <h1>ADS-B Tracker</h1>
      <h2>{convertTotime(content.now)}</h2>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {content.aircraft
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => handleRowSelected(row)}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 100]}
          component="div"
          count={content.aircraft.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default List;
