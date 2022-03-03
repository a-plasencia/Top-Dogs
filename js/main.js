var $uList = document.querySelector('.api-dog');
var $getDog = document.querySelector('.get-dog');
// console.log('value of $ulist is: ', $uList);
// console.log('value of $getDog is: ', $getDog);

function get3Images() {
  var xhrImage = new XMLHttpRequest();
  xhrImage.open('GET', 'https://dog.ceo/api/breeds/image/random/3');
  xhrImage.responseType = 'json';
  xhrImage.addEventListener('load', function () {
    // console.log(xhrImage.status);
    // console.log(xhrImage.response);
    for (var i = 0; i < xhrImage.response.message.length; i++) {

      var listedElement = document.createElement('li');
      var imgElement = document.createElement('img');
      imgElement.setAttribute('src', xhrImage.response.message[i]);
      listedElement.appendChild(imgElement);
      $uList.appendChild(listedElement);
    }

  });
  xhrImage.send();
}

$getDog.addEventListener('click', get3Images);
