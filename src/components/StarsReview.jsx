
import React, { useState } from 'react';
import {Text} from "@mantine/core";
import {showAlert} from "../utils";
const Star = ({ isSelected, ...rest }) => (
    <span {...rest} style={{ cursor: 'pointer', color: isSelected ? 'gold' : 'grey', fontSize:20 }}>★</span>
);


export const StarReview = ({ onRate }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const handleClick = (rate) => {
        setRating(rate);
        if (onRate) {
            onRate(rate);
            showAlert('Спасибо за оценку!');
        }
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    isSelected={star <= (hover || rating)}
                />
            ))}
        </div>
    );
};


