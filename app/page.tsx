import React from 'react';
import Link from 'next/link';
import { ChevronRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-purple-900/10 opacity-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <header className="relative z-10 container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <Zap className="text-purple-400 mr-2" />
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ZenZai
          </span>
        </div>
        <nav className="space-x-6">
          <Link href="#" className="text-purple-200 hover:text-white transition-colors">Features</Link>
          <Link href="#" className="text-purple-200 hover:text-white transition-colors">About</Link>
        </nav>
      </header>

      <main className="relative z-10 flex-grow container mx-auto px-6 flex items-center justify-center">
        <div className="text-center max-w-3xl relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>
          <h1 className="md:text-6xl text-4xl font-extrabold mb-6 relative z-20 leading-tight">
            Intelligent Conversations, 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Powered by ZenZai AI
            </span>
          </h1>
          <p className="text-xl text-purple-100 mb-12 relative z-20">
            Experience next-generation conversational intelligence with advanced natural language processing and personalized interactions.
          </p>
          <Link
            href="/chat" 
            className="relative z-20 inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full 
            hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Launch ZenZai
            <ChevronRight className="ml-2" strokeWidth={3} />
          </Link>
        </div>
      </main>

      <footer className="relative z-10 container mx-auto px-6 py-5 text-center text-purple-300">
        <p>© 2025 ZenZai Technologies. Empowering Conversations.</p>
      </footer>
    </div>
  );
}
