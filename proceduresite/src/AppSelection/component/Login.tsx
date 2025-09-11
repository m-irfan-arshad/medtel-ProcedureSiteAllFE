import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import AppLogo from '../../assets/AppSelection/app_logo.png';
import { useNavigate } from "react-router-dom";
import { auth } from '../../Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate()

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        setLoading(true);
        // simulate API call
        navigate("/applications")
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  return (
    <Box
      sx={{
        //minHeight: "100vh",
        height: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //background: "linear-gradient(135deg, #4A90E2 0%, #0052D4 100%)",
        //p: 2,
      }}
    >
      <Card
        sx={{
          width: 380,
          borderRadius: 4,
          boxShadow: 6,
          p: 2,
          backgroundColor: "white",
        }}
      >
        <CardContent>
            <Box display="flex" justifyContent="center" mb={0}>
            <img
              src={AppLogo}
              alt="App Logo"
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
          </Box>
          
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={1}
          >
            Please login to continue
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            {/* Footer */}
            <Typography
              variant="body2"
              align="center"
              mt={3}
              sx={{ cursor: "pointer", color: "primary.main" }}
            >
              Forgot Password?
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
