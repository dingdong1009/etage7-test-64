
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-[1481px] border-b mx-auto px-4 flex justify-between items-center h-16">
      <Link to="/" className="text-black text-2xl font-bold uppercase">ETAGE7</Link> 
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {[
              { name: "HOME", path: "/" },
              { name: "BRANDS", path: "/brands" },
              { name: "BUYERS", path: "/buyers" },
              { name: "SERVICES", path: "/services" },
              { name: "EVENTS", path: "/events" },
              { name: "RESOURCES", path: "/resources" },
              { name: "CURATED", path: "/curated" },
              { name: "LOGIN", path: "/login" },
              { name: "REGISTER", path: "/register" },
            ].map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className="text-sm font-light relative group hover:text-black"
                >
                  {item.name.toUpperCase()}
                  <span className="absolute left-0 bottom-[-3px] w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full">
          <ul className="flex flex-col p-4">
            {[
              { name: "HOME", path: "/" },
              { name: "BRANDS", path: "/brands" },
              { name: "BUYERS", path: "/buyers" },
              { name: "SERVICES", path: "/services" },
              { name: "EVENTS", path: "/events" },
              { name: "RESOURCES", path: "/resources" },
              { name: "CURATED", path: "/curated" },
              { name: "LOGIN", path: "/login" },
              { name: "REGISTER", path: "/register" },
            ].map((item) => (
              <li key={item.name} className="py-2 border-b border-gray-100">
                <Link 
                  to={item.path} 
                  className="text-black uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
