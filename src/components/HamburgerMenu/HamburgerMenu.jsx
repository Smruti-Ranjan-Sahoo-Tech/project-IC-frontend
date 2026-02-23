const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className="md:hidden flex flex-col gap-1.5 p-2 z-41"
      onClick={toggleMenu}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <span className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-100 rounded transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
      <span className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-100 rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
      <span className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-100 rounded transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
    </button>
  )
}

export default HamburgerMenu
