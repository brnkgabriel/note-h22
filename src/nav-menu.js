export default function () {
  var navSlider = document.querySelector('.nav-btn.nav-slider');
  var nav = document.querySelector('nav');
  var overlay = document.querySelector('.overlay');

  navSlider.addEventListener('click', function () {
    overlay.style.display = 'block';
    nav.classList.toggle('open');
  });

  overlay.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open')
    }
    overlay.style.display = 'none'
  })
}