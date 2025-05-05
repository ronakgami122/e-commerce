import {
  Container,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { URLS } from "../../constants/urls";
import { COLORS } from "../../utils/colors";
import { IMAGES } from "../../assets";
import useFooter from "./useFooter";

const CustomFooter = () => {
  const navigate = useNavigate();
  const { categories, loading } = useFooter();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleHomeClick = () => navigate(URLS.INITIAL);
  const handleProductsClick = () => navigate(URLS.PRODUCTS);
  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpen(true);
      return;
    }
    navigate(URLS.CART);
  };
  const handleWishlistClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpen(true);
      return;
    }
    navigate(URLS.WISHLIST);
  };
  const handleLoginClick = () => navigate(URLS.LOGIN);

  return (
    <footer>
      {/* Upper Footer */}
      <div className="bg-footerPrimary py-20">
        <Container maxWidth="lg" className="grid grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <span className="text-4xl font-bold text-text">Hekto</span>
            <div className="flex items-center">
              <TextField
                placeholder="Enter Email Address"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px 0 0 5px",
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
                  borderRadius: "0 5px 5px 0",
                  padding: "8px 16px",
                  height: "40px",
                  marginLeft: "-1px",
                  "&:hover": {
                    backgroundColor: COLORS.pink,
                  },
                }}
              >
                <span className="text-white text-sm font-medium">Sign Up</span>
              </IconButton>
            </div>
            <span className="text-gray font-medium">Contact Info</span>
            <span className="text-sm text-gray">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </span>
          </div>

          {/* Column 2 - Categories (Updated) */}
          <div className="flex flex-col gap-4">
            <span className="text-xl font-medium mb-2 text-text">
              Categories
            </span>
            {loading ? (
              <span className="text-sm text-gray">Loading categories...</span>
            ) : categories?.length ? (
              categories.map((category) => (
                <span
                  key={category}
                  className="text-sm text-gray capitalize cursor-pointer hover:text-pink transition-colors"
                >
                  {category}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray">No categories found</span>
            )}
          </div>

          {/* Column 3 - Customer Care */}
          <div className="flex flex-col gap-4">
            <span className="text-xl font-medium mb-2 text-text">
              Customer Care
            </span>
            <span className="text-sm text-gray cursor-pointer hover:text-pink">
              My Account
            </span>
            <span className="text-sm text-gray cursor-pointer hover:text-pink">
              Discount
            </span>
            <span className="text-sm text-gray cursor-pointer hover:text-pink">
              Returns
            </span>
            <span className="text-sm text-gray cursor-pointer hover:text-pink">
              Orders History
            </span>
            <span className="text-sm text-gray cursor-pointer hover:text-pink">
              Order Tracking
            </span>
          </div>

          {/* Column 4 - Pages */}
          <div className="flex flex-col gap-4">
            <span className="text-xl font-medium mb-2 text-text">Pages</span>
            <span
              className="text-sm text-gray cursor-pointer hover:text-pink"
              onClick={handleHomeClick}
            >
              Home
            </span>
            <span
              className="text-sm text-gray cursor-pointer hover:text-pink"
              onClick={handleProductsClick}
            >
              Products
            </span>
            <span
              className="text-sm text-gray cursor-pointer hover:text-pink"
              onClick={handleLoginClick}
            >
              Login
            </span>
            <span
              className="text-sm text-gray cursor-pointer hover:text-pink"
              onClick={handleWishlistClick}
            >
              Wishlist
            </span>
            <span
              className="text-sm text-gray cursor-pointer hover:text-pink"
              onClick={handleCartClick}
            >
              Cart
            </span>
          </div>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className="bg-footerSecondary py-3">
        <Container maxWidth="lg" className="flex justify-around items-center">
          <span className="text-sm text-gray">
            ©Webecy - All Rights Reserved
          </span>
          <div className="flex gap-2">
            <img src={IMAGES.facebook} />
            <img src={IMAGES.instagram} />
            <img src={IMAGES.twitter} />
          </div>
        </Container>
      </div>

      {/* Add Snackbar */}
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
    </footer>
  );
};

export default CustomFooter;
