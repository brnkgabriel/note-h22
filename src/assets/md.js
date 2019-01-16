(function () {
  var btns, self, ripple, size, rippleX, rippleY, eWidth, eHeight;
  btns = document.querySelectorAll('.ripple-effect');
  btns.forEach(btn => {
    btn.addEventListener('mousedown', function (e) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      if (!btn.querySelector('.ripple')) {
        var rippleSpan = document.createElement('span');
        rippleSpan.setAttribute('class', 'ripple')
        btn.appendChild(rippleSpan)
      }
      ripple = btn.querySelector('.ripple');
      ripple.classList.remove('animated')

      eWidth = btn.clientWidth
      eHeight = btn.clientHeight
      size = Math.max(eWidth, eHeight);

      ripple.setAttribute('style', `height: ${size}px;width: ${size}px;`)
      rippleX = parseInt(e.pageX - (btn.getBoundingClientRect().left + window.scrollX)) - (size / 2);
      rippleY = parseInt(e.pageY - (btn.getBoundingClientRect().top + window.scrollY)) - (size / 2);

      ripple.style.top = rippleY + 'px';
      ripple.style.left = rippleX + 'px';
      ripple.classList.add('animated');

      // setTimeout(() => {
      //   btn.removeChild(ripple)
      // }, 800);
    })
  })
})();