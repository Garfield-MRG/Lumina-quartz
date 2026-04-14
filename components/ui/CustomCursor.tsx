"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useSpring(0, { stiffness: 500, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 35 });
  const dotX = useSpring(0, { stiffness: 800, damping: 40 });
  const dotY = useSpring(0, { stiffness: 800, damping: 40 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const addHoverListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setIsHovering(true));
          el.addEventListener("mouseleave", () => setIsHovering(false));
        });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-quartz"
          animate={{
            width: isHovering ? 56 : 36,
            height: isHovering ? 56 : 36,
            opacity: isHovering ? 0.9 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-quartz"
          animate={{
            width: isHovering ? 8 : 4,
            height: isHovering ? 8 : 4,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
