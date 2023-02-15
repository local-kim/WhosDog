import React,{ useState, useEffect, useMemo, createContext } from 'react';
import Star from './Stars';
import { useDispatch, useSelector } from 'react-redux';
import ReviewList from './ReviewList';
import { getReviewList, createReview, actionCreators } from '../../../_action/map_action';

export const ReviewContext = createContext({
  reviewData: [],
})

const Modal = ( props, {history} ) => {
  const {open, close, place} = props;
  const [reviewData, setReviewData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [review, setReview] = useState('');
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
      dispatch(getReviewList(place.id))
      .then(response => {
        setReviewData(response.payload.review);
      })}
  }, [place])

  const value = useMemo(() => ({ reviewData }),[reviewData]);

  return (
    <div className={ open ? 'openModal modal': 'modal'}>
        { open ? (
          <section>
            <header>
            {place.place_name}
              <button className="close" onClick={close}>&times;</button>
            </header>
            <main>
              <Star avg={place.avg} edit={false}/> <span>({place.avg})</span>
              <a href="'+  place.place_url  +'" target="_blank" className="link">홈페이지</a><br/>
              {place.address_name}
            </main>
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
            <footer>
            </footer>
          </section>
        ):null}
      </div>
    
  )
}

export default Modal;