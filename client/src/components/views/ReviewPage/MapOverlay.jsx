const MapOverlay = ({ place_name, address_name, place_url}, over) => {
  let close = document.createElement("div");
  close.className = 'close';
  close.onclick = () =>{
    over.setVisible(false);
  }
  
  let title = document.createElement("div");
  title.className = 'title';
  title.innerHTML = place_name;
  
  let content = document.createElement("div");
  content.innerHTML =   '        <div class="body">' +
  '            <div class="desc">' + 
  '                <div class="jibun ellipsis">'+ address_name  +'</div>' + 
  '                <div><a href="'+  place_url  +'" target="_blank" class="link">홈페이지</a></div>' + 
  '            </div>' + 
  '        </div>' ;

  let info = document.createElement("div");
  info.className = 'info';
  info.appendChild(title);
  info.appendChild(close);
  info.appendChild(content);
  
  let overlay = document.createElement("div");
  overlay.className = 'wrap';
  overlay.appendChild(info);

  return overlay
}

export default MapOverlay;
