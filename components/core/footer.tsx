import React from 'react';
import CustomButton from './button';

const Footer: React.FC = () => {
  return (
    <div className="bg-green2 text-white relative overflow-hidden min-h-[700px]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="max-w-xl max-h-100 object-contain"
          >
            <source src="/footer-vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
            {/* Gradient overlay from edges to center */}
            <div className="absolute inset-0 bg-gradient-to-r from-green2 via-green2/70  to-green2 opacity-100"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-green2 via-green2/20  to-green2 opacity-100"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green2/80 via-transparent to-green2/80 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-green2/80 via-transparent to-green2/80 opacity-60"></div>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="px-8 py-26 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Logo and Main Content */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <span className="text-white text-2xl font-serif">Digital Neighbour</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight">
                  <span className="italic">Let's Scale</span>
                  <br />
                  Your Brand.
                </h1>
                <p className="text-lg text-gray-300 font-sans max-w-md">
                  Feel free to reach out if you want to collaborate with us, or simply have a chat
                </p>
              </div>

              {/* CTA Button */}
              <CustomButton text="Start a Project" href="/contact" textColor="black" borderColor="black" />
            </div>

            {/* Right Side - Navigation and Social Links */}
            <div className="grid grid-cols-2 gap-16 ml-0 md:ml-auto">
              {/* Company Links */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-bold font-serif">Company</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">Home</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">Projects</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">About Us</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">Blog</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">Contact Us</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">404</a>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-bold font-serif">Follow Us</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">Facebook</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">Behance</a>
                  <a href="#" className="block text-gray-300 font-sans hover:text-white transition-colors">X/Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="py-8 px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side - Contact Information */}
          <div className="flex flex-col sm:flex-row space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-white font-sans">+1 234 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-white font-sans">hello@dn.com</span>
            </div>
          </div>

          {/* Right side - Copyright and Legal Links */}
          <div className="flex flex-col sm:flex-row items-center space-x-4 text-gray-400 font-sans">
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Privacy Policy</span>
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
