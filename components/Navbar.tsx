import React from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className="w-full z-50 border-b border-purple-500/20 bg-purple-950/30 backdrop-blur-lg fixed top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Zap className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              ZenZai
            </span>
          </Link>

          {/* signout Button */}
          <SignOutButton redirectUrl='/'>
            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded'>
                Log Out
            </button>
          </SignOutButton>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;