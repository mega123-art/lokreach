// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, Phone, Instagram, User, MapPin, Globe, Check } from 'lucide-react';
// import './SignIn.css';

// const SignUp = () => {
//   const [form, setForm] = useState({
//     role: "creator",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobileNumber: "",
//     instagramHandle: "",
//     country: "",
//     state: "",
//     city: "",
//     brandName: "",
//     businessContact: "",
//     niche: "",
//     website: "",
//     acceptTerms: false
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({ 
//       ...prev, 
//       [name]: type === 'checkbox' ? checked : value 
//     }));
    
//     // Clear errors when user starts typing
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     const baseFields = ['email', 'password', 'confirmPassword'];
//     const creatorFields = ['mobileNumber', 'instagramHandle', 'country', 'state', 'city'];
//     const brandFields = ['brandName', 'businessContact', 'niche'];
    
//     const requiredFields = form.role === 'creator' 
//       ? [...baseFields, ...creatorFields]
//       : [...baseFields, ...brandFields];
    
//     const missingFields = requiredFields.filter(field => !form[field]);
    
//     if (missingFields.length > 0) {
//       return "Please fill in all required fields";
//     }

//     if (form.password.length < 6) {
//       return "Password must be at least 6 characters long";
//     }

//     if (form.password !== form.confirmPassword) {
//       return "Passwords do not match";
//     }

//     if (!form.acceptTerms) {
//       return "Please accept the terms and conditions";
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.email)) {
//       return "Please enter a valid email address";
//     }

//     // Mobile number validation (basic)
//     const mobileRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
//     if (!mobileRegex.test(form.mobileNumber)) {
//       return "Please enter a valid mobile number";
//     }

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     // Validate form
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       console.log("Starting signup process...");
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       console.log("Signup successful:", { ...form, password: "[HIDDEN]", confirmPassword: "[HIDDEN]" });
      
//       setSuccess("Account created successfully! Welcome to LocoLab!");
      
//       // Reset form
//       setForm({
//         role: "creator",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         mobileNumber: "",
//         instagramHandle: "",
//         country: "",
//         state: "",
//         city: "",
//         brandName: "",
//         businessContact: "",
//         niche: "",
//         website: "",
//         acceptTerms: false
//       });
      
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError(err.message || "Signup failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#50142c] relative overflow-hidden flex items-center justify-center p-4">
//       {/* Enhanced Dynamic Moving Background */}
//       <div className="absolute inset-0 opacity-20">
//         {/* Large Moving Circles with Strong Motion */}
//         <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '2s'}}></div>
//         <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full animate-pulse" style={{animationDuration: '1.5s'}}></div>
//         <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-white rounded-full animate-ping" style={{animationDuration: '2.5s'}}></div>
//         <div className="absolute bottom-10 right-10 w-36 h-36 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
        
//         {/* Fast Rotating Elements */}
//         <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-white rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
//         <div className="absolute top-3/4 right-1/4 w-16 h-16 border-2 border-white rounded-full animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
//         <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
        
//         {/* Long Rotating Lines with Visible Motion */}
//         <div className="absolute top-16 left-1/3 w-32 h-1 bg-white origin-left animate-spin" style={{animationDuration: '4s'}}></div>
//         <div className="absolute bottom-16 right-1/3 w-40 h-1 bg-white origin-right animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
//         <div className="absolute top-1/2 left-1/6 w-28 h-1 bg-white origin-center animate-spin" style={{animationDuration: '5s'}}></div>
//         <div className="absolute top-1/3 right-1/6 w-36 h-1 bg-white origin-center animate-spin" style={{animationDuration: '2.5s', animationDirection: 'reverse'}}></div>
        
//         {/* Large Pulsing Dots */}
//         <div className="absolute top-1/5 left-1/2 w-6 h-6 bg-white rounded-full animate-ping" style={{animationDuration: '1s'}}></div>
//         <div className="absolute bottom-1/5 left-1/3 w-8 h-8 bg-white rounded-full animate-pulse" style={{animationDuration: '1.2s'}}></div>
//         <div className="absolute top-2/3 right-1/5 w-5 h-5 bg-white rounded-full animate-bounce" style={{animationDuration: '1.8s'}}></div>
//         <div className="absolute top-1/6 right-1/2 w-7 h-7 bg-white rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
        
//         {/* Moving Squares with Rotation */}
//         <div className="absolute top-32 left-32 w-12 h-12 border-2 border-white animate-spin" style={{animationDuration: '2s'}}></div>
//         <div className="absolute bottom-32 right-32 w-16 h-16 border-2 border-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
//         <div className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-white animate-spin" style={{animationDuration: '3s'}}></div>
        
//         {/* Diagonal Moving Lines */}
//         <div className="absolute top-24 right-24 w-32 h-1 bg-white rotate-45 animate-pulse" style={{animationDuration: '1s'}}></div>
//         <div className="absolute bottom-24 left-24 w-28 h-1 bg-white -rotate-45 animate-ping" style={{animationDuration: '1.5s'}}></div>
//         <div className="absolute top-1/3 left-1/5 w-24 h-1 bg-white rotate-12 animate-bounce" style={{animationDuration: '2s'}}></div>
        
//         {/* Additional Fast Moving Elements */}
//         <div className="absolute top-1/4 right-1/5 w-14 h-14 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '1s'}}></div>
//         <div className="absolute bottom-1/4 left-1/5 w-18 h-18 border-2 border-white rounded-full animate-ping" style={{animationDuration: '1.3s'}}></div>
//         <div className="absolute top-3/5 left-3/5 w-20 h-20 border-2 border-white rounded-full animate-pulse" style={{animationDuration: '0.8s'}}></div>
        
//         {/* Floating Particles with Strong Motion */}
//         <div className="absolute top-1/6 left-2/3 w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDuration: '1.2s'}}></div>
//         <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '1s'}}></div>
//         <div className="absolute top-5/6 right-1/6 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDuration: '0.9s'}}></div>
//         <div className="absolute top-1/2 right-1/8 w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDuration: '1.4s'}}></div>
        
//         {/* Cross-shaped Moving Elements */}
//         <div className="absolute top-40 left-40 w-8 h-2 bg-white animate-spin" style={{animationDuration: '2s'}}></div>
//         <div className="absolute top-40 left-40 w-2 h-8 bg-white animate-spin" style={{animationDuration: '2s'}}></div>
//         <div className="absolute bottom-40 right-40 w-6 h-1.5 bg-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
//         <div className="absolute bottom-40 right-40 w-1.5 h-6 bg-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
//       </div>

//       {/* Enhanced Gradient Overlay for More Depth */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#50142c] via-transparent to-[#50142c] opacity-40"></div>
//       <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#50142c]/20 to-[#50142c]/40"></div>

//       {/* Wide Sign Up Card */}
//       <div className="relative z-10 w-full max-w-4xl">
//         <div className="bg-gradient-to-br from-white/95 to-gray-50/95 rounded-xl shadow-2xl p-8 border border-gray-200 backdrop-blur-lg">
//           {/* Header */}
//           <div className="text-center mb-8 bg-gradient-to-r from-[#50142c] to-[#d20054] rounded-lg p-6 shadow-lg">
//             <h1 className="text-3xl font-bold text-white mb-2 t11">
//               Join LocoLab
//             </h1>
//             <p className="text-gray-100 t11">Create your account and start connecting</p>
//           </div>

//           {/* Error/Success Messages */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600 text-sm">{error}</p>
//             </div>
//           )}

//           {success && (
//             <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <p className="text-green-600 text-sm">{success}</p>
//             </div>
//           )}

//           {/* Sign Up Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Role Selection - Enhanced */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-[#50142c]">
//                 I am a *
//               </label>
//               <div className="grid grid-cols-2 gap-4">
//                 <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
//                   form.role === 'creator' 
//                     ? 'border-[#d20054] bg-gradient-to-br from-[#d20054]/10 to-[#50142c]/5 shadow-md' 
//                     : 'border-gray-300 hover:border-[#d20054]/50 hover:bg-gray-50'
//                 }`}>
//                   <input
//                     type="radio"
//                     name="role"
//                     value="creator"
//                     checked={form.role === 'creator'}
//                     onChange={handleChange}
//                     className="sr-only"
//                     disabled={isLoading}
//                   />
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                       form.role === 'creator' 
//                         ? 'border-[#d20054] bg-[#d20054]' 
//                         : 'border-gray-300'
//                     }`}>
//                       {form.role === 'creator' && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                     </div>
//                     <div>
//                       <div className="font-semibold text-[#50142c]">Content Creator</div>
//                       <div className="text-sm text-gray-700">I create content and want to work with brands</div>
//                     </div>
//                   </div>
//                 </label>
                
//                 <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
//                   form.role === 'brand' 
//                     ? 'border-[#d20054] bg-gradient-to-br from-[#d20054]/10 to-[#50142c]/5 shadow-md' 
//                     : 'border-gray-300 hover:border-[#d20054]/50 hover:bg-gray-50'
//                 }`}>
//                   <input
//                     type="radio"
//                     name="role"
//                     value="brand"
//                     checked={form.role === 'brand'}
//                     onChange={handleChange}
//                     className="sr-only"
//                     disabled={isLoading}
//                   />
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                       form.role === 'brand' 
//                         ? 'border-[#d20054] bg-[#d20054]' 
//                         : 'border-gray-300'
//                     }`}>
//                       {form.role === 'brand' && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                     </div>
//                     <div>
//                       <div className="font-semibold text-[#50142c]">Brand</div>
//                       <div className="text-sm text-gray-700">I represent a brand and want to find creators</div>
//                     </div>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Three Column Layout for Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 t12">
//               {/* Column 1 - Account Info */}
//               <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">Account Information</h3>
                
//                 {/* Email Input */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#50142c]">
//                     Email Address *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-4 w-4 text-gray-400 t9" />
//                     </div>
//                     <input
//                       type="email"
//                       name="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                       placeholder="Enter your email"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>

//                 {/* Password Input */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#50142c]">
//                     Password *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-4 w-4 text-gray-400 t9" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={form.password}
//                       onChange={handleChange}
//                       className="w-full pl-9 pr-10 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                       placeholder="Create a password (min 6 chars)"
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password Input */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#50142c]">
//                     Confirm Password *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-4 w-4 text-gray-400 t9" />
//                     </div>
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={form.confirmPassword}
//                       onChange={handleChange}
//                       className="w-full pl-9 pr-10 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                       placeholder="Confirm your password"
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Column 2 - Contact Info / Business Info */}
//               <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">
//                   {form.role === 'creator' ? 'Contact Information' : 'Business Information'}
//                 </h3>
                
//                 {form.role === 'creator' ? (
//                   <>
//                     {/* Mobile Number */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Mobile Number *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Phone className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="tel"
//                           name="mobileNumber"
//                           value={form.mobileNumber}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="+1 234 567 8900"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Instagram Handle for Creator */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Instagram Handle *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Instagram className="h-4 w-4 text-gray-400 t9" />

//                         </div>
//                         <input
//                           type="text"
//                           name="instagramHandle"
//                           value={form.instagramHandle}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="@your_instagram_handle"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Creator Niche */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Content Niche *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Globe className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <select
//                           name="niche"
//                           value={form.niche}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white t8"
//                           required
//                           disabled={isLoading}
//                         >
//                           <option value="">Select your content niche</option>
//                           <option value="fashion">Fashion & Beauty</option>
//                           <option value="fitness">Fitness & Health</option>
//                           <option value="food">Food & Beverage</option>
//                           <option value="tech">Technology</option>
//                           <option value="travel">Travel & Tourism</option>
//                           <option value="lifestyle">Lifestyle</option>
//                           <option value="gaming">Gaming</option>
//                           <option value="education">Education</option>
//                           <option value="finance">Finance</option>
//                           <option value="automotive">Automotive</option>
//                           <option value="home">Home & Garden</option>
//                           <option value="entertainment">Entertainment</option>
//                           <option value="music">Music</option>
//                           <option value="art">Art & Design</option>
//                           <option value="sports">Sports</option>
//                           <option value="parenting">Parenting</option>
//                           <option value="pets">Pets & Animals</option>
//                           <option value="comedy">Comedy</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* Brand Name */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Brand/Business Name *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <User className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           name="brandName"
//                           value={form.brandName}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Enter your brand/business name"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Business Contact Info */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c] ">
//                         Business Contact Info *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
//                           <Phone className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           name="businessContact"
//                           value={form.businessContact}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Phone number or contact email"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Niche */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Business Niche *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Globe className="h-4 w-4 text-gray-400 t9" />

//                         </div>
//                         <select
//                           name="niche"
//                           value={form.niche}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white t8"
//                           required
//                           disabled={isLoading}
//                         >
//                           <option value="">Select your business niche</option>
//                           <option value="fashion">Fashion & Beauty</option>
//                           <option value="fitness">Fitness & Health</option>
//                           <option value="food">Food & Beverage</option>
//                           <option value="tech">Technology</option>
//                           <option value="travel">Travel & Tourism</option>
//                           <option value="lifestyle">Lifestyle</option>
//                           <option value="gaming">Gaming</option>
//                           <option value="education">Education</option>
//                           <option value="finance">Finance</option>
//                           <option value="automotive">Automotive</option>
//                           <option value="home">Home & Garden</option>
//                           <option value="entertainment">Entertainment</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Column 3 - Location Info / Additional Info */}
//               <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">
//                   {form.role === 'creator' ? 'Location Details' : 'Additional Information'}
//                 </h3>
                
//                 {form.role === 'creator' ? (
//                   <>
//                     {/* Country for Creator */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Country *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Globe className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <select
//                           name="country"
//                           value={form.country}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white t8"
//                           required
//                           disabled={isLoading}
//                         >
//                           <option value="">Select your country</option>
//                           <option value="US">United States</option>
//                           <option value="CA">Canada</option>
//                           <option value="UK">United Kingdom</option>
//                           <option value="AU">Australia</option>
//                           <option value="IN">India</option>
//                           <option value="DE">Germany</option>
//                           <option value="FR">France</option>
//                           <option value="ES">Spain</option>
//                           <option value="IT">Italy</option>
//                           <option value="JP">Japan</option>
//                           <option value="KR">South Korea</option>
//                           <option value="BR">Brazil</option>
//                           <option value="MX">Mexico</option>
//                           <option value="AR">Argentina</option>
//                           <option value="CL">Chile</option>
//                           <option value="OTHER">Other</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* State */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         State/Province *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <MapPin className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="text"
//                           name="state"
//                           value={form.state}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Enter your state/province"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* City */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         City *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <MapPin className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="text"
//                           name="city"
//                           value={form.city}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Enter your city"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* Instagram Handle for Brand (Optional) */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Instagram Handle (Optional)
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Instagram className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           name="instagramHandle"
//                           value={form.instagramHandle}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="@your_brand_instagram"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Website (Optional) */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Website (Optional)
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Globe className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="url"
//                           name="website"
//                           value={form.website}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="https://your-website.com"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Terms and Conditions - Moved below all sections */}
//             <div className="mt-6">
//               <div className="space-y-3 pt-4 bg-gradient-to-r from-[#50142c]/5 to-[#d20054]/5 p-4 rounded-lg border border-[#d20054]/20">
//                 <label className="flex items-start space-x-3 cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       name="acceptTerms"
//                       checked={form.acceptTerms}
//                       onChange={handleChange}
//                       className="sr-only"
//                       required
//                       disabled={isLoading}
//                     />
//                     <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
//                       form.acceptTerms 
//                         ? 'border-[#d20054] bg-[#d20054]' 
//                         : 'border-gray-300 hover:border-[#d20054]/50'
//                     }`}>
//                       {form.acceptTerms && <Check className="w-3 h-3 text-white " />}
//                     </div>
//                   </div>
//                   <div className="text-sm">
//                     <span className="text-[#50142c]">I accept the </span>
//                     <a
//                       href="#"
//                       className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors"
//                     >
//                       Terms and Conditions
//                     </a>
//                     <span className="text-[#50142c]"> and </span>
//                     <a
//                       href="#"
//                       className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors"
//                     >
//                       Privacy Policy
//                     </a>
//                     <span className="text-red-500"> *</span>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6 border-t-2 border-[#d20054]/20">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-[#d20054] to-[#50142c] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-[#b0004a] hover:to-[#3d0f21] focus:ring-4 focus:ring-[#d20054] focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg t8"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center space-x-2 t8">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white t8"></div>
//                     <span>Creating Account...</span>
//                   </div>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Footer Links */}
//           <div className="mt-6 pt-6 border-t-2 border-[#d20054]/20 text-center bg-gradient-to-r from-gray-50/50 to-white/50 rounded-lg p-4">
//             <p className="text-sm text-[#50142c]">
//               Already have an account?{" "}
//               <a
//                 href="#"
//                 className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors underline decoration-[#d20054]/30 hover:decoration-[#d20054]"
//               >
//                 Sign in
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           25% { transform: translateY(-30px) rotate(90deg); }
//           50% { transform: translateY(-60px) rotate(180deg); }
//           75% { transform: translateY(-30px) rotate(270deg); }
//         }
        
//         @keyframes drift {
//           0% { transform: translateX(0px) translateY(0px); }
//           25% { transform: translateX(20px) translateY(-10px); }
//           50% { transform: translateX(0px) translateY(-20px); }
//           75% { transform: translateX(-20px) translateY(-10px); }
//           100% { transform: translateX(0px) translateY(0px); }
//         }

//         @keyframes zigzag {
//           0% { transform: translateX(0px) translateY(0px); }
//           25% { transform: translateX(30px) translateY(-20px); }
//           50% { transform: translateX(-30px) translateY(-40px); }
//           75% { transform: translateX(30px) translateY(-20px); }
//           100% { transform: translateX(0px) translateY(0px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SignUp;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   Phone,
//   Instagram,
//   User,
//   MapPin,
//   Globe,
//   Check,
// } from "lucide-react";
// import axios from "axios";
// import LoadingSpinner from "../components/UI/LoadingSpinner";
// import "./SignIn.css";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     role: "creator",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     username: "",
//     mobileNumber: "",
//     instaHandle: "",
//     country: "",
//     state: "",
//     city: "",
//     brandName: "",
//     businessContact: "",
//     businessNiche: "",
//     website: "",
//     acceptTerms: false,
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Clear errors when user starts typing
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     const baseFields = ["email", "password", "confirmPassword"];
//     const creatorFields = [
//       "username",
//       "mobileNumber",
//       "instaHandle",
//       "country",
//       "state",
//       "city",
//     ];
//     const brandFields = ["brandName", "businessContact", "businessNiche"];

//     const requiredFields =
//       form.role === "creator"
//         ? [...baseFields, ...creatorFields]
//         : [...baseFields, ...brandFields];

//     const missingFields = requiredFields.filter((field) => !form[field]);

//     if (missingFields.length > 0) {
//       return "Please fill in all required fields";
//     }

//     if (form.password.length < 6) {
//       return "Password must be at least 6 characters long";
//     }

//     if (form.password !== form.confirmPassword) {
//       return "Passwords do not match";
//     }

//     if (!form.acceptTerms) {
//       return "Please accept the terms and conditions";
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.email)) {
//       return "Please enter a valid email address";
//     }

//     // Mobile number validation (basic)
//     if (form.role === "creator" && form.mobileNumber) {
//       const mobileRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
//       if (!mobileRegex.test(form.mobileNumber)) {
//         return "Please enter a valid mobile number";
//       }
//     }

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     // Validate form
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       console.log("Starting signup process...");

//       // Prepare data for API
//       const signupData = {
//         email: form.email,
//         password: form.password,
//         role: form.role,
//       };

//       // Add role-specific fields
//       if (form.role === "creator") {
//         signupData.username = form.username;
//         signupData.mobileNumber = form.mobileNumber;
//         signupData.instaHandle = form.instaHandle;
//         signupData.country = form.country;
//         signupData.state = form.state;
//         signupData.city = form.city;
//       } else if (form.role === "brand") {
//         signupData.brandName = form.brandName;
//         signupData.businessContact = form.businessContact;
//         signupData.businessNiche = form.businessNiche;
//         if (form.instaHandle) signupData.instaHandle = form.instaHandle;
//         if (form.website) signupData.website = form.website;
//       }

//       // Make API call
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/signup`,
//         signupData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           timeout: 15000,
//         }
//       );

//       console.log("Signup successful:", response.data);

//       setSuccess("Account created successfully! Redirecting to sign in...");

//       // Reset form
//       setForm({
//         role: "creator",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         username: "",
//         mobileNumber: "",
//         instaHandle: "",
//         country: "",
//         state: "",
//         city: "",
//         brandName: "",
//         businessContact: "",
//         businessNiche: "",
//         website: "",
//         acceptTerms: false,
//       });

//       // Redirect to sign in after 2 seconds
//       setTimeout(() => {
//         navigate("/signin");
//       }, 2000);
//     } catch (err) {
//       console.error("Signup error:", err);

//       if (err.response?.data?.error) {
//         setError(err.response.data.error);
//       } else if (err.code === "ECONNABORTED") {
//         setError("Request timeout - please try again");
//       } else if (err.code === "ERR_NETWORK") {
//         setError("Network error - please check your connection");
//       } else {
//         setError("Signup failed - please try again");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#50142c] relative overflow-hidden flex items-center justify-center p-4">
//       {/* Enhanced Dynamic Moving Background */}
//       <div className="absolute inset-0 opacity-20">
//         {/* Large Moving Circles with Strong Motion */}
//         <div
//           className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-bounce"
//           style={{ animationDuration: "2s" }}
//         ></div>
//         <div
//           className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full animate-pulse"
//           style={{ animationDuration: "1.5s" }}
//         ></div>
//         <div
//           className="absolute bottom-20 left-20 w-28 h-28 border-2 border-white rounded-full animate-ping"
//           style={{ animationDuration: "2.5s" }}
//         ></div>
//         <div
//           className="absolute bottom-10 right-10 w-36 h-36 border-2 border-white rounded-full animate-bounce"
//           style={{ animationDuration: "3s", animationDelay: "0.5s" }}
//         ></div>

//         {/* Fast Rotating Elements */}
//         <div
//           className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-white rounded-full animate-spin"
//           style={{ animationDuration: "2s" }}
//         ></div>
//         <div
//           className="absolute top-3/4 right-1/4 w-16 h-16 border-2 border-white rounded-full animate-spin"
//           style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full animate-spin"
//           style={{ animationDuration: "3s" }}
//         ></div>

//         {/* Long Rotating Lines with Visible Motion */}
//         <div
//           className="absolute top-16 left-1/3 w-32 h-1 bg-white origin-left animate-spin"
//           style={{ animationDuration: "4s" }}
//         ></div>
//         <div
//           className="absolute bottom-16 right-1/3 w-40 h-1 bg-white origin-right animate-spin"
//           style={{ animationDuration: "3s", animationDirection: "reverse" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/6 w-28 h-1 bg-white origin-center animate-spin"
//           style={{ animationDuration: "5s" }}
//         ></div>
//         <div
//           className="absolute top-1/3 right-1/6 w-36 h-1 bg-white origin-center animate-spin"
//           style={{ animationDuration: "2.5s", animationDirection: "reverse" }}
//         ></div>

//         {/* Large Pulsing Dots */}
//         <div
//           className="absolute top-1/5 left-1/2 w-6 h-6 bg-white rounded-full animate-ping"
//           style={{ animationDuration: "1s" }}
//         ></div>
//         <div
//           className="absolute bottom-1/5 left-1/3 w-8 h-8 bg-white rounded-full animate-pulse"
//           style={{ animationDuration: "1.2s" }}
//         ></div>
//         <div
//           className="absolute top-2/3 right-1/5 w-5 h-5 bg-white rounded-full animate-bounce"
//           style={{ animationDuration: "1.8s" }}
//         ></div>
//         <div
//           className="absolute top-1/6 right-1/2 w-7 h-7 bg-white rounded-full animate-ping"
//           style={{ animationDuration: "2s" }}
//         ></div>

//         {/* Moving Squares with Rotation */}
//         <div
//           className="absolute top-32 left-32 w-12 h-12 border-2 border-white animate-spin"
//           style={{ animationDuration: "2s" }}
//         ></div>
//         <div
//           className="absolute bottom-32 right-32 w-16 h-16 border-2 border-white animate-spin"
//           style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
//         ></div>
//         <div
//           className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-white animate-spin"
//           style={{ animationDuration: "3s" }}
//         ></div>

//         {/* Diagonal Moving Lines */}
//         <div
//           className="absolute top-24 right-24 w-32 h-1 bg-white rotate-45 animate-pulse"
//           style={{ animationDuration: "1s" }}
//         ></div>
//         <div
//           className="absolute bottom-24 left-24 w-28 h-1 bg-white -rotate-45 animate-ping"
//           style={{ animationDuration: "1.5s" }}
//         ></div>
//         <div
//           className="absolute top-1/3 left-1/5 w-24 h-1 bg-white rotate-12 animate-bounce"
//           style={{ animationDuration: "2s" }}
//         ></div>

//         {/* Additional Fast Moving Elements */}
//         <div
//           className="absolute top-1/4 right-1/5 w-14 h-14 border-2 border-white rounded-full animate-bounce"
//           style={{ animationDuration: "1s" }}
//         ></div>
//         <div
//           className="absolute bottom-1/4 left-1/5 w-18 h-18 border-2 border-white rounded-full animate-ping"
//           style={{ animationDuration: "1.3s" }}
//         ></div>
//         <div
//           className="absolute top-3/5 left-3/5 w-20 h-20 border-2 border-white rounded-full animate-pulse"
//           style={{ animationDuration: "0.8s" }}
//         ></div>

//         {/* Floating Particles with Strong Motion */}
//         <div
//           className="absolute top-1/6 left-2/3 w-3 h-3 bg-white rounded-full animate-bounce"
//           style={{ animationDuration: "1.2s" }}
//         ></div>
//         <div
//           className="absolute top-2/3 left-1/6 w-4 h-4 bg-white rounded-full animate-ping"
//           style={{ animationDuration: "1s" }}
//         ></div>
//         <div
//           className="absolute top-5/6 right-1/6 w-2 h-2 bg-white rounded-full animate-pulse"
//           style={{ animationDuration: "0.9s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 right-1/8 w-3 h-3 bg-white rounded-full animate-bounce"
//           style={{ animationDuration: "1.4s" }}
//         ></div>

//         {/* Cross-shaped Moving Elements */}
//         <div
//           className="absolute top-40 left-40 w-8 h-2 bg-white animate-spin"
//           style={{ animationDuration: "2s" }}
//         ></div>
//         <div
//           className="absolute top-40 left-40 w-2 h-8 bg-white animate-spin"
//           style={{ animationDuration: "2s" }}
//         ></div>
//         <div
//           className="absolute bottom-40 right-40 w-6 h-1.5 bg-white animate-spin"
//           style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
//         ></div>
//         <div
//           className="absolute bottom-40 right-40 w-1.5 h-6 bg-white animate-spin"
//           style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
//         ></div>
//       </div>

//       {/* Enhanced Gradient Overlay for More Depth */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#50142c] via-transparent to-[#50142c] opacity-40"></div>
//       <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#50142c]/20 to-[#50142c]/40"></div>

//       {/* Wide Sign Up Card */}
//       <div className="relative z-10 w-full max-w-4xl">
//         <div className="bg-gradient-to-br from-white/95 to-gray-50/95 rounded-xl shadow-2xl p-8 border border-gray-200 backdrop-blur-lg">
//           {/* Header */}
//           <div className="text-center mb-8 bg-gradient-to-r from-[#50142c] to-[#d20054] rounded-lg p-6 shadow-lg">
//             <h1 className="text-3xl font-bold text-white mb-2 t11">
//               Join LocoLab
//             </h1>
//             <p className="text-gray-100 t11">
//               Create your account and start connecting
//             </p>
//           </div>

//           {/* Error/Success Messages */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600 text-sm">{error}</p>
//             </div>
//           )}

//           {success && (
//             <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <p className="text-green-600 text-sm">{success}</p>
//             </div>
//           )}

//           {/* Sign Up Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Role Selection - Enhanced */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-[#50142c]">
//                 I am a *
//               </label>
//               <div className="grid grid-cols-2 gap-4">
//                 <label
//                   className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
//                     form.role === "creator"
//                       ? "border-[#d20054] bg-gradient-to-br from-[#d20054]/10 to-[#50142c]/5 shadow-md"
//                       : "border-gray-300 hover:border-[#d20054]/50 hover:bg-gray-50"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="role"
//                     value="creator"
//                     checked={form.role === "creator"}
//                     onChange={handleChange}
//                     className="sr-only"
//                     disabled={isLoading}
//                   />
//                   <div className="flex items-center space-x-3">
//                     <div
//                       className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                         form.role === "creator"
//                           ? "border-[#d20054] bg-[#d20054]"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {form.role === "creator" && (
//                         <div className="w-2 h-2 bg-white rounded-full"></div>
//                       )}
//                     </div>
//                     <div>
//                       <div className="font-semibold text-[#50142c]">
//                         Content Creator
//                       </div>
//                       <div className="text-sm text-gray-700">
//                         I create content and want to work with brands
//                       </div>
//                     </div>
//                   </div>
//                 </label>

//                 <label
//                   className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
//                     form.role === "brand"
//                       ? "border-[#d20054] bg-gradient-to-br from-[#d20054]/10 to-[#50142c]/5 shadow-md"
//                       : "border-gray-300 hover:border-[#d20054]/50 hover:bg-gray-50"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="role"
//                     value="brand"
//                     checked={form.role === "brand"}
//                     onChange={handleChange}
//                     className="sr-only"
//                     disabled={isLoading}
//                   />
//                   <div className="flex items-center space-x-3">
//                     <div
//                       className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                         form.role === "brand"
//                           ? "border-[#d20054] bg-[#d20054]"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {form.role === "brand" && (
//                         <div className="w-2 h-2 bg-white rounded-full"></div>
//                       )}
//                     </div>
//                     <div>
//                       <div className="font-semibold text-[#50142c]">Brand</div>
//                       <div className="text-sm text-gray-700">
//                         I represent a brand and want to find creators
//                       </div>
//                     </div>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Three Column Layout for Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 t12">
//               {/* Column 1 - Account Info */}
//               <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">
//                   Account Information
//                 </h3>

//                 {/* Email Input */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#50142c]">
//                     Email Address *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-4 w-4 text-gray-400 t9" />
//                     </div>
//                     <input
//                       type="email"
//                       name="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                       placeholder="Enter your email"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>

//                 {/* Password Input */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#50142c]">
//                     Password *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-4 w-4 text-gray-400 t9" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={form.password}
//                       onChange={handleChange}
//                       className="w-full pl-9 pr-10 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                       placeholder="Create a password (min 6 chars)"
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password Input */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#50142c]">
//                     Confirm Password *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-4 w-4 text-gray-400 t9" />
//                     </div>
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={form.confirmPassword}
//                       onChange={handleChange}
//                       className="w-full pl-9 pr-10 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                       placeholder="Confirm your password"
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Column 2 - Contact Info / Business Info */}
//               <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">
//                   {form.role === "creator"
//                     ? "Contact Information"
//                     : "Business Information"}
//                 </h3>

//                 {form.role === "creator" ? (
//                   <>
//                     {/* Username for Creator */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Username *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <User className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="text"
//                           name="username"
//                           value={form.username}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Choose a username"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Mobile Number */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Mobile Number *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Phone className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="tel"
//                           name="mobileNumber"
//                           value={form.mobileNumber}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="+1 234 567 8900"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Instagram Handle for Creator */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Instagram Handle *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Instagram className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="text"
//                           name="instaHandle"
//                           value={form.instaHandle}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="@your_instagram_handle"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* Brand Name */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Brand/Business Name *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <User className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           name="brandName"
//                           value={form.brandName}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Enter your brand/business name"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Business Contact Info */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c] ">
//                         Business Contact Info *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
//                           <Phone className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           name="businessContact"
//                           value={form.businessContact}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Phone number or contact email"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Business Niche */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Business Niche *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Globe className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <select
//                           name="businessNiche"
//                           value={form.businessNiche}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white t8"
//                           required
//                           disabled={isLoading}
//                         >
//                           <option value="">Select your business niche</option>
//                           <option value="fashion">Fashion & Beauty</option>
//                           <option value="fitness">Fitness & Health</option>
//                           <option value="food">Food & Beverage</option>
//                           <option value="tech">Technology</option>
//                           <option value="travel">Travel & Tourism</option>
//                           <option value="lifestyle">Lifestyle</option>
//                           <option value="gaming">Gaming</option>
//                           <option value="education">Education</option>
//                           <option value="finance">Finance</option>
//                           <option value="automotive">Automotive</option>
//                           <option value="home">Home & Garden</option>
//                           <option value="entertainment">Entertainment</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Column 3 - Location Info / Additional Info */}
//               <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">
//                   {form.role === "creator"
//                     ? "Location Details"
//                     : "Additional Information"}
//                 </h3>

//                 {form.role === "creator" ? (
//                   <>
//                     {/* Country for Creator */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Country *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Globe className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <select
//                           name="country"
//                           value={form.country}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white t8"
//                           required
//                           disabled={isLoading}
//                         >
//                           <option value="">Select your country</option>
//                           <option value="US">United States</option>
//                           <option value="CA">Canada</option>
//                           <option value="UK">United Kingdom</option>
//                           <option value="AU">Australia</option>
//                           <option value="IN">India</option>
//                           <option value="DE">Germany</option>
//                           <option value="FR">France</option>
//                           <option value="ES">Spain</option>
//                           <option value="IT">Italy</option>
//                           <option value="JP">Japan</option>
//                           <option value="KR">South Korea</option>
//                           <option value="BR">Brazil</option>
//                           <option value="MX">Mexico</option>
//                           <option value="AR">Argentina</option>
//                           <option value="CL">Chile</option>
//                           <option value="OTHER">Other</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* State */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         State/Province *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <MapPin className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="text"
//                           name="state"
//                           value={form.state}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Enter your state/province"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* City */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         City *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <MapPin className="h-4 w-4 text-gray-400 t9" />
//                         </div>
//                         <input
//                           type="text"
//                           name="city"
//                           value={form.city}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="Enter your city"
//                           required
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* Instagram Handle for Brand (Optional) */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Instagram Handle (Optional)
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Instagram className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           name="instaHandle"
//                           value={form.instaHandle}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="@your_brand_instagram"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     {/* Website (Optional) */}
//                     <div className="space-y-1">
//                       <label className="block text-sm font-semibold text-[#50142c]">
//                         Website (Optional)
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Globe className="h-4 w-4 text-gray-400" />
//                         </div>
//                         <input
//                           type="url"
//                           name="website"
//                           value={form.website}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
//                           placeholder="https://your-website.com"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Terms and Conditions - Moved below all sections */}
//             <div className="mt-6">
//               <div className="space-y-3 pt-4 bg-gradient-to-r from-[#50142c]/5 to-[#d20054]/5 p-4 rounded-lg border border-[#d20054]/20">
//                 <label className="flex items-start space-x-3 cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       name="acceptTerms"
//                       checked={form.acceptTerms}
//                       onChange={handleChange}
//                       className="sr-only"
//                       required
//                       disabled={isLoading}
//                     />
//                     <div
//                       className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
//                         form.acceptTerms
//                           ? "border-[#d20054] bg-[#d20054]"
//                           : "border-gray-300 hover:border-[#d20054]/50"
//                       }`}
//                     >
//                       {form.acceptTerms && (
//                         <Check className="w-3 h-3 text-white " />
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-sm">
//                     <span className="text-[#50142c]">I accept the </span>
//                     <a
//                       href="#"
//                       className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors"
//                     >
//                       Terms and Conditions
//                     </a>
//                     <span className="text-[#50142c]"> and </span>
//                     <a
//                       href="#"
//                       className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors"
//                     >
//                       Privacy Policy
//                     </a>
//                     <span className="text-red-500"> *</span>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6 border-t-2 border-[#d20054]/20">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-[#d20054] to-[#50142c] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-[#b0004a] hover:to-[#3d0f21] focus:ring-4 focus:ring-[#d20054] focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg t8"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center space-x-2 t8">
//                     <LoadingSpinner size="sm" />
//                     <span>Creating Account...</span>
//                   </div>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Footer Links */}
//           <div className="mt-6 pt-6 border-t-2 border-[#d20054]/20 text-center bg-gradient-to-r from-gray-50/50 to-white/50 rounded-lg p-4">
//             <p className="text-sm text-[#50142c]">
//               Already have an account?{" "}
//               <Link
//                 to="/signin"
//                 className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors underline decoration-[#d20054]/30 hover:decoration-[#d20054]"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           25% {
//             transform: translateY(-30px) rotate(90deg);
//           }
//           50% {
//             transform: translateY(-60px) rotate(180deg);
//           }
//           75% {
//             transform: translateY(-30px) rotate(270deg);
//           }
//         }

//         @keyframes drift {
//           0% {
//             transform: translateX(0px) translateY(0px);
//           }
//           25% {
//             transform: translateX(20px) translateY(-10px);
//           }
//           50% {
//             transform: translateX(0px) translateY(-20px);
//           }
//           75% {
//             transform: translateX(-20px) translateY(-10px);
//           }
//           100% {
//             transform: translateX(0px) translateY(0px);
//           }
//         }

//         @keyframes zigzag {
//           0% {
//             transform: translateX(0px) translateY(0px);
//           }
//           25% {
//             transform: translateX(30px) translateY(-20px);
//           }
//           50% {
//             transform: translateX(-30px) translateY(-40px);
//           }
//           75% {
//             transform: translateX(30px) translateY(-20px);
//           }
//           100% {
//             transform: translateX(0px) translateY(0px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Phone, Instagram, User, MapPin, Globe, Check } from 'lucide-react';
import './SignIn.css';

const SignUp = () => {
  const [form, setForm] = useState({
    role: "creator",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    instagramHandle: "",
    country: "",
    state: "",
    city: "",
    brandName: "",
    businessContact: "",
    niche: "lifestyle", // Default niche to reduce validation failures
    website: "",
    acceptTerms: false
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (error) setError("");
  };

  const validateForm = () => {
    const baseFields = ['email', 'password', 'confirmPassword'];
    const creatorFields = ['mobileNumber', 'instagramHandle', 'country', 'state', 'city', 'niche'];
    const brandFields = ['brandName', 'businessContact', 'niche'];
    
    const requiredFields = form.role === 'creator' 
      ? [...baseFields, ...creatorFields]
      : [...baseFields, ...brandFields];
    
    const missingFields = requiredFields.filter(field => !form[field]);
    
    if (missingFields.length > 0) {
      if (missingFields.includes('niche')) {
        return `Please select a ${form.role === 'creator' ? 'content' : 'business'} niche`;
      }
      return "Please fill in all required fields";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    if (!form.acceptTerms) {
      return "Please accept the terms and conditions";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Please enter a valid email address";
    }

    // Role-specific validations
    if (form.role === 'creator') {
      // Mobile number validation
      const mobileRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
      if (!mobileRegex.test(form.mobileNumber)) {
        return "Please enter a valid mobile number";
      }

      // Instagram handle validation
      const instagramRegex = /^@?[a-zA-Z0-9._]{1,30}$/;
      if (!instagramRegex.test(form.instagramHandle)) {
        return "Please enter a valid Instagram handle (letters, numbers, periods, underscores)";
      }

      // Country validation
      const validCountries = ['US', 'CA', 'UK', 'AU', 'IN', 'DE', 'FR', 'ES', 'IT', 'JP', 'KR', 'BR', 'MX', 'AR', 'CL', 'OTHER'];
      if (!validCountries.includes(form.country)) {
        return "Please select a valid country";
      }

      // State validation
      const stateRegex = /^[a-zA-Z\s]{2,}$/;
      if (!stateRegex.test(form.state)) {
        return "Please enter a valid state/province";
      }
    } else {
      // Business contact validation for brand
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
      if (!emailRegex.test(form.businessContact) && !phoneRegex.test(form.businessContact)) {
        return "Please enter a valid email or phone number for business contact";
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      setError("Request timed out. Please try again.");
    }, 10000);

    try {
      // Placeholder for real API call
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...form,
      //     instagramHandle: form.instagramHandle.startsWith('@') 
      //       ? form.instagramHandle 
      //       : `@${form.instagramHandle}`
      //   })
      // });
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Signup failed');
      // }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Signup successful:", { ...form, password: "[HIDDEN]", confirmPassword: "[HIDDEN]" });
      
      setSuccess("Account created successfully! Welcome to LocoLab!");
      
      setForm({
        role: "creator",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        instagramHandle: "",
        country: "",
        state: "",
        city: "",
        brandName: "",
        businessContact: "",
        niche: "lifestyle",
        website: "",
        acceptTerms: false
      });
      
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "An error occurred during signup");
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#50142c] relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full animate-pulse" style={{animationDuration: '1.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-white rounded-full animate-ping" style={{animationDuration: '2.5s'}}></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-white rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-16 h-16 border-2 border-white rounded-full animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-16 left-1/3 w-32 h-1 bg-white origin-left animate-spin" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-40 h-1 bg-white origin-right animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-1/6 w-28 h-1 bg-white origin-center animate-spin" style={{animationDuration: '5s'}}></div>
        <div className="absolute top-1/3 right-1/6 w-36 h-1 bg-white origin-center animate-spin" style={{animationDuration: '2.5s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/5 left-1/2 w-6 h-6 bg-white rounded-full animate-ping" style={{animationDuration: '1s'}}></div>
        <div className="absolute bottom-1/5 left-1/3 w-8 h-8 bg-white rounded-full animate-pulse" style={{animationDuration: '1.2s'}}></div>
        <div className="absolute top-2/3 right-1/5 w-5 h-5 bg-white rounded-full animate-bounce" style={{animationDuration: '1.8s'}}></div>
        <div className="absolute top-1/6 right-1/2 w-7 h-7 bg-white rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-32 left-32 w-12 h-12 border-2 border-white animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 border-2 border-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-white animate-spin" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-24 right-24 w-32 h-1 bg-white rotate-45 animate-pulse" style={{animationDuration: '1s'}}></div>
        <div className="absolute bottom-24 left-24 w-28 h-1 bg-white -rotate-45 animate-ping" style={{animationDuration: '1.5s'}}></div>
        <div className="absolute top-1/3 left-1/5 w-24 h-1 bg-white rotate-12 animate-bounce" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-1/4 right-1/5 w-14 h-14 border-2 border-white rounded-full animate-bounce" style={{animationDuration: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/5 w-18 h-18 border-2 border-white rounded-full animate-ping" style={{animationDuration: '1.3s'}}></div>
        <div className="absolute top-3/5 left-3/5 w-20 h-20 border-2 border-white rounded-full animate-pulse" style={{animationDuration: '0.8s'}}></div>
        <div className="absolute top-1/6 left-2/3 w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDuration: '1.2s'}}></div>
        <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '1s'}}></div>
        <div className="absolute top-5/6 right-1/6 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDuration: '0.9s'}}></div>
        <div className="absolute top-1/2 right-1/8 w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDuration: '1.4s'}}></div>
        <div className="absolute top-40 left-40 w-8 h-2 bg-white animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-40 left-40 w-2 h-8 bg-white animate-spin" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-40 right-40 w-6 h-1.5 bg-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
        <div className="absolute bottom-40 right-40 w-1.5 h-6 bg-white animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#50142c] via-transparent to-[#50142c] opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#50142c]/20 to-[#50142c]/40"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-gradient-to-br from-white/95 to-gray-50/95 rounded-xl shadow-2xl p-8 border border-gray-200 backdrop-blur-lg">
          <div className="text-center mb-8 bg-gradient-to-r from-[#50142c] to-[#d20054] rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-2 t11">
              Join LocoLab
            </h1>
            <p className="text-gray-100 t11">Create your account and start connecting</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#50142c]">
                I am a *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                  form.role === 'creator' 
                    ? 'border-[#d20054] bg-gradient-to-br from-[#d20054]/10 to-[#50142c]/5 shadow-md' 
                    : 'border-gray-300 hover:border-[#d20054]/50 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="creator"
                    checked={form.role === 'creator'}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      form.role === 'creator' 
                        ? 'border-[#d20054] bg-[#d20054]' 
                        : 'border-gray-300'
                    }`}>
                      {form.role === 'creator' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div>
                      <div className="font-semibold text-[#50142c]">Content Creator</div>
                      <div className="text-sm text-gray-700">I create content and want to work with brands</div>
                    </div>
                  </div>
                </label>
                
                <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                  form.role === 'brand' 
                    ? 'border-[#d20054] bg-gradient-to-br from-[#d20054]/10 to-[#50142c]/5 shadow-md' 
                    : 'border-gray-300 hover:border-[#d20054]/50 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="brand"
                    checked={form.role === 'brand'}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      form.role === 'brand' 
                        ? 'border-[#d20054] bg-[#d20054]' 
                        : 'border-gray-300'
                    }`}>
                      {form.role === 'brand' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div>
                      <div className="font-semibold text-[#50142c]">Brand</div>
                      <div className="text-sm text-gray-700">I represent a brand and want to find creators</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 t12">
              <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">Account Information</h3>
                
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#50142c]">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400 t9" />
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

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#50142c]">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400 t9" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-9 pr-10 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                      placeholder="Create a password (min 6 chars)"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#50142c]">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400 t9" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-9 pr-10 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors t10" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">
                  {form.role === 'creator' ? 'Contact Information' : 'Business Information'}
                </h3>
                
                {form.role === 'creator' ? (
                  <>
                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-gray-400 t9" />
                        </div>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={form.mobileNumber}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                          placeholder="+1 234 567 8900"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Instagram Handle *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Instagram className="h-4 w-4 text-gray-400 t9" />
                        </div>
                        <input
                          type="text"
                          name="instagramHandle"
                          value={form.instagramHandle}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                          placeholder="@your_instagram_handle"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Content Niche *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-4 w-4 text-gray-400 t9" />
                        </div>
                        <select
                          name="niche"
                          value={form.niche}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white t8"
                          required
                          disabled={isLoading}
                        >
                          <option value="fashion">Fashion & Beauty</option>
                          <option value="fitness">Fitness & Health</option>
                          <option value="food">Food & Beverage</option>
                          <option value="tech">Technology</option>
                          <option value="travel">Travel & Tourism</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="gaming">Gaming</option>
                          <option value="education">Education</option>
                          <option value="finance">Finance</option>
                          <option value="automotive">Automotive</option>
                          <option value="home">Home & Garden</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="music">Music</option>
                          <option value="art">Art & Design</option>
                          <option value="sports">Sports</option>
                          <option value="parenting">Parenting</option>
                          <option value="pets">Pets & Animals</option>
                          <option value="comedy">Comedy</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Brand/Business Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="brandName"
                          value={form.brandName}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                          placeholder="Enter your brand/business name"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Business Contact Info *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="businessContact"
                          value={form.businessContact}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm"
                          placeholder="Phone number or contact email"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Business Niche *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 text-gray-400 t9" />
                        </div>
                        <select
                          name="niche"
                          value={form.niche}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white"
                          required
                          disabled={isLoading}
                        >
                          <option value="fashion">Fashion & Beauty</option>
                          <option value="fitness">Fitness & Health</option>
                          <option value="food">Food & Beverage</option>
                          <option value="tech">Technology</option>
                          <option value="travel">Travel & Tourism</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="gaming">Gaming</option>
                          <option value="education">Education</option>
                          <option value="finance">Finance</option>
                          <option value="automotive">Automotive</option>
                          <option value="home">Home & Garden</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-[#50142c] border-b-2 border-[#d20054] pb-2">
                  {form.role === 'creator' ? 'Location Details' : 'Additional Information'}
                </h3>
                
                {form.role === 'creator' ? (
                  <>
                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Country *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-4 w-4 text-gray-400 t9" />
                        </div>
                        <select
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 text-sm appearance-none bg-white t8"
                          required
                          disabled={isLoading}
                        >
                          <option value="">Select your country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="ES">Spain</option>
                          <option value="IT">Italy</option>
                          <option value="JP">Japan</option>
                          <option value="KR">South Korea</option>
                          <option value="BR">Brazil</option>
                          <option value="MX">Mexico</option>
                          <option value="AR">Argentina</option>
                          <option value="CL">Chile</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        State/Province *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-400 t9" />
                        </div>
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                          placeholder="Enter your state/province"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        City *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-400 t9" />
                        </div>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm t8"
                          placeholder="Enter your city"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Instagram Handle (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Instagram className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="instagramHandle"
                          value={form.instagramHandle}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm"
                          placeholder="@your_brand_instagram"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-semibold text-[#50142c]">
                        Website (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          value={form.website}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border-2 border-[#d20054] rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm"
                          placeholder="https://your-website.com"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="space-y-3 pt-4 bg-gradient-to-r from-[#50142c]/5 to-[#d20054]/5 p-4 rounded-lg border border-[#d20054]/20">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={form.acceptTerms}
                      onChange={handleChange}
                      className="sr-only"
                      disabled={isLoading}
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      form.acceptTerms 
                        ? 'border-[#d20054] bg-[#d20054]' 
                        : 'border-gray-300 hover:border-[#d20054]/50'
                    }`}>
                      {form.acceptTerms && <Check className="w-3 h-3 text-white " />}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#50142c]">I accept the </span>
                    <a
                      href="#"
                      className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors"
                    >
                      Terms and Conditions
                    </a>
                    <span className="text-[#50142c]"> and </span>
                    <a
                      href="#"
                      className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-red-500"> *</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-[#d20054]/20">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#d20054] to-[#50142c] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-[#b0004a] hover:to-[#3d0f21] focus:ring-4 focus:ring-[#d20054] focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg t8"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2 t8">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white t8"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-[#d20054]/20 text-center bg-gradient-to-r from-gray-50/50 to-white/50 rounded-lg p-4">
            <p className="text-sm text-[#50142c]">
              Already have an account?{" "}
              <a
                href="#"
                className="text-[#d20054] hover:text-[#b0004a] font-semibold transition-colors underline decoration-[#d20054]/30 hover:decoration-[#d20054]"
              >
                Sign in
              </a>
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

export default SignUp;