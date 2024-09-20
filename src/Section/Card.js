import React from "react";
import './Card.css';


export const Card = ({ id, title, tags , orderimglink ,  statusimglink ,userImgSrc}) => {
    return (
      <div className="card">
        <p className="id-header">{id} <img className="userimg"src={userImgSrc} alt=''></img></p>
        <p>
            <img className="statusimg" src={ statusimglink } alt=''></img>
            {title}
        </p>
        <div>
           <img className="orderimg" src={orderimglink} alt=''></img> 
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };
  

  