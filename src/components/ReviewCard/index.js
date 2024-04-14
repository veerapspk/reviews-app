
import StarRatings from 'react-star-ratings';

import './index.css'


const ratingImages=["https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png","https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png","https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png","https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png","https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png","https://assets.ccbp.in/frontend/react-js/rating-five-stars-img.png",]

const ReviewCard=(props)=>{
    const {eachReview,bgColor}=props
    const {Name,Platform,Reviews,link,rating}=eachReview
    
    return(
        <li className='card'>
            <div className='profile-container'>
            <div className='profile-logo-container' style={{ backgroundColor: bgColor }}>
                <p className='profile-text'>{Name[0]}</p>
               
            </div>
            <div className='profile-details-container'>
                <p className='profile-name-and-platform'><span >Name :</span>{Name}</p>
                <p className='profile-name-and-platform'><span>Platform :</span>{Platform}</p>
              
            </div>
           
            </div>
            <hr/>
            
            <div className='review-description-container'>
                <div>
            <StarRatings
        rating={rating} 
        starRatedColor="gold"
        numberOfStars={5} 
        starDimension="15px"
        name="rating"

      />
                <p className='review-description'>{Reviews}</p></div>
                <a href={link} target='_blank'>Visit Review  </a>
            </div>
        

            
        </li>
    )
}

export default ReviewCard