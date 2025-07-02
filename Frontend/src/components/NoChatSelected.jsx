import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="relative w-full flex flex-1 items-center justify-center p-16 bg-[#0f172a] text-white overflow-hidden">
      {/* 🎨 Glowing Animated Blobs */}
      <div className="absolute w-72 h-72 bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-600 rounded-full opacity-30 animate-blob blur-3xl top-[-6rem] left-[-6rem]" />
      <div className="absolute w-80 h-80 bg-gradient-to-tr from-indigo-500 via-violet-600 to-purple-700 rounded-full opacity-30 animate-blob animation-delay-2000 blur-3xl bottom-[-5rem] right-[-6rem]" />
      <div className="absolute w-72 h-72 bg-gradient-to-tr from-purple-500 via-indigo-600 to-pink-500 rounded-full opacity-20 animate-blob animation-delay-4000 blur-3xl top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2" />

      {/* ✨ Floating Chat Icons */}
      <MessageSquare className="absolute top-16 left-1/4 text-pink-500 opacity-10 animate-float-slow w-10 h-10" />
      <MessageSquare className="absolute bottom-20 right-1/4 text-indigo-500 opacity-10 animate-float-fast w-8 h-8" />

      {/* 🌀 Pulsing Rings */}
      <div className="absolute w-36 h-36 border-4 border-fuchsia-500 rounded-full top-[30%] left-[10%] opacity-20 animate-pulse-ring" />
      <div className="absolute w-24 h-24 border-2 border-indigo-400 rounded-full bottom-[20%] right-[10%] opacity-20 animate-pulse-ring delay-[2000ms]" />

      {/* ✍️ Centered Content */}
      <div className="relative z-10 max-w-md text-center space-y-6 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.2),_4px_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center transform-gpu hover:scale-105 transition-all duration-300">
            <MessageSquare className="w-10 h-10 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        <h2 className="typewriter-heading text-3xl font-extrabold text-white tracking-wide drop-shadow-sm text-center">
  Dive Into Your First Conversation!
</h2>


        <p className="text-white/70 text-lg leading-relaxed">
          Select someone from the left and ignite your chat journey with Social Sphere 💬
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

