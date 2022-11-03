import React from "react";
import { Box, CardContent, Button, Card } from "@mui/material";
import { blue } from "@mui/material/colors";

const WifiPerms = () => {
  return (
    <div>
      <CardContent
        className="kafeika__background "
        sx={{ boxShadow: 2, borderRadius: 3, padding: "10px", margin: 1 }}
      >
        <Box>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Numer karty czytelnika</p>

            <input />
            <br />
            <Button variant="contained">ok</Button>
          </form>
        </Box>
        <Box sx={{ display: "grid", textAlign: "center" }}>
          <p>Karty oczekujące na połaczenie</p>
          <table style={{ borderRadius: "12px", backgroundColor: "blue" }}>
            <thead>
              <th
                style={{ backgroundColor: "red", borderTopLeftRadius: "12px" }}
              >
                Filia
              </th>
              <th style={{ backgroundColor: "red" }}>Info</th>
              <th
                style={{ backgroundColor: "red", borderTopRightRadius: "12px" }}
              >
                puste
              </th>
            </thead>
            <tbody>
              <td>asd</td>
              <td>asd</td>
              <td>dasd</td>
            </tbody>
          </table>
        </Box>
      </CardContent>
    </div>
  );
};

export default WifiPerms;
