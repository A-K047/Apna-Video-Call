import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

import { IconButton } from "@mui/material";
export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {}
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: { xs: 2, sm: 4 },
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Meeting History
        </Typography>

        <IconButton
          onClick={() => routeTo("/home")}
          sx={{
            backgroundColor: "#1e293b",
            color: "white",
            "&:hover": { backgroundColor: "#334155" },
          }}
        >
          <HomeIcon />
        </IconButton>
      </Box>

      {/* Cards Container */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {meetings.length !== 0 ? (
          meetings.map((e, i) => (
            <Card
              key={i}
              sx={{
                backgroundColor: "#1e293b",
                color: "white",
                borderRadius: 3,
                boxShadow: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 14, opacity: 0.7 }} gutterBottom>
                  Meeting Code
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  {e.meetingCode}
                </Typography>

                <Typography sx={{ opacity: 0.7 }}>
                  Date: {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            sx={{
              color: "white",
              opacity: 0.7,
              textAlign: "center",
              gridColumn: "1/-1",
              marginTop: 4,
            }}
          >
            No Meetings Yet
          </Typography>
        )}
      </Box>
    </Box>
  );
}
