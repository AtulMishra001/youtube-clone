import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <img
        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
        alt="Not Found"
        className="w-40 mb-6"
      />
      <h1 className="text-2xl font-bold text-white mb-2">
        This page isn't available.
      </h1>
      <p className="text-yt-text-secondary mb-6">
        The link you followed may be broken, or the page may not have been build yet.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-yt-blue text-black font-bold rounded-full hover:bg-blue-500 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
