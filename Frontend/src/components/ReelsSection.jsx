const dummyReels = [
  { id: 1, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Exploring AI 🤖" },
  { id: 2, videoUrl: "https://www.w3schools.com/html/movie.mp4", title: "React Tips & Tricks ⚛️" },
  { id: 3, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", title: "TailwindCSS Magic ✨" },
];

const ReelsSection = () => {
  return (
    <div className="flex flex-col space-y-4 p-4 h-full">
      <h2 className="text-lg font-bold text-center mb-2 text-base-content">🔥 Reels</h2>
      <div className="space-y-6">
        {dummyReels.map((reel) => (
          <div key={reel.id} className="rounded-xl overflow-hidden shadow-md">
            <video
              src={reel.videoUrl}
              controls
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-sm text-center mt-2 text-base-content/80">{reel.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsSection;
