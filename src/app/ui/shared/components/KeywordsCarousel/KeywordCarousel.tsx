import React from "react";
import "./KeywordsCarousel.css";

interface KeywordCarouselProps {
  keywords: string[];
}

const KeywordCarousel: React.FC<KeywordCarouselProps> = ({ keywords }) => {
  const repeatedKeywords = [...keywords, ...keywords, ...keywords];

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div className="carousel-track">
          {repeatedKeywords.map((keyword, index) => (
            <div key={index} className="carousel-words">
              <span className="carousel-item">{keyword}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordCarousel;
