import React,{ useState, useEffect, useMemo, createContext } from 'react'
import Star from './Stars';
import { useDispatch, useSelector } from 'react-redux';
import ReviewList from './ReviewList';
import { getReviewList, createReview, actionCreators, getStars } from '../../../_action/map_action';

export const ReviewContext = createContext({
  reviewData: [],
})

const ReviewForm = ({place}) => {
  const [reviewData, setReviewData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [review, setReview] = useState('');
  const [avg, setAvg] =useState(0);
  const { star } =  useSelector(state => ({
    star:state.map.review.star
  }));
  const dispatch = useDispatch();
  
  const onReviewHandler = (e) => {
    e.preventDefault();
    setReview(e.currentTarget.value);
  }
  const onClickHandler = () => {
    clicked ? setClicked(false) : setClicked(true); 
  }

  const onSubmitHandler = () => {
    let body = {
      locationId:place.id,
      star:star,
      review:review,
    };
    dispatch(createReview(body))
    .then(response => {
      dispatch(actionCreators.setStar(0));
      window.location.replace("/Review")
    })
    clicked ? setClicked(false) : setClicked(true); 
  }

  useEffect(() => {
    if(place.id!==undefined){
      dispatch(getStars(place.id))
      .then(response => {
          if(response.payload.stars!==null) {
              place.avg = response.payload.stars.toFixed(2);
              dispatch(getReviewList(place.id))
              .then(response => {
            setReviewData(response.payload.review);
          })
          } else {
              place.avg = 0;
          }
      })
      
    }
  }, [place.id])

  const value = useMemo(() => ({ reviewData }),[reviewData]);

  return (
    <div className="review">
      <section>
        <header>
          {place.place_name}
        </header>
        <main>
         <Star avg={place.avg} edit={false}/> <span>({place.avg})</span>
          <a href="'+  place.place_url  +'" target="_blank" className="link">홈페이지</a><br/>
          {place.address_name}
          </main>
        </section>
          <div className="card">
              {clicked?
                <>
                  <div>
                    <Star edit={true}/>
                  </div>
                  <textarea value={review} onChange={onReviewHandler} className="review" placeholder="리뷰를 입력하세요"/>
                  <div>
                    <button className="btn" onClick={onSubmitHandler}>등록</button><button className="btn" onClick={onClickHandler}>취소</button>
                  </div>                
                </>
                :<button onClick={onClickHandler} className="reviewWriteBtn">리뷰등록</button>
              }
          </div>
          
          <div className="reviewList">
              <ReviewContext.Provider value ={ value }>
                <ReviewList/>
              </ReviewContext.Provider>
          </div>
        
    </div>
  )
}

export default ReviewForm
