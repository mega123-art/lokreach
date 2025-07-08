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
    // Prepare data for API
    const signupData = {
      email: form.email,
      password: form.password,
      role: form.role,
    };

    // Add role-specific fields
    if (form.role === 'creator') {
      signupData.username = form.username;
      signupData.mobileNumber = form.mobileNumber;
      signupData.instaHandle = form.instaHandle;
      signupData.country = form.country;
      signupData.state = form.state;
      signupData.city = form.city;
    } else if (form.role === 'brand') {
      signupData.brandName = form.brandName;
      signupData.businessContact = form.businessContact;
      signupData.businessNiche = form.businessNiche;
      if (form.instaHandle) signupData.instaHandle = form.instaHandle;
      if (form.website) signupData.website = form.website;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      signupData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      }
    );
    
    setSuccess("Account created successfully! Redirecting to sign in...");
    
    // Reset form
    setForm({
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

    // Redirect to sign in after 2 seconds
    setTimeout(() => {
      navigate('/signin');
    }, 2000);
    
  } catch (err) {
    console.error("Signup error:", err);
    if (err.response?.data?.error) {
      setError(err.response.data.error);
    } else if (err.code === 'ECONNABORTED') {
      setError('Request timeout - please check your connection and try again');
    } else if (err.code === 'ERR_NETWORK') {
      setError('Network error - unable to connect to server');
    } else {
      setError('Signup failed - please try again');
    }
  } finally {
    setIsLoading(false);
  }
};