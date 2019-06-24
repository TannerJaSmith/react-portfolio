import React from 'react';
import PortfolioContainer from "../portfolio/portfolio-container";

export default function (props) {
    return(
        <div>
            <h2>Portfolio Detail for {props.match.params.slug}</h2>
        </div>
    );
}