var $uList = document.querySelector('.api-dog');
var $uFav = document.querySelector('.fav-dog');
var $getDog = document.querySelector('.get-dog');
var $placeholderImg = document.querySelector('.placeholder-img');
var $pFav = document.querySelector('.p-favorites');
var $navFav = document.querySelector('.nav-item');
var $findDog = document.querySelector('.find-dog');

function renderDogs(imageString) {
  var listedElement = document.createElement('li');
  listedElement.setAttribute('class', 'random-dogs');

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

function checkFavorites() {
  var $icon = document.querySelectorAll('i');
  var $dogImage = document.querySelectorAll('.dog-img');
  var $breedName = document.querySelectorAll('.breed-name');

  for (var i = 0; i < $icon.length; i++) {
    if ($icon[i].className === 'fa-solid fa-star') {
      var newEntryObject = {};
      var dogSrcValue = $dogImage[i].getAttribute('src');
      var breedName = $breedName[i].textContent;
      newEntryObject.dogImage = dogSrcValue;
      newEntryObject.dogName = breedName;
      newEntryObject.entryId = data.nextEntryId;
      data.entries.unshift(newEntryObject);
      data.nextEntryId++;
    }
  }
}

function renderFavorites() {
  var $icon = document.querySelectorAll('i');
  for (var i = 0; i < $icon.length; i++) {
    $icon[i].className = 'fa-solid fa-star';
  }
}

function removeLi() {
  $placeholderImg.className = 'placeholder-img hidden';

  var $li = document.querySelectorAll('li');
  if ($li.length !== 0) {

    for (var j = 0; j < $li.length; j++) {
      $li[j].remove();
    }
  }
}

function get3Images() {
  checkFavorites();
  removeLi();
  $placeholderImg.className = 'placeholder-img hidden';

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
  if (event.target && event.target.matches('i')) {
    if (event.target.className === 'fa-regular fa-star') {
      event.target.className = 'fa-solid fa-star';
    } else { event.target.className = 'fa-regular fa-star'; }
  }
}
$uList.addEventListener('click', favoriteClick);

function renderEntriesLoading(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderEntriesAppear = renderDogs(data.entries[i].dogImage);
    $uFav.appendChild(renderEntriesAppear);

  }
  renderFavorites();
}

window.addEventListener('DOMContentLoaded', renderEntriesLoading);

function viewChange(stringView) {
  var $views = document.querySelectorAll('[data-view]');
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === stringView) {
      $views[i].className = ' ';
    } else { $views[i].className = ' hidden'; }
  }
}

$navFav.addEventListener('click', function () {
  if (data.entries.length !== 0) {
    $pFav.className = 'p-favorites hidden';
    var $liList = document.querySelectorAll('li');
    if ($liList.length === 0) {
      for (var i = 0; i < data.entries.length; i++) {
        var renderFavOnNav = renderDogs(data.entries[i].dogImage);
        $uFav.appendChild(renderFavOnNav);
      }
    }
    renderFavorites();
  }
  data.view = 'favorite-dogs';
  viewChange('favorite-dogs');
});

$findDog.addEventListener('click', function () {
  data.view = 'find-dogs';
  $placeholderImg.className = 'placeholder-img ';
  removeLi();
  // var $icon = document.querySelectorAll('i');
  // for (var i = 0; i < $icon.length; i++) {
  //   $icon[i].className = 'fa-regular fa-star';
  // }
  viewChange('find-dogs');

});

if (data.entries.length !== 0) {
  $pFav.className = 'p-favorites hidden';
} else { $pFav.className = 'p-favorites '; }

if (data.view === 'find-dogs') {
  viewChange('find-dogs');
}

if (data.view === 'favorite-dogs') {
  viewChange('favorite-dogs');
}
