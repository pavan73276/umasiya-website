import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-500 mb-6">
          Please select your login type
        </p>

        <div className="flex flex-col gap-4">
          {/* Admin Login */}
          <Link to="/login?role=admin">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
              Login as Admin
            </button>
          </Link>

          {/* Staff Login */}
          <Link to="/login?role=staff">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
              Login as Staff
            </button>
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Your Company
        </p>
      </div>
    </div>
  );
}
