var KEY = 'AIzaSyBurnP2Y9-YavLSun_85ZntENUfF4w45OE';

function _generateRandomString() {
  return Math.random().toString(36).substring(2);
}

function _getInput() {
  return document.getElementById('search');
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

function downloadPlaces(cb) {
  var xhr = new XMLHttpRequest;
  xhr.open("GET", "http://cfm-csv-proxy.hstatic.org");
  xhr.onload = function(e) {
    cb(null, parse(xhr.responseText));
  };
  xhr.onerror = function(e) { 
    var err = new Error("Unable to download CSV");
    err.data = e;
    cb(err) 
  };
  xhr.send();
  function parse(text) {
    var csv = Papa.parse(text).data.slice(1);
    
    var objects = csv.slice(1).map(function(arr) {
      return {
        name: arr[0],
        serialNumber: arr[1],
        field: arr[2],
        description: arr[3],
        mainClaims: arr[4],
        status: arr[5],
        address: "פרי מגדים 34, מבשרת ציון",
        facebookGroup: "https://www.facebook.com/groups/728808320520784/",
      };
    });
    return object;
  }
}