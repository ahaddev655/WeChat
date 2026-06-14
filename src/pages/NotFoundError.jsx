import { Link } from "react-router-dom";
import errorImage from "../assets/error.jpg";

function NotFoundError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-6 py-12">
      <div className="max-w-4xl w-full grid md:grid-cols-2 grid-cols-1 gap-8 items-center">
        {/* Image Container with a subtle floating animation */}
        <div className="md:order-2 flex justify-center animate-pulse">
          <img
            src={errorImage}
            alt="Page Not Found"
            className="max-w-sm w-full drop-shadow-2xl object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col justify-center md:text-start text-center space-y-6">
          <div>
            <span className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
              Error Code
            </span>
            <h1 className="text-7xl md:text-8xl font-black text-gray-900 tracking-tight leading-none mt-1">
              404
            </h1>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Oops! Page not found.
            </h3>
            <p className="text-gray-600 max-w-md mx-auto md:mx-0">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-800 hover:bg-blue-900 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Go Back Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
            >
              Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundError;
