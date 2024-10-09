import React from 'react';

const messages = [
  "A mentor empowers a person to see a possible future.",
  "Mentorship is a two-way street. It’s a partnership.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "A good mentor can change a life forever.",
  "Mentoring is not just about giving advice, it's about providing guidance and support.",
  "Every great achiever is inspired by a great mentor.",
  "Behind every successful person is a mentor who believed in them.",
  "Investing in yourself is the best investment you can make."
];

const InspirationalMessages = () => {
  return (
    <div className="overflow-hidden bg-gray-100 py-4">
      <div className="animate-scroll inline-block">
        {messages.map((message, index) => (
          <span key={index} className="mx-8 text-lg text-gray-700">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InspirationalMessages;
