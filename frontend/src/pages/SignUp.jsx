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
  const [usernameError, setUsernameError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Reset username states when username changes
    if (e.target.name === "username") {
      setUsernameAvailable(null);
      setUsernameError("");
    }
    
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const validateUsername = (username) => {
    if (!username) return "Username is required";
    
    const normalizedUsername = username.toLowerCase().trim();
    
    if (normalizedUsername.length < 3) {
      return "Username must be at least 3 characters long";
    }
    
    if (normalizedUsername.length > 30) {
      return "Username must be less than 30 characters";
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    
    return null;
  };

  const checkUsername = async () => {
    if (!form.username || form.role !== 'creator') return;
    
    // Validate username format first
    const validationError = validateUsername(form.username);
    if (validationError) {
      setUsernameError(validationError);
      setUsernameAvailable(false);
      return;
    }

    setCheckingUsername(true);
    setUsernameError("");
    
    try {
      console.log('Checking username availability:', form.username);
      const normalizedUsername = form.username.toLowerCase().trim();
      
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/check-username?value=${encodeURIComponent(normalizedUsername)}`,
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
      
      if (!res.data.available) {
        setUsernameError("Username is already taken");
      }
    } catch (err) {
      console.error("Username check error:", err);
      setUsernameError(err.response?.data?.error || "Error checking username availability");
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

    if (form.role === 'creator') {
      const usernameValidation = validateUsername(form.username);
      if (usernameValidation) {
        return usernameValidation;
      }
      
      if (usernameAvailable === false) {
        return "Please choose a different username";
      }
      
      if (usernameAvailable === null && form.username) {
        return "Please wait for username availability check";
      }
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
      
      // Normalize form data before sending
      const normalizedForm = {
        ...form,
        email: form.email.toLowerCase().trim(),
        username: form.role === 'creator' ? form.username.toLowerCase().trim() : undefined,
        contactEmail: form.role === 'creator' ? form.contactEmail.toLowerCase().trim() : undefined,
      };
      
      console.log('Form data:', { ...normalizedForm, password: '[HIDDEN]' });
      
      const apiUrl = `${import.meta.env.VITE_API_URL}/auth/signup`;
      console.log('Full URL:', apiUrl);

      const response = await axios.post(apiUrl, normalizedForm, {
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
      setUsernameError("");
      
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
        const responseError = err.response.data?.error || 'Email or username already exists';
        const field = err.response.data?.field;
        
        if (field === 'username') {
          setUsernameError("Username is already taken");
          setUsernameAvailable(false);
          errorMessage = "Username is already taken. Please choose a different one.";
        } else if (field === 'email') {
          errorMessage = "Email is already in use. Please use a different email address.";
        } else {
          errorMessage = responseError;
        }
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
            <p className="text-gray-600">Join LocoLab and start connecting</p>
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
                        className={`form-input ${usernameError ? 'border-red-300' : ''}`}
                        placeholder="Choose a unique username (3-30 characters)"
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
                    
                    {usernameError && (
                      <p className="form-error">✗ {usernameError}</p>
                    )}
                    
                    {!usernameError && usernameAvailable === true && (
                      <p className="form-success">✓ Username is available</p>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      3-30 characters, letters, numbers, and underscores only
                    </p>
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
                disabled={
                  isLoading || 
                  checkingUsername ||
                  (form.role === 'creator' && (usernameAvailable === false || usernameError))
                }
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
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-red-600 hover:text-red-700 font-medium"
              >
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