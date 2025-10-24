import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from "react";

export const Overview = ({ onViewPatients }: { onViewPatients?: () => void }) => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-4 relative"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 flex flex-col gap-6 leading-relaxed text-center max-w-2xl mx-auto relative z-10 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <motion.div
            className="inline-flex items-center justify-center gap-2 mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Healthcare AI</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold text-foreground tracking-tight"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(0, 255, 255, 0)",
                "0 0 20px rgba(0, 255, 255, 0.1)",
                "0 0 20px rgba(0, 255, 255, 0)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            DeepScribe
          </motion.h1>
          
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            Project for Healthcare Documentation
          </p>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-base text-muted-foreground leading-relaxed max-w-lg mx-auto"
        >
          An intelligent AI assistant designed for medical documentation, patient data insights, 
          and streamlined healthcare workflows.
        </motion.p>


        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-3 justify-center"
        >
          {onViewPatients && (
            <Button
              onClick={onViewPatients}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/40 transition-all border-0 rounded-lg font-semibold"
            >
              View Patient Records
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="pt-6 border-t border-border/50"
        >
          <motion.p 
            className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Start typing below to begin
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};
