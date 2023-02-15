/*global kakao*/ 
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../_action/map_action';
import { userInfo } from '../../../_action/user_action';
const { kakao } = window;

const Map = ({ latitude, longitude, searchKeyword }) => {   
  const dispatch = useDispatch();
  const history = useHistory();
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  useEffect(() => {
    dispatch(userInfo())
    .then(response => {
      if(response.payload.success){
          setLat(response.payload.latitude);
          setLon(response.payload.longitude);
      } else {
        alert('로그인이 필요합니다.');
        history.push('/login');
        window.location.reload();
      }
        });
  },[]);

  useEffect(() => {
    dispatch(actionCreators.setMap(null), []);
    const container = document.getElementById('myMap'); 
  
    const options = {
      center:new kakao.maps.LatLng(lat!==''?lat:33.450701, lon!==''?lon:126.570667),
      level:3
    }
    const map = new kakao.maps.Map(container, options);

    dispatch(actionCreators.setMap(map), [map]);
  },[lat,lon]);

  return (
    <>
      <div id="myMap" className="w-100 mt-3 mb-3" style={{ height:"500px" }} ></div>      
    </>
  )
}

export default Map;