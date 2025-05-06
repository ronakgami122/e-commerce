import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../../components/cartCard";
import { COLORS } from "../../utils/colors";
import { removeFromCart, updateQuantity } from "../../redux/slices/cart.slice";
import CustomButton from "../../shared/customButton";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handlePayment = () => {
    // Payment handling logic here
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: COLORS.text, fontWeight: 600 }}
      >
        Shopping Cart ({cartItems.length} items)
      </Typography>

      <Grid container spacing={3}>
        {cartItems.map((product) => (
          <Grid xs={12} sm={6} md={4} key={product.id}>
            <CartCard
              item={product}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          </Grid>
        ))}
      </Grid>

      {cartItems.length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "#fff",
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" className="text">
            Total Amount:
          </Typography>
          <Typography variant="h5" color={COLORS.pink} fontWeight="bold">
            ${totalAmount.toFixed(2)}
          </Typography>
          <CustomButton onClick={handlePayment}>Pay Now</CustomButton>
        </Box>
      )}

      {cartItems.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" className="text">
            Your cart is empty
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
