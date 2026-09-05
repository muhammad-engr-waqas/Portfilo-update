import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "923069377493",
  defaultMessage = "Hello Muhammad Waqas! I saw your portfolio and would like to connect.",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {/* Tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-background/95 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl border border-border/60 pointer-events-none hidden sm:flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat on WhatsApp</span>
            <span className="text-emerald-500">💬</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#4ade80] text-white shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] flex items-center justify-center transition-shadow duration-300 group cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (+92 306 9377493)"
      >
        <WhatsAppIcon className="w-7 h-7 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />

        {/* Pulse effect badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white dark:border-gray-900"></span>
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
