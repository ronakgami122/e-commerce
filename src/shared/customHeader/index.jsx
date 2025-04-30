import React from "react";
import CustomInput from "../customInput";

const Header = () => {
  return (
    <header>
      {/* Top Bar */}
      <div className="bg-purple text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
          {/* Left */}
          <div className="flex gap-8">
            <span>Email</span>
            <span>Phone_Number</span>
          </div>
          {/* Right */}
          <div className="flex gap-6 items-center">
            <span>Login</span>
            <span>Wishlist</span>
            <span>Shop_Icon</span>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mx-auto">
          <span className="text-5xl font-bold">Hekto</span>
        </div>
        <div className="gap-8 flex">
          <span>Home</span>
          <span>Pages</span>
          <span>Products</span>
          <span>Blog</span>
          <span>shop</span>
          <span>Contact</span>
        </div>
        <div className="mx-auto">input_field</div>
      </div>
    </header>
  );
};

export default Header;
