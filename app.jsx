import React, { useState, useEffect } from 'react';

const RandomQuoteMachine = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState('fade-in');

  // Array of inspirational quotes as fallback
  const fallbackQuotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    {
      text: "Don't let yesterday take up too much of today.",
      author: "Will Rogers"
    },
    {
      text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
      author: "Unknown"
    },
    {
      text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
      author: "Steve Jobs"
    },
    {
      text: "People who are crazy enough to think they can change the world, are the ones who do.",
      author: "Rob Siltanen"
    },
    {
      text: "Failure will never overtake me if my determination to succeed is strong enough.",
      author: "Og Mandino"
    },
    {
      text: "We may encounter many defeats but we must not be defeated.",
      author: "Maya Angelou"
    },
    {
      text: "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
      author: "Johann Wolfgang von Goethe"
    },
    {
      text: "Whether you think you can or you think you can't, you're right.",
      author: "Henry Ford"
    },
    {
      text: "Security is mostly a superstition. Life is either a daring adventure or nothing.",
      author: "Helen Keller"
    },
    {
      text: "The only person you are destined to become is the person you decide to be.",
      author: "Ralph Waldo Emerson"
    },
    {
      text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
      author: "Henry David Thoreau"
    },
    {
      text: "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.",
      author: "Booker T. Washington"
    },
    {
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson"
    }
  ];

  // Function to get a random quote from fallback array
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  };

  // Function to fetch a new quote
  const fetchNewQuote = async () => {
    setIsLoading(true);
    setFadeClass('fade-out');
    
    try {
      // Try to fetch from API first
      const response = await fetch('https://api.quotable.io/random');
      
      if (response.ok) {
        const data = await response.json();
        
        setTimeout(() => {
          setQuote(data.content);
          setAuthor(data.author);
          setFadeClass('fade-in');
          setIsLoading(false);
        }, 300);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      // Use fallback quotes if API fails
      const randomQuote = getRandomQuote();
      
      setTimeout(() => {
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author);
        setFadeClass('fade-in');
        setIsLoading(false);
      }, 300);
    }
  };

  // Load initial quote on component mount
  useEffect(() => {
    fetchNewQuote();
  }, []);

  // Generate tweet URL
  const tweetText = `"${quote}" - ${author}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <div className="quote-machine-container">
      <div className="background-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>
      
      <div id="quote-box" className={`quote-box ${fadeClass}`}>
        <div className="quote-content">
          <div className="quote-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
          </div>
          
          <div id="text" className="quote-text">
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              quote
            )}
          </div>
          
          <div id="author" className="quote-author">
            {!isLoading && author && `— ${author}`}
          </div>
        </div>
        
        <div className="quote-actions">
          <button 
            id="new-quote" 
            className="new-quote-btn"
            onClick={fetchNewQuote}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'New Quote'}
          </button>
          
          <a 
            id="tweet-quote" 
            href={tweetUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="tweet-quote-btn"
            title="Tweet this quote"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Tweet
          </a>
        </div>
      </div>
      
      <div className="footer">
        <p>Built with React ❤️</p>
      </div>

      <style jsx>{`
        .quote-machine-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Georgia', serif;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          top: 70%;
          left: 80%;
          animation-delay: 1s;
        }

        .shape-3 {
          width: 40px;
          height: 40px;
          top: 50%;
          left: 5%;
          animation-delay: 2s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 70%;
          animation-delay: 3s;
        }

        .shape-5 {
          width: 50px;
          height: 50px;
          top: 80%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .quote-box {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .quote-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-out {
          opacity: 0.5;
          transform: translateY(10px);
        }

        .quote-content {
          text-align: center;
          margin-bottom: 30px;
        }

        .quote-icon {
          color: #667eea;
          margin-bottom: 20px;
        }

        .quote-text {
          font-size: 1.5rem;
          line-height: 1.6;
          color: #2d3748;
          margin-bottom: 20px;
          font-style: italic;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .quote-author {
          font-size: 1.1rem;
          color: #4a5568;
          font-weight: bold;
          min-height: 25px;
        }

        .quote-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .new-quote-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          flex: 1;
          max-width: 200px;
        }

        .new-quote-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .new-quote-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .tweet-quote-btn {
          background: #1da1f2;
          color: white;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tweet-quote-btn:hover {
          background: #0d8bd9;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(29, 161, 242, 0.3);
          text-decoration: none;
          color: white;
        }

        .footer {
          margin-top: 30px;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          z-index: 2;
          position: relative;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .quote-machine-container {
            padding: 15px;
          }
          
          .quote-box {
            padding: 30px 20px;
          }
          
          .quote-text {
            font-size: 1.2rem;
          }
          
          .quote-actions {
            flex-direction: column;
            gap: 15px;
          }
          
          .new-quote-btn,
          .tweet-quote-btn {
            width: 100%;
            max-width: none;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .quote-text {
            font-size: 1.1rem;
          }
          
          .quote-box {
            padding: 25px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default RandomQuoteMachine;