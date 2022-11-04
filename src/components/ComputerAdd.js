import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

const ComputerAdd = ({ computer, url }) => {
  const add = useState("");

  // Set status Shutdown
  const compAdd = async (e) => {
    const urlAdd = `${url}add-pc/${e}/`;
    try {
      await axios.get(urlAdd, {
        add,
        title: "Add",
        completed: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      variant="outlined"
      color="success"
      size="small"
      type="submit"
      className={"btn btn-block btn-add"}
      sx={{
        fontWeight: "900",
      }}
      onClick={(e) => {
        e.preventDefault();
        compAdd(computer);
      }}
    >
      Dodaj Komputer
    </Button>
  );
};

export default ComputerAdd;
