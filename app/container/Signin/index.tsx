"use client";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/images/logo-signin.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "@/app/components/common/CustomButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loader from "@/app/components/common/Loader";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = () => {
    if (email && password) {
      setIsLoading(true);
      Cookies.set("isAuthenticated", "true");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      alert("Please enter valid credentials.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        bgcolor: "#0057B7",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          padding: "40px",
          borderRadius: 2,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Image src={logo} alt="logo" width={100} />
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginTop: "24px", marginBottom: "16px" }}
        >
          Welcome
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Log in to sharemundo Admin Links.
        </Typography>

        <Box sx={{ width: "100%", marginTop: 3 }}>
          <TextField
            label="Email address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <CustomButton
          variant="contained"
          onClick={handleSignin}
          fullWidth
          sx={{
            bgcolor: "#0057B7",
            color: "white",
            padding: "16px 24px",
            fontWeight: "700",
            margin: "24px 0 0 0 ",
          }}
        >
          Continue
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Signin;
