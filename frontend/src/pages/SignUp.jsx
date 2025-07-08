import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Phone, Instagram, User, MapPin, Globe, Check } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './SignIn.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: "creator",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    mobileNumber: "",
    instaHandle: "",
    country: "",
    state: "",
    city: "",
    brandName: "",
    businessContact: "",
    businessNiche: "",
    website: "",
    acceptTerms: false
  });
}