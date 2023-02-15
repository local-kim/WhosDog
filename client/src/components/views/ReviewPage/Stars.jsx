import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../_action/map_action';

const Stars = (props) => {
  const {avg, edit} = props;
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  useEffect(() => {
    if(avg===undefined) setClicked([false,false,false,false,false]);
    else {
      let clickStates = [...clicked];
      for (let i = 0; i < 5; i++) {
        if(i<avg){
        clickStates[i] = true;
      }
    }
      setClicked(clickStates);
    }
  },[avg])
  
  const onClickHandler = (idx) => {
    if(edit){
      let clickStates = [...clicked];
      dispatch(actionCreators.setStar(idx+1));
      for (let i = 0; i < 5; i++) {
        clickStates[i] = (i <= idx)?true:false;
      }
      
    setClicked(clickStates);
    }
  }

  return (
    <>
    {clicked.map((value, idx) => (
      <FaStar
      onClick = {()=>{onClickHandler(idx)}} 
      className={value?'yellowStar':'grayStar'} 
      />
    ))}
    </>
  )
}

export default Stars
