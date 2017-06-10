var KEY = 'AIzaSyBurnP2Y9-YavLSun_85ZntENUfF4w45OE'

function jsonp (url, cb) {
  var cbName = _generateRandomString()
  window[cbName] = function () {
    cb()
    delete window[cbName]
  }

  var script = document.createElement('script')
  script.src = url + '&callback=' + cbName
  document.body.appendChild(script)
}

function _generateRandomString () {
  return Math.random().toString(36).substring(2)
}

function initMap () {
  var uluru = { lat: 32.0853, lng: 34.7818 }
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  })
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  })
}

jsonp('https://maps.googleapis.com/maps/api/js?key=' + KEY, initMap)

/**
 * gets a template string and creates a html render of it,
 * with the obj as params.
 * @param {string} template 
 * @param {object} obj
 */
function render (templateString, obj) {
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }
  return templateString.replace(/{{.+}}/g, function (found) {
    var content = obj[found.replace('{{', '').replace('}}', '')]
    for (var el in entityMap) {
      content = content.replace(new RegExp(el, 'g'), entityMap[el])
    }
    return content
  })
}

var template = document.getElementById('sidebartemplate').innerHTML
var tempData = {
  address: 'החשמונאים 29',
  status: 'פעיל',
  description: 'בניין מדהים',
  claims: 'הבניין הכי טוב אי פעם'
}

var rendered = render(template, tempData)
console.log(rendered)
$('#slide-out').html(rendered)
