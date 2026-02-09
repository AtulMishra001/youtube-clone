const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      {/* YouTube-style Red Spinner */}
      <div className="w-10 h-10 border-4 border-yt-light-gray border-t-yt-red rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
