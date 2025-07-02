import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
  {/* 3D Logo Box */}
  <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.2),_4px_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center transform-gpu">
    <MessageSquare className="w-6 h-6 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
  </div>

  {/* App Name */}
  <h1 className="text-xl font-bold text-base-content tracking-wider drop-shadow-md">
    Social Sphere
  </h1>
</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;