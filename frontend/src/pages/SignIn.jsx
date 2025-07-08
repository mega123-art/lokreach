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
}