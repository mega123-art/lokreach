import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const SignIn = () => {
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('Starting sign in process...');
      
      if (!form.email || !form.password) {
        throw new Error("Please fill in all fields");
      }

      const data = await login(form.email, form.password);
      const { user } = data;

      console.log('Sign in successful, redirecting user:', user);

      // Redirect based on user role
      if (user.role === "brand") {
        navigate("/brand");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "creator") {
        navigate("/creator");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoading || authLoading;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card">
          <div className="card-header text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your LocoLab account
            </p>
          </div>
          
          <div className="card-body">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Debug info in development */}
            {import.meta.env.DEV && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-600 text-xs">
                  API URL: {import.meta.env.VITE_API_URL}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-red-600 hover:text-red-700"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          
          <div className="card-footer text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;