var KEY = 'AIzaSyBurnP2Y9-YavLSun_85ZntENUfF4w45OE';

function _generateRandomString() {
  return Math.random().toString(36).substring(2);
}

function _getInput() {
  return document.getElementById('pac-input');
}
function jsonp(url, cb) {
  var cbName = _generateRandomString();
  window[cbName] = function () {
    cb();
    delete window[cbName];
  }

  var script = document.createElement('script');
  script.src = url + '&callback=' + cbName;
  document.body.appendChild(script);
}


function initMap() {
  var uluru = { lat: 32.0853, lng: 34.7818 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var input = _getInput();
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

jsonp('https://maps.googleapis.com/maps/api/js?libraries=places&key=' + KEY, initMap);