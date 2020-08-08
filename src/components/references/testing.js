import { motion } from "framer-motion";
import React, { Component } from "react";

export const MyComponent = () => (
  <motion.div
    className="bg-red-800 w-24 h-24"
    animate={{ scale: 2 }}
    transition={{ duration: 0.5 }}
  ></motion.div>
);
