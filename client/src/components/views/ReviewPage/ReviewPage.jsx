/*global kakao*/ 
import React, { useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../../_action/map_action';
import NavBarLogin from '../NavBar/NavBarLogin';
import Map from './Map';
import Header from '../NavBar/Header';
import MapOverlay from './MapOverlay';
import ReviewForm from './ReviewForm';

const { kakao } = window;

const MapPage = () => {
    const [keyword, setKeyword] = useState('');
    const [placeInfo, setPlaceInfo] = useState({});
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { map, markers, overlays } = useSelector( state => ({
        map: state.map.myMap.map,
        markers: state.map.myMap.markers,
        overlays: state.map.myMap.overlays
    })); 
    let markerArray = [];
    let overlayArray = [];
    const onKeywordHandler = (e) => {
        setKeyword(e.currentTarget.value);
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword !== '') {
            const ps = new kakao.maps.services.Places(map);
            ps.keywordSearch(keyword, placesSearchCB, {useMapBounds:true});
            setKeyword('');
        }
    }

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            if(markers.length > 0) {deleteMarker();}
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }   
        dispatch(actionCreators.addMarker(markerArray, overlayArray),[markerArray, overlayArray]);
        dispatch(actionCreators.setMap(map), [map]);
        }
    } 

    const displayMarker = (place) => {
        let position = new kakao.maps.LatLng(place.y, place.x);
        var marker = new kakao.maps.Marker({
            position: position
        });

        var overlay = new kakao.maps.CustomOverlay({
            map: map,
            position: position   
        });
        
        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, 'click', () => {
            setPlaceInfo(place);
            openModal();
        });
        
        overlay.setContent(MapOverlay(place, overlay));
        overlay.setVisible(false);
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        // 생성된 마커를 배열에 추가합니다
        markerArray.push(marker);
        overlayArray.push(overlay);
    }

    const deleteMarker = () => {
        for( let i =0; i<markers.length; i++){
            markers[i].setMap(null);
            overlays[i].setMap(null);
        }
    }

    const openModal = useCallback(() => {
        setShow(true);
    },[]);
    
    const value = useMemo(() => ({ keyword }), [keyword]);

    return (
        <>
            <Header/>
            <NavBarLogin />
            <div className="container-custom">
            <div className="card-custom">
                <div className="commuNav">     
                <form onSubmit={onSubmitHandler}>     
                    <input id='searchkeyword' type="text" value={keyword} onChange={onKeywordHandler}/>
                    <button className="communityBtn" type="submit">검색</button>
                </form>
                </div>
                <Map searchKeyword={value}/>
                {/* {modalOpen? <Modal open={modalOpen} close={closeModal} place={placeInfo}/> : null} */}
                {show? <ReviewForm place={placeInfo}/> : null }
            </div>
            </div>
        </>
    )
}

export default MapPage;
