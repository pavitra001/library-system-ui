import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";


import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {Snackbar,Alert} from "@mui/material";

const ReturnButton = ({ item, updateBookCount }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ReturnBook = (book_id, student_id) => {
    const issueApiUrl = `http://localhost:8081/library_system/v1/inventory/return/book/${book_id}/${student_id}`;

    fetch(issueApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Book Returned successfully.");
        setSnackbarMessage("Book Returned successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setData((prevData) =>
          prevData.filter((book) => book.book_id !== book_id)
        );
        setDrawerOpen(false);
        updateBookCount(book_id);
      })
      .catch((error) => {
        console.error("Error Returning the book:", error.message);
        setSnackbarMessage("Error Returning the Book");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleReturn = () => {
    if (!item) {
      console.error("No book selected for Return.");
      // Handle error or show snackbar
      return;
    }
    ReturnBook(item.book_id, 1);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      {/* <Button className="issue-button" onClick={handleIssue}>
        <Delete />
      </Button> */}
      <IconButton color="primary" title = {"Return Book"} onClick={handleReturn}>
            <RemoveCircleOutlineIcon />
    </IconButton>
    <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReturnButton;

