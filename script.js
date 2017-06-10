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
    console.log(Papa.parse(text));
    var objects = csv.slice(1).map(function(arr) {
      console.log(arr);
      return {
        dateAdded: new Date(arr[0]),
        name: arr[1],
        sector: arr[2],
        description: arr[3],
        mainClaims: arr[4],
        address: arr[5],
        emailAddress: arr[6],
        facebookGroup: arr[7],
        otherLinks: arr[8],
      };
    });
    return objects;
  }
}