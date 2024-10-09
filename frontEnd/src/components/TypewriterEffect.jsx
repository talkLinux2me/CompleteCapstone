
import React, { useEffect, useState } from 'react';

const messages = [
  "A mentor is someone who allows you to see the hope inside yourself.",
  "The best way to predict the future is to create it.",
  "In learning, you will teach, and in teaching, you will learn.",
  "A mentor empowers a person to see a possible future and believe it can be obtained.",
  "Mentorship is a two-way street. It’s a partnership.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "A good mentor can change a life forever.",
  "Mentoring is not just about giving advice, it's about providing guidance and support.",
  "Every great achiever is inspired by a great mentor.",
  "Behind every successful person is a mentor who believed in them.",
  "Investing in yourself is the best investment you can make."
];

const TypewriterEffect = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      setDisplayedText(currentMessage.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentMessage.length) {
        clearInterval(interval);
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % messages.length);
          setDisplayedText("");
        }, 10000); 
      }
    }, ); 

    return () => clearInterval(interval);
  }, [messageIndex]);

  return (
    <div className="text-center text-xl text-[WHITE] font-semibold my-20">
      {displayedText}
    </div>
  );
};

export default TypewriterEffect;
