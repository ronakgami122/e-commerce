import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { COLORS } from "../../utils/colors";

const CustomHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleHomeClick = () => {
    navigate(URLS.INITIAL);
  };

  const handleLoginClick = () => {
    navigate(URLS.LOGIN);
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpen(true);
      return;
    }
    navigate(URLS.CART);
  };

  const handleProductsClick = () => {
    navigate(URLS.PRODUCTS);
  };

  const handleContactClick = () => {
    navigate(URLS.CONTACT);
  };

  const handleWishlistClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpen(true);
      return;
    }
    navigate(URLS.WISHLIST);
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-purple text-white text-md">
        <Container
          maxWidth="lg"
          sx={{ height: "100%", backgroundColor: COLORS.purple }}
        >
          <div className="flex items-center justify-between py-3">
            {/* Left */}
            <div className="flex gap-8">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                Email
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                Phone_Number
              </span>
            </div>
            {/* Right */}
            <div className="flex gap-8">
              <span
                className="flex items-center cursor-pointer hover:opacity-75"
                onClick={handleLoginClick}
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </span>
              <span
                className="flex items-center cursor-pointer hover:opacity-75"
                onClick={handleWishlistClick}
              >
                Wishlist
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </span>
              <span
                className="flex items-center cursor-pointer hover:opacity-75"
                onClick={handleCartClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Container>
      </div>
      {/* Middle Bar */}
      <div className="bg-white">
        <Container maxWidth="lg">
          <div className="flex items-center justify-between py-8">
            <div>
              <span className="text-5xl font-bold text-text">Hekto</span>
            </div>
            <div className="gap-8 flex">
              <span
                className="cursor-pointer hover:text-pink text-text"
                onClick={handleHomeClick}
              >
                Home
              </span>
              <span
                className="cursor-pointer hover:text-pink text-text"
                onClick={handleProductsClick}
              >
                Products
              </span>
              <span
                className="cursor-pointer hover:text-pink text-text"
                onClick={handleCartClick}
              >
                Cart
              </span>
              <span
                className="cursor-pointer hover:text-pink text-text"
                onClick={handleContactClick}
              >
                Contact
              </span>
              <span
                className="cursor-pointer hover:text-pink text-text"
                onClick={handleWishlistClick}
              >
                Favorites
              </span>
            </div>

            <div className="flex items-center">
              <TextField
                placeholder="Search product..."
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0",
                    "& fieldset": {
                      borderColor: COLORS.gray,
                      borderRight: "none",
                    },
                    "&:hover fieldset": {
                      borderColor: COLORS.gray,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: COLORS.pink,
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "8.5px 14px",
                  },
                }}
              />
              <IconButton
                sx={{
                  backgroundColor: COLORS.pink,
                  borderRadius: "0",
                  padding: "8px",
                  height: "40px",
                  marginLeft: "-1px",
                  "&:hover": {
                    backgroundColor: COLORS.pink,
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
        </Container>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          marginTop: "55px",
          marginRight: "20px",
        }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            bgcolor: COLORS.pink,
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
            "& .MuiAlert-action": {
              color: "white",
            },
          }}
        >
          Please login first!
        </Alert>
      </Snackbar>
    </header>
  );
};

export default CustomHeader;
