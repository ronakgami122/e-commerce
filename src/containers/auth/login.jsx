import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Paper } from "@mui/material";
import { api } from "../../api/client";
import { loginValidationSchema } from "../../utils/helper";
import CustomInput from "../../shared/customInput";
import CustomButton from "../../shared/customButton";
import { URLS } from "../../constants/urls";
import { COLORS } from "../../utils/colors";
import { IMAGES } from "../../assets";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.AUTH.login({
        data: {
          username: values.username,
          password: values.password,
        },
      });

      if (response?.token) {
        localStorage.setItem("token", response.token);
        navigate(URLS.PRODUCTS);
        resetForm();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 8,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
            }}
          >
            Login
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <CustomInput
                name="username"
                label="Username"
                placeholder="Enter your username"
              />
              <CustomInput
                name="password"
                label="Password"
                type="password"
                password
                placeholder="Enter your password"
              />
              <Box mt={3}>
                <CustomButton
                  loading={loading}
                  variant="contained"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                  }}
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Login
                </CustomButton>
              </Box>
            </Form>
          </Formik>
        </Paper>
      </Container>
      {/* add IMAGES.login here */}
      <div className="mt-6 items-center justify-center flex">
        <img src={IMAGES.login} />
      </div>
    </Container>
  );
};

export default LoginPage;
