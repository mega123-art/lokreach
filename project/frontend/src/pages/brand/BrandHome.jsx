// import { useEffect, useState } from "react";
// import axios from "axios";
// import PageLayout from "../../components/Layout/PageLayout";
// import CreatorCard from "../../components/UI/CreatorCard";
// import LoadingSpinner from "../../components/UI/LoadingSpinner";

// const BrandHome = () => {
//   const [city, setCity] = useState("");
//   const [creators, setCreators] = useState([]);
//   const [campaigns, setCampaigns] = useState([]);
//   const [selectedCampaign, setSelectedCampaign] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchPerformed, setSearchPerformed] = useState(false);

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // Fetch user's campaigns on component mount
//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/campaigns/brand/${user.id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCampaigns(res.data.campaigns || []);
//         // Auto-select the first campaign if available
//         if (res.data.campaigns && res.data.campaigns.length > 0) {
//           setSelectedCampaign(res.data.campaigns[0]._id);
//         }
//       } catch (err) {
//         console.error("Error fetching campaigns:", err);
//         // Don't show error for missing campaigns, just continue without them
//       }
//     };

//     fetchCampaigns();
//   }, [token, user.id]);

//   const handleStar = async (creatorId) => {
//     if (!selectedCampaign) {
//       alert("Please select a campaign first or create one to star creators.");
//       return;
//     }

//     try {
//       await axios.patch(
//         `${import.meta.env.VITE_API_URL}/campaigns/${selectedCampaign}/star/${creatorId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       alert("Creator starred successfully!");
//     } catch (err) {
//       console.error("Star error:", err);
//       alert(err.response?.data?.error || "Failed to star creator. Please try again.");
//     }
//   };

//   const fetchCreators = async () => {
//     if (!city.trim()) {
//       setError("Please enter a city name");
//       return;
//     }

//     setIsLoading(true);
//     setError("");
    
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/creators?city=${encodeURIComponent(city)}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCreators(res.data.creators);
//       setSearchPerformed(true);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to load creators");
//       setCreators([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchCreators();
//   };

//   return (
//     <PageLayout
//       title="Find Content Creators"
//       subtitle="Discover talented creators in your target location"
//     >
//       <div className="mb-8">
//         <div className="card">
//           <div className="card-body">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Campaign Selection */}
//               {campaigns.length > 0 && (
//                 <div className="form-group">
//                   <label className="form-label">Select Campaign to Star Creators</label>
//                   <select
//                     value={selectedCampaign}
//                     onChange={(e) => setSelectedCampaign(e.target.value)}
//                     className="form-select"
//                   >
//                     <option value="">Choose a campaign...</option>
//                     {campaigns.map((campaign) => (
//                       <option key={campaign._id} value={campaign._id}>
//                         {campaign.name} ({campaign.city})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {campaigns.length === 0 && (
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//                   <p className="text-yellow-800 text-sm">
//                     <strong>Note:</strong> You need to create a campaign first to star creators. 
//                     <a href="/brand/campaign/new" className="text-red-600 hover:text-red-700 ml-1">
//                       Create one here
//                     </a>
//                   </p>
//                 </div>
//               )}

//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     value={city}
//                     placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
//                     onChange={(e) => setCity(e.target.value)}
//                     className="form-input"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={isLoading || !city.trim()}
//                 >
//                   {isLoading ? (
//                     <>
//                       <LoadingSpinner size="sm" />
//                       Searching...
//                     </>
//                   ) : (
//                     'Search Creators'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-600">{error}</p>
//         </div>
//       )}

//       {isLoading && (
//         <div className="text-center py-12">
//           <LoadingSpinner size="lg" />
//           <p className="mt-4 text-gray-600">Searching for creators...</p>
//         </div>
//       )}

//       {!isLoading && searchPerformed && creators.length === 0 && !error && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No creators found</h3>
//           <p className="text-gray-600">
//             No creators found in "{city}". Try searching for a different city.
//           </p>
//         </div>
//       )}

//       {creators.length > 0 && (
//         <div>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Found {creators.length} creator{creators.length !== 1 ? 's' : ''} in {city}
//             </h2>
//             {selectedCampaign && (
//               <div className="text-sm text-gray-600">
//                 Starring for: <span className="font-medium">
//                   {campaigns.find(c => c._id === selectedCampaign)?.name}
//                 </span>
//               </div>
//             )}
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {creators.map((creator) => (
//               <CreatorCard
//                 key={creator._id}
//                 creator={creator}
//                 onStar={handleStar}
//                 showStarButton={!!selectedCampaign}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {!searchPerformed && !isLoading && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
//           <p className="text-gray-600">
//             Enter a city name above to find talented content creators in that location.
//           </p>
//         </div>
//       )}
//     </PageLayout>
//   );
// };

// export default BrandHome;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, Users, Star, ArrowRight, MapPin } from 'lucide-react';
import PageLayout from '../../components/Layout/PageLayout';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const BrandDashboard = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [creators, setCreators] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalCreators: 0,
    savedCreators: 0
  });

  const mockUser = { id: '1', name: 'Brand Manager' };

  // Mock data fetching similar to old BrandHome
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock campaigns data
        setCampaigns([
          { _id: '1', name: 'Summer Fashion Collection', city: 'Mumbai' },
          { _id: '2', name: 'Tech Product Launch', city: 'Delhi' },
          { _id: '3', name: 'Beauty Essentials', city: 'Bangalore' }
        ]);
        setSelectedCampaign('1');

        // Mock stats data
        setStats({
          totalCampaigns: 24,
          activeCampaigns: 8,
          totalCreators: 156,
          savedCreators: 12
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleStar = async (creatorId) => {
    if (!selectedCampaign) {
      alert('Please select a campaign first.');
      return;
    }
    try {
      alert('Creator starred successfully!');
    } catch (err) {
      alert('Failed to star creator. Please try again.');
    }
  };

  const fetchCreators = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock creators data
      setCreators([
        {
          _id: '1',
          name: 'Emma Johnson',
          followers: '125K',
          engagement: '4.2%',
          niche: 'Fashion',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          _id: '2',
          name: 'Alex Chen',
          followers: '89K',
          engagement: '5.1%',
          niche: 'Tech',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          _id: '3',
          name: 'Sarah Davis',
          followers: '156K',
          engagement: '3.8%',
          niche: 'Beauty',
          avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]);
      setSearchPerformed(true);
    } catch (err) {
      setError('Failed to load creators');
      setCreators([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCreators();
  };

  const StatCard = ({ icon: Icon, title, value, color = 'blue' }) => (
    <div className="group relative">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"></div>
      <div className="relative p-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${color}-500 to-${color}-600 flex items-center justify-center shadow-md mb-2`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const CreatorCard = ({ creator, onStar, showStarButton }) => (
    <div className="group relative cursor-pointer" onClick={() => navigate(`/creators/${creator._id}`)}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
      <div className="relative p-5">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{creator.name}</h3>
            <span className="text-sm text-gray-600">{creator.niche}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            {creator.followers}
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="w-4 h-4 mr-1" />
            {creator.engagement}
          </div>
        </div>
        {showStarButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStar(creator._id);
            }}
            className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Star Creator
          </button>
        )}
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Brand Dashboard"
      subtitle="Discover and manage your campaigns and creators"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={Calendar} title="Total Campaigns" value={stats.totalCampaigns} color="blue" />
            <StatCard icon={Star} title="Active Campaigns" value={stats.activeCampaigns} color="green" />
            <StatCard icon={Users} title="Total Creators" value={stats.totalCreators} color="purple" />
            <StatCard icon={Star} title="Saved Creators" value={stats.savedCreators} color="orange" />
          </div>

          {/* Search Form */}
          <div className="mb-8">
            <div className="relative bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {campaigns.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Campaign to Star Creators
                    </label>
                    <select
                      value={selectedCampaign}
                      onChange={(e) => setSelectedCampaign(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choose a campaign...</option>
                      {campaigns.map((campaign) => (
                        <option key={campaign._id} value={campaign._id}>
                          {campaign.name} ({campaign.city})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {campaigns.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> You need to create a campaign first to star creators.
                      <a href="/brand/campaign/new" className="text-blue-600 hover:text-blue-700 ml-1">
                        Create one here
                      </a>
                    </p>
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={city}
                      placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400"
                    disabled={isLoading || !city.trim()}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span className="ml-2">Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Search Creators
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Searching for creators...</p>
            </div>
          )}

          {/* No Creators Found */}
          {!isLoading && searchPerformed && creators.length === 0 && !error && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No creators found</h3>
              <p className="text-gray-600">
                No creators found in "{city}". Try searching for a different city.
              </p>
            </div>
          )}

          {/* Creators List */}
          {creators.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Found {creators.length} creator{creators.length !== 1 ? 's' : ''} in {city}
                </h2>
                {selectedCampaign && (
                  <div className="text-sm text-gray-600">
                    Starring for:{' '}
                    <span className="font-medium">
                      {campaigns.find((c) => c._id === selectedCampaign)?.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator) => (
                  <CreatorCard
                    key={creator._id}
                    creator={creator}
                    onStar={handleStar}
                    showStarButton={!!selectedCampaign}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Initial Prompt */}
          {!searchPerformed && !isLoading && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
              <p className="text-gray-600">
                Enter a city name above to find talented content creators in that location.
              </p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/brand/create-campaign')}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Campaign
              </button>
              <button
                onClick={() => navigate('/brand/all-creators')}
                className="flex items-center px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                View All Creators
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BrandDashboard;