/* exported data */
var data = {
  view: 'find-dogs',
  entries: [],
  nextEntryId: 1
};

function grabLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-project', dataJSON);
}

var previousDataJSON = localStorage.getItem('ajax-project');
if (previousDataJSON !== null) {
  previousDataJSON = JSON.parse(previousDataJSON);
  data.entries = previousDataJSON.entries;
  data.nextEntryId = previousDataJSON.nextEntryId;
  data.view = previousDataJSON.view;
}

window.addEventListener('beforeunload', grabLocalStorage);
