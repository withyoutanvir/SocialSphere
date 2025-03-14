const AuthImagePattern = ({ title, subtitle }) => {
  // Array of Tailwind background colors
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-orange-400",
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Animated Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                colors[i % colors.length] // Assign color in a loop
              } ${i % 2 === 0 ? "animate-pulse" : "animate-float"}`}
            />
          ))}
        </div>

        {/* Animated Heading */}
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-fadeIn">
          {title}
        </h2>
        <p className="text-base-content/60 animate-fadeIn delay-200">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

