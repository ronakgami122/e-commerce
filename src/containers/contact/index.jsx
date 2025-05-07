import React, { useState } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { COLORS } from "../../utils/colors";
import { IMAGES } from "../../assets";
import { contactValidationSchema } from "../../utils/helper";
import CustomInput from "../../shared/customInput";
import CustomButton from "../../shared/customButton";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", values);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} columns={16}>
        {/* Left Side */}
        <Grid size={{ xs: 16, sm: 8 }}>
          {/* Information About Us Section */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                borderBottom: `2px solid ${COLORS.pink}`,
                display: "inline-block",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Information About us
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: COLORS.gray }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "#5625DF",
                }}
              />
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: COLORS.pink,
                }}
              />
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "#37DAF3",
                }}
              />
            </Box>
          </Box>
        </Grid>
        {/* Contact Way Section */}
        <Grid size={{ xs: 16, sm: 8 }}>
          <Box>
            <Box
              sx={{
                borderBottom: `2px solid ${COLORS.pink}`,
                display: "inline-block",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Contact Way
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {[
                {
                  title: "Tel: 877-67-88-99",
                  subtitle: "E-Mail: shop@store.com",
                  bgColor: "#5625DF",
                },
                {
                  title: "Support Forum",
                  subtitle: "For over 24hr",
                  bgColor: COLORS.pink,
                },
                {
                  title: "20 Margaret st, London",
                  subtitle: "Great britain, 3NM98-LK",
                  bgColor: "#FFB265",
                },
                {
                  title: "Free standard shipping",
                  subtitle: "on all orders.",
                  bgColor: "#1BE982",
                },
              ].map((item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        bgcolor: item.bgColor,
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: COLORS.text, fontWeight: 500 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: COLORS.gray }}>
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid size={{ xs: 16, sm: 8 }}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              subject: "",
              message: "",
            }}
            validationSchema={contactValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2} columns={8}>
                <Grid size={{ xs: 8, sm: 4 }}>
                  <CustomInput name="name" placeholder="Your Name*" />
                </Grid>
                <Grid size={{ xs: 8, sm: 4 }}>
                  <CustomInput name="email" placeholder="Your E-mail*" />
                </Grid>
              </Grid>
              <CustomInput name="subject" placeholder="Subject*" />
              <CustomInput
                name="message"
                placeholder="Type Your Message*"
                multiline
                rows={4}
              />
              <CustomButton type="submit" loading={loading} size="large">
                Send Mail
              </CustomButton>
            </Form>
          </Formik>
        </Grid>
        <Grid size={{ xs: 16, sm: 8 }}>
          <Box
            sx={{
              mt: { xs: 3, md: 0 },
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={IMAGES.contact}
              alt="Contact"
              style={{
                maxWidth: "60%",
                maxHeight: "60%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
