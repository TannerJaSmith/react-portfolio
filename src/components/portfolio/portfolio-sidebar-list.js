import React from 'react';
import PortfolioItem from './portfolio-item';

const PortfolioSidebarList = (props) => {
    const portfolioList = props.data.map(portfolioItem => {
        return(
            <div className="portfolio-item-thumb">
                <div className="portfolio-thumb-img">
                    <img src={portfolioItem.thumb_image_url}/>
                </div>
                <hl className="title">{portfolioItem.name}</hl>
                <h2>{portfolioItem.id}</h2>
            </div>
        );
    });
    
    return(
        <div className="portfolio-sidebar-list-wrapper">
            {portfolioList}
        </div>
    );
}

export default PortfolioSidebarList;