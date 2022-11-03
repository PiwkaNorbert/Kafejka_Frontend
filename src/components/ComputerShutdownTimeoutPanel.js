import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, CardActions, Box, TextField } from "@mui/material";

const ComputerShutdownTimeoutPanel = ({ computer, index, url, callback }) => {
  const [shutdownTimeout, setShutdownTimeout] = useState("");

  // Set status Shutdown Time
  const compShutDownTimeout = async (e, value) => {
    const urlShutdownTimeout = `${url}shutdown-timeout/${e}/${value}/`;
    try {
      await axios
        .get(urlShutdownTimeout, {
          shutdownTimeout,
        })
        .then((res) => setShutdownTimeout(res));
      console.log(shutdownTimeout);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CardActions
        sx={{ boxShadow: 1, borderRadius: 3 }}
        className="kafeika__wrap"
      >
        <Box>
          <div>
            <div>Czas: {computer.fields.t}</div>
          </div>
          <form onClick={(e) => e.preventDefault()}>
            <TextField
              type="number"
              helperText="5-60min"
              id={`closeTime${index}`}
              InputProps={{
                inputProps: { min: 5, max: 60, step: 5, defaultValue: 5 },
              }}
              name="closeTime"
              variant="standard"
              color="secondary"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 60, padding: 0, margin: 1 }}
            />
            <Button
              variant="contained"
              color={computer.fields.f === 5 ? "warning" : "error"}
              size="small"
              key={index}
              type="submit"
              sx={{ margin: 1 }}
              disabled={computer.fields.f === 5 && computer.fields.t === 0}
              onClick={() => {
                compShutDownTimeout(
                  computer.pk,
                  document.querySelector(`#closeTime${index}`).value
                );
                callback();
              }}
            >
              {`${computer.fields.f === 5 ? "Anuluj" : "Zamknij"}`}
            </Button>
          </form>
        </Box>
      </CardActions>
    </div>
  );
};

export default ComputerShutdownTimeoutPanel;
