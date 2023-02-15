const Location = () => {
 
  const success = ( position ) => {
    let location = { 
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    };
    return location;
  }

  const error = () => {
    // 에러 발생시 DB에서 기존 좌표 받아와야 함. 수정이 안되어있음.
  };

  if(!navigator.geolocation) {
  } else {
    navigator.geolocation.getCurrentPosition(success, error);  
  }
}

export default Location;
