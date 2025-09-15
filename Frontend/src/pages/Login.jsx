import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white font-semibold">
            Login
          </button>
        </form>
        <p className="text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
