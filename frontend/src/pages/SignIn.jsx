import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!form.email || !form.password) {
        throw new Error("Please fill in all fields");
      }

      const result = await login(form.email, form.password);
      
      // Redirect based on user role
      if (result.user.role === 'brand') {
        navigate('/brand');
      } else if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'creator') {
        navigate('/creator');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="h-screen bg-[#50142c] relative overflow-hidden flex items-center justify-center p-4">
      {/* Enhanced Dynamic Moving Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Large Moving Circles with Strong Motion */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full animate-pulse" style={{animationDuration: '1.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-white rounded-full animate-ping" style={{animationDuration: '2.5s'}}></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
        
        {/* Fast Rotating Elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-white rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-16 h-16 border-2 border-white rounded-full animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
        
        {/* Long Rotating Lines with Visible Motion */}
        <div className="absolute top-16 left-1/3 w-32 h-1 bg-white origin-left animate-spin" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-40 h-1 bg-white origin-right animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-1/6 w-28 h-1 bg-white origin-center animate-spin" style={{animationDuration: '5s'}}></div>
        <div className="absolute top-1/3 right-1/6 w-36 h-1 bg-white origin-center animate-spin" style={{animationDuration: '2.5s', animationDirection: 'reverse'}}></div>
        
        {/* Large Pulsing Dots */}
        <div className="absolute top-1/5 left-1/2 w-6 h-6 bg-white rounded-full animate-ping" style={{animationDuration: '1s'}}></div>
        <div className="absolute bottom-1/5 left-1/3 w-8 h-8 bg-white rounded-full animate-pulse" style={{animationDuration: '1.2s'}}></div>
        <div className="absolute top-2/3 right-1/5 w-5 h-5 bg-white rounded-full animate-bounce" style={{animationDuration: '1.8s'}}></div>
        <div className="absolute top-1/6 right-1/2 w-7 h-7 bg-white rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
        
        {/* Moving Squares with Rotation */}
        <div className="absolute top-32 left-32 w-12 h-12 border-2 border-white animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 border-2 border-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-white animate-spin" style={{animationDuration: '3s'}}></div>
        
        {/* Diagonal Moving Lines */}
        <div className="absolute top-24 right-24 w-32 h-1 bg-white rotate-45 animate-pulse" style={{animationDuration: '1s'}}></div>
        <div className="absolute bottom-24 left-24 w-28 h-1 bg-white -rotate-45 animate-ping" style={{animationDuration: '1.5s'}}></div>
        <div className="absolute top-1/3 left-1/5 w-24 h-1 bg-white rotate-12 animate-bounce" style={{animationDuration: '2s'}}></div>
        
        {/* Additional Fast Moving Elements */}
        <div className="absolute top-1/4 right-1/5 w-14 h-14 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/5 w-18 h-18 border-2 border-white rounded-full animate-ping" style={{animationDuration: '1.3s'}}></div>
        <div className="absolute top-3/5 left-3/5 w-20 h-20 border-2 border-white rounded-full animate-pulse" style={{animationDuration: '0.8s'}}></div>
        
        {/* Floating Particles with Strong Motion */}
        <div className="absolute top-1/6 left-2/3 w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDuration: '1.2s'}}></div>
        <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '1s'}}></div>
        <div className="absolute top-5/6 right-1/6 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDuration: '0.9s'}}></div>
        <div className="absolute top-1/2 right-1/8 w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDuration: '1.4s'}}></div>
        
        {/* Cross-shaped Moving Elements */}
        <div className="absolute top-40 left-40 w-8 h-2 bg-white animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-40 left-40 w-2 h-8 bg-white animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-40 right-40 w-6 h-1.5 bg-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
        <div className="absolute bottom-40 right-40 w-1.5 h-6 bg-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
      </div>

      {/* Enhanced Gradient Overlay for More Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#50142c] via-transparent to-[#50142c] opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#50142c]/20 to-[#50142c]/40"></div>

      {/* Compact Sign In Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100 backdrop-blur-lg bg-white/95">
          {/* Compact Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">Sign in to your LocoLab account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}

          {/* Compact Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none t9">
                <Mail className="h-4 w-4 text-gray-400 pl-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1 pl-4">
              <label className="block text-xs font-semibold text-gray-700 pl-4 py-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none t9 ">
                  <Lock className="h-4 w-4 text-gray-400 " />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-10 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center t10"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Compact Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#d20054] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#b0004a] focus:ring-4 focus:ring-[#d20054] focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6 t8"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Compact Footer Links */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-xs text-[#d20054] hover:text-[#b0004a] font-medium transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(90deg); }
          50% { transform: translateY(-60px) rotate(180deg); }
          75% { transform: translateY(-30px) rotate(270deg); }
        }
        
        @keyframes drift {
          0% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(20px) translateY(-10px); }
          50% { transform: translateX(0px) translateY(-20px); }
          75% { transform: translateX(-20px) translateY(-10px); }
          100% { transform: translateX(0px) translateY(0px); }
        }

        @keyframes zigzag {
          0% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(30px) translateY(-20px); }
          50% { transform: translateX(-30px) translateY(-40px); }
          75% { transform: translateX(30px) translateY(-20px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default SignIn;