import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  // --- States ---
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const id = localStorage.getItem("wechat_id");
  const uid = localStorage.getItem("wechat_uid");
  // --- Effects ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (id && uid) {
          navigate("/chat");
        }
        navigate("/auth");
      }, 3500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-black select-none"
        >
          {/* Main Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-6 px-6 py-10 bg-white rounded-2xl border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] max-w-sm w-full mx-4 text-center z-10"
          >
            {/* Brand Logo / Icon Box */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl shadow-sm shadow-blue-600/10"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>

            {/* Brand Name & Tagline */}
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight text-black">
                Welcome to WeChat
              </h1>
              <p className="text-xs font-medium text-gray-500 max-w-60 mx-auto tracking-wide">
                Connect with your families and friends
              </p>
            </div>

            {/* Elegant Animated Loader */}
            <div className="mt-2 flex items-center justify-center gap-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  animate={{ y: ["0px", "-6px", "0px"] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.12,
                  }}
                  className={`w-2 h-2 rounded-full ${
                    index === 0
                      ? "bg-blue-600"
                      : index === 1
                        ? "bg-gray-400"
                        : "bg-black"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Footer Branding Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 text-[10px] text-gray-500 font-semibold tracking-widest uppercase"
          >
            Powered by Framer Motion
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
