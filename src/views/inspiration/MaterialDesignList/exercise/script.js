var container = document.querySelector('#container');
var listItems = document.querySelectorAll('.list-view li');
var back = document.querySelector('.back');
var selected = null;

function toggle() {
  selected.classList.toggle('active');
  container.classList.toggle('details');
}

listItems.forEach(listItem => {
  listItem.addEventListener('click', evt => {
    selected = evt.currentTarget;
    toggle();
  })
  back.addEventListener('click', toggle)
})