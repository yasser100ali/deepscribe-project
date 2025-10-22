"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { GitIcon } from "./icons";

export const Navbar = () => {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Initials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center relative"
          >
            <div 
              onClick={handleLogoClick}
              className="relative px-3 py-1 border border-primary/40 bg-primary/5 font-mono font-bold text-primary tracking-wider hover:border-primary/60 hover:bg-primary/10 transition-all cursor-pointer"
            >
              [YA]
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-6"
          >
            <span className="text-lg font-mono font-semibold text-foreground tracking-wide">
              DeepScribe Healthcare Assistant
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <a 
              href="https://github.com/yasser100ali/deepscribe-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button 
                variant="ghost" 
                size="icon"
                className="border border-border hover:border-primary/50 hover:bg-accent hover:text-primary transition-all"
              >
                <GitIcon />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
