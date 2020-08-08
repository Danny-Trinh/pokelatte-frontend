import React, { Component } from "react";
import { motion } from "framer-motion";
export default class ProgressBar extends Component {
  render() {
    return (
      <div className="w-24 h-2 bg-red-600 rounded-full self-end">
        <motion.div
          className="bg-green-500 h-2 rounded-full"
          animate={{ width: this.props.percent + "%" }}
          transition={{ duration: 2 }}
        />
      </div>
    );
  }
}
