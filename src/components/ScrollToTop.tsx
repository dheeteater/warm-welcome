import { useEffect, useState } from "react";

/**
 * Fixed scroll-to-top button.
 *
 * Hidden (opacity-0 scale-0 pointer-events-none) until the user scrolls past
 * roughly one viewport height, then fades and scales in. Reverses on scroll
 * back up. Click smooth-scrolls to the top of the page.
 *
 * Scroll position is measured from the top of the whole page (window.scrollY),
 * not from any specific section, so it stays correct regardless of hero height.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Threshold: roughly one viewport height from the top of the page.
      setVisible(window.scrollY > window.innerHeight);
    };

    // Set initial state in case the page loads already scrolled.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-[#3F4C6B] text-white shadow-lg flex items-center justify-center transition-all duration-500 ease-in-out transform [will-change:transform,opacity] hover:bg-[#2d3a58] ${
        visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-0 pointer-events-none"
      }`}
    >
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"></path>
      </svg>
    </button>
  );
}
