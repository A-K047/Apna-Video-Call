import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          backgroundColor: "#0f172a",
          color: "white",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0, letterSpacing: 1 }}>Apna Video Call</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/history")}
          >
            <IconButton sx={{ color: "white" }}>
              <RestoreIcon />
            </IconButton>
            <span style={{ fontSize: "14px" }}>History</span>
          </div>

          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": { borderColor: "#94a3b8" },
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "85vh",
          padding: "20px",
          backgroundColor: "#0f172a",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            maxWidth: "500px",
            color: "white",
          }}
        >
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
            Providing Quality Video Call Services for Everyone
          </h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <TextField
              fullWidth
              onChange={(e) => setMeetingCode(e.target.value)}
              label="Meeting Code"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                flex: "1",
              }}
            />

            <Button
              variant="contained"
              onClick={handleJoinVideoCall}
              sx={{
                backgroundColor: "#2563eb",
                padding: "12px 25px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#1d4ed8" },
              }}
            >
              Join
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <img
            src="/logo3.png"
            alt="Video Call"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
