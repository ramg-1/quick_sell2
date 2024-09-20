import React from "react";
import './Card.css';


export const Card = ({ id, title, tags }) => {
    return (
      <div className="card">
        <h3>{id}</h3>
        <h2>{title}</h2>
        <div>
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };
  

  