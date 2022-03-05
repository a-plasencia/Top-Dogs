var $uList = document.querySelector('.api-dog');
var $getDog = document.querySelector('.get-dog');
var $placeholderImg = document.querySelector('.placeholder-img');
// var $star = document.querySelectorAll('.fa-star');
var starClicks = true;

function renderDogs(imageString) {
  var listedElement = document.createElement('li');

  var divParentElement = document.createElement('div');
  divParentElement.setAttribute('class', 'dog-card');

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', imageString);
  imgElement.setAttribute('class', 'dog-img');
  imgElement.setAttribute('alt', 'dog');

  var divSibilingElement = document.createElement('div');
  divSibilingElement.setAttribute('class', 'column-full justify-between');

  var dogBreedName = imageString;
  dogBreedName = dogBreedName.split('/');
  dogBreedName = dogBreedName[4];
  dogBreedName = breedNameString(dogBreedName);

  var pElement = document.createElement('p');
  pElement.setAttribute('class', 'breed-name');
  pElement.textContent = dogBreedName;

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fa-regular fa-star');

  listedElement.appendChild(divParentElement);
  divParentElement.appendChild(imgElement);
  divParentElement.appendChild(divSibilingElement);
  divSibilingElement.appendChild(pElement);
  divSibilingElement.appendChild(icon);

  return listedElement;
}

function breedNameString(string) {
  var oneWord;
  var breedString = string;
  var arrayString = string.split('');
  for (var i = 0; i < arrayString.length; i++) {
    if (arrayString[i] !== '-') {
      oneWord = true;
    }
    if (arrayString[i] === '-') {
      oneWord = false;
      break;
    }
  }
  if (oneWord === true) {
    var firstLetter = breedString.charAt(0).toUpperCase();
    breedString = firstLetter + breedString.slice(1);
    return breedString;
  } else {
    breedString = breedString.split('-');
    breedString.reverse();
    for (var j = 0; j < breedString.length; j++) {
      var firstLetters = breedString[j].charAt(0).toUpperCase();
      breedString[j] = firstLetters + breedString[j].slice(1);
    }
    breedString = breedString.join(' ');
    return breedString;
  }
}

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
      var renderDogsAppear = renderDogs(xhrImage.response.message[i]);
      $uList.appendChild(renderDogsAppear);
    }

  });
  xhrImage.send();
}

$getDog.addEventListener('click', get3Images);

function favoriteClick(event) {
  starClicks = !starClicks;
  if (starClicks === true) {
    event.target.className = 'fa-regular fa-star';
  } else {
    event.target.className = 'fa-solid fa-star';
  }

}
$uList.addEventListener('click', favoriteClick);
