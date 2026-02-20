import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";

const theme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      setLoading(true);
      setError("");

      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result || "Registration Successful!");
        setOpen(true);
        setFormState(0);
        setUsername("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          backgroundColor: "background.default",
        }}
      >
        <CssBaseline />

        {/* Form Section */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          component={Paper}
          elevation={6}
          square
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            width: "100%",
            maxWidth: 420,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ mb: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5" sx={{ mb: 2 }}>
              {formState === 0 ? "Welcome Back" : "Create Account"}
            </Typography>

            {/* Toggle Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>

              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            {/* Form */}
            <Box sx={{ width: "100%" }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography sx={{ color: "error.main", mt: 1 }} variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleAuth}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : formState === 0 ? (
                  "Login"
                ) : (
                  "Register"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" variant="filled">
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}
