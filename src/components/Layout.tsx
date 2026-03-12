import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("py-20 px-6 max-w-7xl mx-auto", className)}
    >
      {children}
    </motion.section>
  );
};

export const FloatingItem = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      className={cn("absolute pointer-events-none", className)}
    >
      {children}
    </motion.div>
  );
};
