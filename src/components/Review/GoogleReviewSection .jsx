import React from 'react';
import { FaStar } from 'react-icons/fa'; // For star icons

// GoogleReviewButton component (ab yeh GoogleReviewCard ke andar use hoga)
const GoogleReviewButton = ({ placeId }) => {
  const googleReviewLink = `https://search.google.com/local/writereview?placeid=${placeId}`;

  return (
    <a
      href={googleReviewLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-md shadow-sm text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-300"
      aria-label="Write a review on Google"
    >
      <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.293 12.293a1 1 0 011.414 0L10 12.586l.293-.293a1 1 0 111.414 1.414L11.414 14l.293.293a1 1 0 01-1.414 1.414L10 14.414l-.293.293a1 1 0 01-1.414-1.414L8.586 13l-.293-.293a1 1 0 010-1.414zM10 4a1 1 0 00-1 1v4a1 1 0 002 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      Write a Review
    </a>
  );
};

// GoogleReviewCard component (updated to include the button)
const GoogleReviewCard = ({ review, placeId }) => { // placeId prop bhi add kiya
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-300" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full relative"> {/* Added relative for button positioning */}
      <div>
        <div className="flex items-center mb-3">
          <div className="flex text-lg">{renderStars(review.rating)}</div>
          <span className="ml-2 text-gray-600 text-sm font-medium">{review.rating.toFixed(1)}/5</span>
        </div>
        <p className="text-gray-700 text-base mb-4 leading-relaxed line-clamp-4">
          {review.text}
        </p>
      </div>
      <div className="text-sm text-gray-500 mt-auto">
        <p className="font-semibold text-gray-800">{review.reviewerName}</p>
        <p>{review.time}</p>
      </div>

      {/* Button added inside the card, positioned absolutely */}
      <div className="absolute bottom-4 right-4"> {/* Positioned at bottom-right */}
        <GoogleReviewButton placeId={placeId} />
      </div>
    </div>
  );
};

// GoogleReviewSection component (updated to pass placeId to each card)
const GoogleReviewSection = () => {
  const myPlaceId = "ChIJD_1aL2sKCGwRynL88rkay5s"; // Your actual Google Place ID

  const dummyReviews = [
    {
      id: 1,
      reviewerName: "Priya Sharma",
      rating: 5,
      text: "Design N Print provides excellent service! Their quality is top-notch and delivery is always on time. Highly recommend for all printing needs.",
      time: "2 days ago",
    },
    {
      id: 2,
      reviewerName: "Rahul Patel",
      rating: 4,
      text: "Good printing company. The staff is cooperative and the output quality is reliable. Sometimes delivery can be a bit slow, but overall satisfied.",
      time: "1 week ago",
    },
    {
      id: 3,
      reviewerName: "Sneha Gupta",
      rating: 5,
      text: "Absolutely fantastic experience! From design to final product, everything was handled professionally. Will definitely use their services again.",
      time: "3 weeks ago",
    },
    {
      id: 4,
      reviewerName: "Amit Singh",
      rating: 3,
      text: "Decent service. Quality was okay, but I expected a bit more. Maybe it was a one-off issue. Will try again in the future.",
      time: "1 month ago",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Our Customer Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyReviews.map((review) => (
            <GoogleReviewCard key={review.id} review={review} placeId={myPlaceId} /> // placeId prop pass kiya
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewSection;
