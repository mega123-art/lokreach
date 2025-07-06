import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "creator",
    email: "",
    password: "",
    username: "",
    contactEmail: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "username") setUsernameAvailable(null);
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const checkUsername = async () => {
    if (!form.username || form.role !== 'creator') return;
    
    setCheckingUsername(true);
    try {
      console.log('Checking username availability:', form.username);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/check-username?value=${form.username}`,
        { 
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );
      console.log('Username check result:', res.data);
      setUsernameAvailable(res.data.available);
    } catch (err) {
      console.error("Username check error:", err);
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const validateForm = () => {
    if (!form.email || !form.password || !form.role) {
      return "Please fill in all required fields";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (form.role === 'creator' && !form.username) {
      return "Username is required for creators";
    }

    if (form.role === 'creator' && !form.contactEmail) {
      return "Contact email is required for creators";
    }

    if (form.role === 'creator' && usernameAvailable === false) {
      return "Please choose a different username";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Please enter a valid email address";
    }

    if (form.role === 'creator' && !emailRegex.test(form.contactEmail)) {
      return "Please enter a valid contact email address";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      console.log('=== SIGNUP ATTEMPT ===');
      console.log('API URL:', import.meta.env.VITE_API_URL);
      console.log('Form data:', { ...form, password: '[HIDDEN]' });
      
      const apiUrl = `${import.meta.env.VITE_API_URL}/auth/signup`;
      console.log('Full URL:', apiUrl);

      const response = await axios.post(apiUrl, form, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 15000,
        withCredentials: false,
      });

      console.log('Signup successful:', response.data);
      
      setSuccess("Account created successfully! Redirecting to sign in...");
      
      // Reset form
      setForm({
        role: "creator",
        email: "",
        password: "",
        username: "",
        contactEmail: "",
      });
      setUsernameAvailable(null);
      
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      
    } catch (err) {
      console.error("=== SIGNUP ERROR ===");
      console.error('Error object:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      
      let errorMessage = "Signup failed - please try again";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout - please check your connection and try again';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Network error - unable to connect to server';
      } else if (err.response?.status === 409) {
        errorMessage = err.response.data?.error || 'Email or username already exists';
      } else if (err.response?.status === 400) {
        errorMessage = err.response.data?.error || 'Invalid input - please check your information';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.request) {
        errorMessage = 'Unable to connect to server - please check your internet connection';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card">
          <div className="card-header text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join LocoLab and start connecting
            </p>
          </div>
          
          <div className="card-body">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            {/* Debug info in development */}
            {import.meta.env.DEV && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-600 text-xs">
                  API URL: {import.meta.env.VITE_API_URL}
                </p>
                <p className="text-blue-600 text-xs">
                  Environment: {import.meta.env.MODE}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">I am a *</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="form-select"
                  disabled={isLoading}
                  required
                >
                  <option value="creator">Content Creator</option>
                  <option value="brand">Brand</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a strong password (min 6 characters)"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              {form.role === "creator" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Username *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        onBlur={checkUsername}
                        className="form-input"
                        placeholder="Choose a unique username"
                        required
                        disabled={isLoading}
                        pattern="[a-zA-Z0-9_]+"
                        title="Username can only contain letters, numbers, and underscores"
                      />
                      {checkingUsername && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <LoadingSpinner size="sm" />
                        </div>
                      )}
                    </div>
                    {usernameAvailable === true && (
                      <p className="form-success">✓ Username is available</p>
                    )}
                    {usernameAvailable === false && (
                      <p className="form-error">✗ Username is already taken</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Email *</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={form.contactEmail}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Public email for brand contacts"
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This email will be visible to brands who want to contact you
                    </p>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={isLoading || (form.role === 'creator' && usernameAvailable === false)}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>
          
          <div className="card-footer text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-red-600 hover:text-red-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;