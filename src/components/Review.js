import { React,useEffect,useState } from 'react'
import { PrismicRichText } from '@prismicio/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarHollow } from '@fortawesome/free-regular-svg-icons'



function Review( { state,review } ) {

  const [starsArray,setStarsArray] = useState([])

    // one first page render, create an array, and add 5 star objects into the array based on review score in prismic.
    // if the index of the iteration is less than the score push solid stars. Else push solid stars.
    useEffect(() => {
      let numberOfStars = []
      for (let i = 0; i < 5; i++) {
        if (i < review.data.score){
          numberOfStars.push(<FontAwesomeIcon icon={faStar} className={'review-star'} />)
        } else {
          numberOfStars.push(<FontAwesomeIcon icon={faStarHollow} className={'review-star'} />)
        }
      }
      setStarsArray(numberOfStars)
    },[])

  return (
    <div style={{width:'100%',paddingTop:'4px',paddingBottom:'4px'}}>
        {state === 'loaded' && <>
        <div style={{display:'flex', justifyContent:'start'}}>

                {review.data.author}&nbsp;

                {/* render number of starts based on the score in prismic */}
                {
                  starsArray.map((star,index) => <span key={index}>{star}</span>)
                }
        </div>

        {/* get date from prismic and parse it */}
        <div style={{fontSize:'75%'}} className={'text-secondary'}>
            Reviewed on&nbsp;
             {
                new Date(review && review.first_publication_date).toDateString()
             }
        </div>

        {/* {console.log(review)} */}
        <PrismicRichText
            field={review.data.reviewtext}
            components={{
                paragraph: ({ children }) => <blockquote>{children}</blockquote>,
        }}
/>
    </>}
    </div>
  )
}

export default Review