
import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Send, FileText, ShieldCheck, HelpCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-gray-200 pt-12 pb-8">
      <div className="max-w-[1481px] border-y mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          <div>
            <h3 className="uppercase font-bold text-lg mb-4">ETAGE7</h3>
            <p className="text-sm font-light mb-6">
              Connecting professional buyers and fashion brands through a premium 
              platform with curated experiences and tailored consulting services.
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/etage7" aria-label="Telegram" className="text-black hover:underline">
                <Send size={20} />
              </a>
              <a href="https://wa.me/etage7" aria-label="WhatsApp" className="text-black hover:underline">
                <MessageCircle size={20} />
              </a>
              <a href="https://instagram.com/etage7" aria-label="Instagram" className="text-black hover:underline">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li><Link to="/brands" className="text-sm hover:underline">For Brands</Link></li>
              <li><Link to="/buyers" className="text-sm hover:underline">For Buyers</Link></li>
              <li><Link to="/services" className="text-sm hover:underline">Services</Link></li>
              <li><Link to="/events" className="text-sm hover:underline">Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase font-bold mb-4">LEGAL</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm hover:underline flex items-center gap-2">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:underline flex items-center gap-2">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:underline flex items-center gap-2">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase font-bold mb-4">CONTACT</h4>
            <p className="text-sm mb-2">Email: info@etage7.com</p>
            <p className="text-sm mb-2">Phone: +33 (0) 1 XX XX XX XX</p>
            <p className="text-sm">Paris, France</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ETAGE7. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
