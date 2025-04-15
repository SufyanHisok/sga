'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LogoIcon from '@/assets/icons/grocery-icon.png';

const MobileSplash = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (!isMobile) return;

    const timer = setTimeout(() => {
      setFadeOut(true); // trigger fade to white
      setTimeout(() => setVisible(false), 1000); // hide after fade
    }, 3500);

    return () => clearTimeout(timer);
  }, [isMobile]);

  if (!visible || !isMobile) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ backgroundColor: '#2563eb', opacity: 1 }}
        animate={{
          backgroundColor: fadeOut ? '#ffffff' : '#2563eb',
          opacity: fadeOut ? 0 : 1,
        }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center justify-center relative">
          {/* Static Text */}
          <motion.h1
            className="text-white text-2xl font-semibold mt-1"
            initial={{ x: 0 }}
            animate={{ x: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Smart <span className="text-green-500">Grocery</span>
          </motion.h1>

          {/* Logo - fades in and slides to the left */}
          <motion.div
            className="absolute left-[-25px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Image src={LogoIcon} alt="Logo" className="w-9 h-9" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileSplash;
