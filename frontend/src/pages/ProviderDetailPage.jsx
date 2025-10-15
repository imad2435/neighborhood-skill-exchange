import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import profileApi from '../api/profileApi';
import reviewsApi from '../api/reviewsApi';
import bookingApi from '../api/bookingApi';
import BookingModal from '../components/BookingModal';
import { useDispatch } from 'react-redux'; // <-- 1. Import useDispatch
import { createOrGetConversationAsync } from '../redux/messagesSlice';

const ProviderDetailPage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileData, reviewsData] = await Promise.all([
          profileApi.getProfileByUserId(userId),
          reviewsApi.getReviewsForProvider(userId)
        ]);
        setProfile(profileData);
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to load profile details. The provider may not exist.');
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfileData();
  }, [userId]);

  const handleBookingSubmit = async (bookingData) => {
    try {
      await bookingApi.createBooking(userId, bookingData);
      alert('Booking request sent successfully!');
      setIsModalOpen(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('You must be logged in to book a service.');
        navigate('/login');
      } else {
        alert('Failed to send booking request.');
      }
    }
  };
   // --- 4. CREATE THE HANDLER FUNCTION ---
  const handleStartChat = async () => {
    if (!user) {
      alert('Please log in to start a chat.');
      navigate('/login');
      return;
    }
    
    // Don't let a user chat with themselves
    if (user._id === userId) {
      alert("You cannot start a chat with yourself.");
      return;
    }

    try {
      // Dispatch the action to create/get the conversation
      await dispatch(createOrGetConversationAsync(userId)).unwrap();
      // On success, redirect to the messages page
      navigate('/messages');
    } catch (error) {
      alert(`Could not start chat: ${error}`);
    }
  };

  const handleRequestToBookClick = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      alert('Please log in to book a service.');
      navigate('/login');
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg key={index} className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );

  // --- GUARD CLAUSES ---
  // These checks run before the main render. This prevents the "cannot read properties of null" error.
  if (loading) {
    return <div className="text-center p-10 text-lg font-medium">Loading profile...</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-lg text-red-500">{error}</div>;
  }
  if (!profile) {
    return <div className="text-center p-10 text-lg">Provider not found.</div>;
  }

  

  // --- MAIN RENDER ---
  // If the code reaches this point, we are guaranteed that 'profile' is a valid object.
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.user.name}</h1>
                <p className="text-xl text-purple-600 font-semibold mt-1">{profile.headline}</p>
                <p className="text-md text-gray-500 mt-2">Location: {profile.location}</p>
              </div>
            </div>
            <hr className="my-6 border-gray-200"/>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">About Me</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profile.description || 'No description provided.'}</p>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Pricing</h2>
              <p className="text-center text-4xl font-bold text-purple-600 mb-6">{profile.rate}</p>
              <button 
                onClick={handleRequestToBookClick}
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Request to Book
              </button>
              <button
                onClick={handleStartChat}
                className="w-full mt-4 bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Start Chat
              </button> {/* --- 5. ADD THE BUTTON --- */}
               
              <p className="text-xs text-gray-500 text-center mt-2">You won't be charged yet</p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <StarRating rating={review.rating} />
                    <span className="ml-4 font-semibold text-gray-800">{review.seeker.name}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">This provider has no reviews yet.</p>
          )}
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBookingSubmit}
        providerName={profile?.user?.name}
      />
    </>
  );
};

export default ProviderDetailPage;