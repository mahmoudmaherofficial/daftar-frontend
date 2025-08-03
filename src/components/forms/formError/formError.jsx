import { motion } from "framer-motion";

const FormError = ({ children }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="text-red-400 text-xs mb-1 ml-2">
      {children}
    </motion.p>
  );
};

export default FormError;
