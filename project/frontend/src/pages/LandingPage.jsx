// import { Link } from "react-router-dom";
// import './LandingPage.css';


// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="bg-[#d10055] sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
          
//           {/* Logo */}
//           <text className="Logo">LokReach</text>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center space-x-6 font-semibold text-white">
//             <a href="#home" className="nav1">Home</a>
//             <a href="#about" className="nav1">About Us</a>
//             <a href="#contact" className="nav1 end1">Contact Us</a>
//             <button className="btn2"><Link to="/signin" className="nav2">Sign in</Link></button>
//             <button className="btn2">
//             <Link
//               to="/signup"
//               className="nav2"
//             >
//               Sign up
//             </Link>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>

//       {/* Hero Section */}
//       <section id="home" className="py-6 bg-gradient-to-br from-red-50 via-white to-red-50">
//         <div className="container mx-auto px-4 text-center">
//           <div className="max-w-4xl mx-auto">
    
//               <div className="text1 text0"><h1 className="text11">The</h1><h1 className="redtext text11">Marketplace</h1><h1 className="text11">Where</h1></div>
//               <div className="text1"><h1 className="redtext text11">Influence</h1><h1 className="text11">Meets</h1><h1 className="redtext text11">Local</h1><h1 className="text11">Impact</h1></div>
              
              
            
            
//             <p className="text12">
//             Whether you're a brand looking to promote or someone ready to earn <br/>you're in the right place
//             </p>
            
//             <div className="flex flex-row sm:flex-row gap-4 justify-center mb-12">
//               <button className="btn1 btn-primary font-bold"><Link className='btn1 font-bold' to='/signup'>I am a creator</Link></button>
//               <button className="btn1 btn-primary font-bold">We are a brand</button>
//             </div>
            
//             {/* Stats Section - Horizontal Layout */}
//             <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
//               <div className="bg-white p-6 rounded-lg shadow-md border-2 border-[#d20054] min-w-[200px] text-center hover:bg-[#d20054] hover:text-white transition-all duration-300 group">
//                 <div className="text-3xl font-bold text-[#d20054] group-hover:text-white mb-2 transition-colors duration-300">1000+</div>
//                 <div className="text-gray-600 group-hover:text-white font-medium transition-colors duration-300">Active Creators</div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md border-2 border-[#d20054] min-w-[200px] text-center hover:bg-[#d20054] hover:text-white transition-all duration-300 group">
//                 <div className="text-3xl font-bold text-[#d20054] group-hover:text-white mb-2 transition-colors duration-300">500+</div>
//                 <div className="text-gray-600 group-hover:text-white font-medium transition-colors duration-300">Brand Partners</div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md border-2 border-[#d20054] min-w-[200px] text-center hover:bg-[#d20054] hover:text-white transition-all duration-300 group">
//                 <div className="text-3xl font-bold text-[#d20054] group-hover:text-white mb-2 transition-colors duration-300">50+</div>
//                 <div className="text-gray-600 group-hover:text-white font-medium transition-colors duration-300">Cities Covered</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Compact */}
//       <section id="features" className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Why Choose <span className="text-[#d20054]">LocoLab</span>?
//             </h2>
//           </div>
          
//           {/* Single Row - 4 Features */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
//             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg hover:bg-[#d20054] hover:text-white transition-all duration-300 group">
//               <div className="w-12 h-12 bg-[#d20054] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
//                 <svg className="w-6 h-6 text-white group-hover:text-[#d20054] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">Local Discovery</h3>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg hover:bg-[#d20054] hover:text-white transition-all duration-300 group">
//               <div className="w-12 h-12 bg-[#d20054] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
//                 <svg className="w-6 h-6 text-white group-hover:text-[#d20054] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">Quick Campaigns</h3>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg hover:bg-[#d20054] hover:text-white transition-all duration-300 group">
//               <div className="w-12 h-12 bg-[#d20054] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
//                 <svg className="w-6 h-6 text-white group-hover:text-[#d20054] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">Secure Platform</h3>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg hover:bg-[#d20054] hover:text-white transition-all duration-300 group">
//               <div className="w-12 h-12 bg-[#d20054] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
//                 <svg className="w-6 h-6 text-white group-hover:text-[#d20054] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">Real-time Collaboration</h3>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Us Section - Dark Theme */}
//       <section id="about" className="py-16 bg-[#50142c]">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="bg-[#50142c] p-8 rounded-xl shadow-md border border-gray-100">
//               <h2 className="text-3xl font-bold text-white mb-6 text-center">
//                 About <span className="text-[#d20054]">LocoLab</span>
//               </h2>
//               <p className="text-lg text-gray-200 text-center mb-8">
//                 LocoLab revolutionizes how brands connect with local content creators across India. We democratize influencer marketing by connecting brands with authentic local voices, empowering creators to monetize their influence while helping brands reach target audiences with genuine, location-specific content.
//               </p>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="text-center">
//                   <h3 className="text-xl font-semibold text-[#d20054] mb-3">Our Mission</h3>
//                   <p className="text-gray-200">
//                     To democratize influencer marketing through authentic local connections, data-driven partnerships, and transparent collaboration.
//                   </p>
//                 </div>
                
//                 <div className="text-center">
//                   <h3 className="text-xl font-semibold text-[#d20054] mb-3">Our Vision</h3>
//                   <p className="text-gray-200">
//                     To become India's leading platform for local influencer marketing with a nationwide creator network and AI-powered matching.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section - Horizontal Layout */}
//       <section id="contact" className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
//               <p className="text-lg text-gray-600">
//                 Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//               </p>
//             </div>
            
//             {/* Contact Info - Horizontal with Dark Theme */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//               <div className="bg-[#50142c] p-6 rounded-lg shadow-md text-center hover:bg-[#d20054] transition-all duration-300 group">
//                 <div className="w-12 h-12 bg-[#d20054] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
//                   <svg className="w-6 h-6 text-white group-hover:text-[#d20054] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-white mb-2">Address</h4>
//                 <p className="text-gray-200 text-sm">123 Business District<br />Mumbai, Maharashtra 400001</p>
//               </div>
              
//               <div className="bg-[#50142c] p-6 rounded-lg shadow-md text-center hover:bg-[#d20054] transition-all duration-300 group">
//                 <div className="w-12 h-12 bg-[#d20054] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
//                   <svg className="w-6 h-6 text-white group-hover:text-[#d20054] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-white mb-2">Email</h4>
//                 <p className="text-gray-200 text-sm">hello@locolab.com<br />support@locolab.com</p>
//               </div>
              
//               <div className="bg-[#50142c] p-6 rounded-lg shadow-md text-center hover:bg-[#d20054] transition-all duration-300 group">
//                 <div className="w-12 h-12 bg-[#d20054] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
//                   <svg className="w-6 h-6 text-white group-hover:text-[#d20054] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-white mb-2">Phone</h4>
//                 <p className="text-gray-200 text-sm">+91 98765 43210<br />+91 98765 43211</p>
//               </div>
//             </div>
            
//             {/* Contact Form */}
//             <div className="max-w-2xl mx-auto">
//               <div className="bg-white p-8 rounded-lg shadow-md">
//                 <form className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                       <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent" placeholder="Your full name" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                       <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent" placeholder="your.email@example.com" />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
//                     <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent" placeholder="How can we help?" />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                     <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d20054] focus:border-transparent" rows={4} placeholder="Tell us more about your inquiry..."></textarea>
//                   </div>
                  
//                   <button type="submit" className="w-full bg-[#d20054] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b0004a] transition-colors">
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer - Horizontal Layout */}
//       <footer className="bg-gray-900 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold text-[#d20054] mb-3">LocoLab</h3>
//               <p className="text-gray-400 text-sm">
//                 The marketplace where influence meets local impact. Connecting brands with authentic local creators.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-sm font-semibold mb-3">Platform</h4>
//               <ul className="space-y-1 text-gray-400 text-sm">
//                 <li><a href="#" className="hover:text-[#d20054] transition-colors">For Creators</a></li>
//                 <li><a href="#" className="hover:text-[#d20054] transition-colors">For Brands</a></li>
//                 <li><a href="#" className="hover:text-[#d20054] transition-colors">Success Stories</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-sm font-semibold mb-3">Company</h4>
//               <ul className="space-y-1 text-gray-400 text-sm">
//                 <li><a href="#about" className="hover:text-[#d20054] transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-[#d20054] transition-colors">Careers</a></li>
//                 <li><a href="#contact" className="hover:text-[#d20054] transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-sm font-semibold mb-3">Support</h4>
//               <ul className="space-y-1 text-gray-400 text-sm">
//                 <li><a href="#" className="hover:text-[#d20054] transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-[#d20054] transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-[#d20054] transition-colors">Terms of Service</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
//             <p>&copy; 2024 LocoLab. All rights reserved. Made with ❤️ in India.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page min-h-screen bg-white">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-content">
          {/* Logo */}
          <Link to="/" className="landing-logo">
            LokReach
          </Link>

          {/* Navigation Links */}
          <div className="landing-nav-links">
            <a href="#home" className="landing-nav-link">
              Home
            </a>
            <a href="#about" className="landing-nav-link">
              About Us
            </a>
            <a href="#contact" className="landing-nav-link">
              Contact Us
            </a>
            <Link to="/signin" className="landing-nav-button">
              Sign in
            </Link>
            <Link to="/signup" className="landing-nav-button">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="py-6 bg-gradient-to-br from-red-50 via-white to-red-50"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="hero-text-container">
              <h1 className="hero-text-large">The</h1>
              <h1 className="hero-text-large hero-text-red">Marketplace</h1>
              <h1 className="hero-text-large">Where</h1>
            </div>
            <div className="hero-text-container">
              <h1 className="hero-text-large hero-text-red">Influence</h1>
              <h1 className="hero-text-large">Meets</h1>
              <h1 className="hero-text-large hero-text-red">Local</h1>
              <h1 className="hero-text-large">Impact</h1>
            </div>

            <p className="hero-subtitle">
              Whether you're a brand looking to promote or someone ready to earn
              <br />
              you're in the right place
            </p>

            <div className="hero-buttons">
              <Link to="/signup" className="hero-button">
                I am a creator
              </Link>
              <Link to="/signup" className="hero-button">
                We are a brand
              </Link>
            </div>

            {/* Stats Section */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Active Creators</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Brand Partners</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#d20054]">LocoLab</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Local Discovery</h3>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Quick Campaigns</h3>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Secure Platform</h3>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Real-time Collaboration</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - Fixed Structure */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">
              About <span className="highlight">LocoLab</span>
            </h2>
            <p className="about-description">
              LocoLab revolutionizes how brands connect with local content
              creators across India. We democratize influencer marketing by
              connecting brands with authentic local voices, empowering creators
              to monetize their influence while helping brands reach target
              audiences with genuine, location-specific content.
            </p>

            <div className="about-grid">
              <div className="about-item">
                <h3 className="about-item-title">Our Mission</h3>
                <p className="about-item-text">
                  To democratize influencer marketing through authentic local
                  connections, data-driven partnerships, and transparent
                  collaboration.
                </p>
              </div>

              <div className="about-item">
                <h3 className="about-item-title">Our Vision</h3>
                <p className="about-item-text">
                  To become India's leading platform for local influencer
                  marketing with a nationwide creator network and AI-powered
                  matching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </div>

            {/* Contact Info */}
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h4 className="contact-title">Address</h4>
                <p className="contact-text">
                  123 Business District
                  <br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="contact-title">Email</h4>
                <p className="contact-text">
                  hello@locolab.com
                  <br />
                  support@locolab.com
                </p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h4 className="contact-title">Phone</h4>
                <p className="contact-text">
                  +91 98765 43210
                  <br />
                  +91 98765 43211
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <div className="contact-form">
                <form className="space-y-6">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button type="submit" className="form-button">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container mx-auto px-4">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>LocoLab</h3>
              <p>
                The marketplace where influence meets local impact. Connecting
                brands with authentic local creators.
              </p>
            </div>

            <div className="footer-section">
              <h4>Platform</h4>
              <ul className="footer-list">
                <li>
                  <a href="#">For Creators</a>
                </li>
                <li>
                  <a href="#">For Brands</a>
                </li>
                <li>
                  <a href="#">Success Stories</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul className="footer-list">
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul className="footer-list">
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2024 LocoLab. All rights reserved. Made with ❤️ in India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;