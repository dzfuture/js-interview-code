var options = {
  url: '',
  type: 'get',
  data: {},
  success: function() {},
  error: function() {}
}

var ajax = function(options) {
  var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  var data = options.data;
  var url = options.url;
  var type = options.type.toUpperCase();
  var dataArr = [];

  for (var key in data) {
    dataArr.push(key + '=' + data[key]);
  }
  
  if (type === 'GET') {
    url = url + '?' + dataArr.join('&');
    xhr.open(type, url.replace(/\?$/g, ''), true);
    xhr.send();
  }
  if (type === 'POST') {
    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(dataArr.join('&'));
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var res;

      if (options.success && options.succcess instanceof Function) {
        res = xhr.responseText;

        if (typeof res === 'string') {
          res = JSON.parse(res);
          options.success.call(xhr, res);
        }
      }
    } else {
      if (options.error && options.error instanceof Function) {
        options.error.call(xhr);
      }
    }
  }
};

export default ajax;