// components/NotFound.tsx
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { Button } from "../ui/button";

interface NotFoundProps {
  message?: string;
}

export default function NotFound({ message }: NotFoundProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center items-center gap-4 min-h-screen"
    >
      <h1 className="font-bold text-4xl">404 - Page Not Found</h1>
      <p className="...">
        {message ||
          "The page you're looking for doesn't exist or has been moved."}
      </p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </motion.div>
  );
}
