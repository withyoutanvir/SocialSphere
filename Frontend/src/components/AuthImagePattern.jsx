const AuthImagePattern = ({ title, subtitle }) => {
  const animations = [
    "animate-cycle1",
    "animate-cycle2",
    "animate-cycle3",
    "animate-cycle4",
    "animate-cycle5",
    "animate-cycle1",
    "animate-cycle2",
    "animate-cycle3",
    "animate-cycle4",
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {animations.map((anim, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${anim}`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
