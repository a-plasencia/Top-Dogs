var $uList = document.querySelector('.api-dog');
var $getDog = document.querySelector('.get-dog');
var $placeholderImg = document.querySelector('.placeholder-img');

function get3Images() {
  $placeholderImg.className = 'placeholder-img hidden';
  var $li = document.querySelectorAll('li');
  if ($li.length !== 0) {
    for (var j = 0; j < $li.length; j++) {
      $li[j].remove();
    }
  }
  var xhrImage = new XMLHttpRequest();
  xhrImage.open('GET', 'https://dog.ceo/api/breeds/image/random/3');
  xhrImage.responseType = 'json';
  xhrImage.addEventListener('load', function () {

    for (var i = 0; i < xhrImage.response.message.length; i++) {

      var listedElement = document.createElement('li');
      var imgElement = document.createElement('img');
      imgElement.setAttribute('src', xhrImage.response.message[i]);
      imgElement.setAttribute('class', 'dog-img');
      listedElement.appendChild(imgElement);
      $uList.appendChild(listedElement);
    }

  });
  xhrImage.send();
}

$getDog.addEventListener('click', get3Images);
