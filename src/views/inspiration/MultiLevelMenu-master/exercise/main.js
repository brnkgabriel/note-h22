(function () {
  'use strict';

  var support = { animations: Modernizr.cssanimations }
  var animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' }
  var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
  var onEndAnimation = function (el, callback) {
    var onEndCallbackFn = function (ev) {
      if (support.animations) {
        if (ev.target != this) return;
        this.removeEventListener(animEndEventName, onEndCallbackFn);
      }
      if (callback && typeof callback === 'function') {
        callback.call();
      };
    }
    if (support.animations) {
      el.addEventListener(animEndEventName, onEndCallbackFn);
    } else {
      onEndCallbackFn();
    }
  }

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function MLMenu(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);

    // the menus (<ul>s')
    this.menus = [].slice.call(this.el.querySelectorAll('.menu__level'));

    // index of current menu
    // Each level is actually a different menu so 0 is root, 1 is sub-1, 2 is sub-2, etc.
    this.current_menu = 0;

    // Determine what current menu actually is
    var current_menu;
    this.menus.forEach(function (menuEl, pos) {
      var items = menuEl.querySelectorAll('.menu__item');
      items.forEach(function (itemEl, iPos) {
        var currentLink = itemEl.querySelector('.menu__link--current');
        if (currentLink) {
          // This is the actual menu__level that should have current
          current_menu = pos;
        }
      })
    })

    if (current_menu) {
      this.current_menu = current_menu;
    }

    this._init();
  }

  MLMenu.prototype.options = {
    // show breadcrumbs
    breadcrumbsCtrl: true,
    // initial breadcrumb text
    initialBreadcrumb: 'all',
    // show back button
    backCtrl: true,
    // delay between each menu item sliding animation
    itemsDelayInterval: 60,
    // direction
    direction: 'r21',
    // callback: item that doesn't have a submenu gets clicked
    // onItemClick([event], [inner HTML of the clicked item])
    onItemClick: function (ev, itemName) { return false; }
  };

  MLMenu.prototype._init = function () {
    // iterate the existing menus and create an array of menus,
    // more specifically an array of objects where each one holds
    // the info of each menu element and its menu items
    this.menusArr = [];
    this.breadCrumbs = false;
    var self = this;
    var submenus = [];

    // Loops over root level menu items
    this.menus.forEach(function (menuEl, pos) {
      var menu = { menuEl: menuEl, menuItems: [].slice.call(menuEl.querySelectorAll('.menu__item')) }
      self.menusArr.push(menu);

      // set current menu class
      if (pos === self.current_menu) {
        classie.add(menuEl, 'menu__level--current');
      }

      var menu_x = menuEl.getAttribute('data-menu');
      var links = menuEl.querySelectorAll('.menu__link');
      links.forEach(function (linkEl, lPos) {
        var submenu = linkEl.getAttribute('data-submenu');
        if (submenu) {
          var pushMe = { "menu": submenu, "name": linkEl.innerHTML };
          if (submenus[pos]) {
            submenus[pos].push(pushMe)
          } else {
            submenus[pos] = [];
            submenus[pos].push(pushMe);
          }
        }
      })
    })

    // For each MENU, find their parent MENU
    this.menus.forEach(function (menuEl, pos) {
      var menu_x = menuEl.getAttribute('data-menu');
      submenus.forEach(function (subMenuEl, menu_root) {
        subMenuEl.forEach(function (subMenuItem, subPos) {
          if (subMenuItem.menu == menu_x) {
            self.menuArr[pos].backIdx = menu_root;
            self.menuArr[pos].name = subMenuItem.name;
          }
        })
      })
    })

    // create breadcrumbs
    if (self.options.breadcrumbsCtrl) {
      this.breadcrumbsCtrl = document.createElement('nav');
      this.breadcrumbsCtrl.className = 'menu__breadcrumbs';
      this.breadcrumbsCtrl.setAttribute('aria-label', 'You are here');
      this.el.insertBefore(this.breadcrumbsCtrl, this.el.firstChild);
      // add initial breadcrumb
      this._addBreadcrumb(0);

      // Need to add breadcrumbs for all parents of current submenu
      if (self.menusArr[self.current_menu].backIdx != 0 && self.current_menu != 0) {
        this._crawlCrumbs(self.menusArr[self.current_menu].backIdx, self.menusArr);
        this.breadCrumbs = true;
      }

      // Create current submenu breadcrumb
      if (self.current_menu != 0) {
        this._addBreadcrumb(self.current_menu);
        this.breadCrumbs = true;
      }
    }
    // create back button
    if (this.options.backCtrl) {
      this.backCtrl = document.createElement('button');
      if (this.breadCrumbs) {
        this.backCtrl.className = 'menu__back';
      } else {
        this.backCtrl.className = 'menu__back menu__back--hidden';
      }

      this.backCtrl.setAttribute('aria-label', 'Go back');
      this.backCtrl.innerHTML = '<span class="icon icon--arrow-left"></span>';
      this.el.insertBefore(this.backCtrl, this.el.firstChild);
    }
    // event binding
    this._initEvents();
  }

  MLMenu.prototype._initEvents = function () {
    var self = this;

    for (var i = 0, len = this.menusArr.length; i < len; ++i) {
      this.menusArr[i].menuItems.forEach(function (item, pos) {
        item.querySelector('a').addEventListener('click', function (ev) {
          var submenu = ev.target.getAttribute('data-submenu');
          var itemName = ev.target.innerHTML;
          var subMenuEl = self.el.querySelector('ul[data-menu="' + submenu + '"]');

          // check if there's a sub menu for this item
          if (submenu && subMenuEl) {
            ev.preventDefault();
            // open it
            self._openSubMenu(subMenuEl, pos, itemName);
          } else {
            // add class current
            
          }
        })
      })
    }
  }
}) ();