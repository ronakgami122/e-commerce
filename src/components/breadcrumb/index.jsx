import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { COLORS } from "../../utils/colors";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumb = () => {
  const location = useLocation();

  // Don't show breadcrumbs on home page
  if (location.pathname === "/") {
    return null;
  }

  // Create breadcrumb items from path
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div
      style={{
        backgroundColor: COLORS.headerPrimary,
        padding: "15px 0",
        marginBottom: "30px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              color: COLORS.text,
              textDecoration: "none",
              "&:hover": {
                color: COLORS.pink,
              },
            }}
          >
            Home
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            // Convert path to readable text
            const name = value.charAt(0).toUpperCase() + value.slice(1);

            return last ? (
              <Typography
                key={to}
                sx={{
                  color: COLORS.pink,
                  fontWeight: 500,
                }}
              >
                {name}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={to}
                key={to}
                sx={{
                  color: COLORS.text,
                  textDecoration: "none",
                  "&:hover": {
                    color: COLORS.pink,
                  },
                }}
              >
                {name}
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Breadcrumb;
