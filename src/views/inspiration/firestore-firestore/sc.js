
//**********************************************RATE PLUGIN******************************************


// **********************************************OTHERS ******************************************
jQuery(document).ready(function () {
  (function (window) {
    'use strict'; 
  
    function extend (a, b) {
      for (var key in b) {
        if (b.hasOwnProperty(key)) { a[key] = b[key]; }
      }
      return a;
    }
  
    function CBPFWTabs(el, options) {
      this.el = el;
      this.options = extend({}, this.options); 
      extend(this.options, options);
      this._init();
    }
  
    CBPFWTabs.prototype.options = { start: 0 };
  
    CBPFWTabs.prototype._init = function () {
      // tabs elems
      this.tabs = [].slice.call(this.el.querySelectorAll('nav > ul > li'));
      // content items
      this.items = [].slice.call(this.el.querySelectorAll('.content-wrap > section'));
      // current index
      this.current = -1;
      // show current item
      this._show();
      // init events
      this._initEvents();
    };
  
    CBPFWTabs.prototype._initEvents = function () {
      var self = this;
      this.tabs.forEach(function (tab, idx) {
        tab.addEventListener('click', function (ev) {
          ev.preventDefault();
          self._show(idx);
        });
      });
    };
  
    CBPFWTabs.prototype._show = function (idx) {
      if (this.current >= 0) {
        this.tabs[this.current].className = this.items[this.current].className = '';
      }
      // change current
      this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
      this.tabs[this.current].className = 'tab-current';
      this.items[this.current].className = 'content-current';
    };
  
    // add to global namespace
    window.CBPFWTabs = CBPFWTabs;
  })(window);
  
  (function () {
    [].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
      new CBPFWTabs(el);
    });
  })();
})
// accordion
$(document).ready(function() {
  $("#accordian a").click(function() {
      var link = $(this);
      var closest_ul = link.closest("ul");
      var parallel_active_links = closest_ul.find(".active")
      var closest_li = link.closest("li");
      var link_status = closest_li.hasClass("active");
      var count = 0;

      closest_ul.find("ul").slideUp(function() {
          if (++count == closest_ul.find("ul").length)
              parallel_active_links.removeClass("active");
      });

      if (!link_status) {
          closest_li.children("ul").slideDown();
          closest_li.addClass("active");
      }
  })
})
jQuery(document).ready(function () {

  // Firebase
  var config = {
    apiKey: "AIzaSyAn_p6aSrepFhnFUhliDfT-opdVbE353_s",
    authDomain: "service-center-92093.firebaseapp.com",
    databaseURL: "https://service-center-92093.firebaseio.com",
    projectId: "service-center-92093",
    storageBucket: "service-center-92093.appspot.com",
    messagingSenderId: "71461563582",
  };
  firebase.initializeApp(config);
  var db = firebase.firestore();
  var settings = { timestampsInSnapshots: true };

  db.settings(settings);

  var modal = document.querySelector(".modalm");
  function toggleModal() {
    jQuery('.modalm').toggleClass("show-modalm");
  }

  function windowOnClick(event) {
    if (event.target === modal) { toggleModal(); }
  }
  jQuery('.close-button').click(toggleModal);

  window.addEventListener("click", windowOnClick);
  // **************** CAROUSEL **************************
  populateHTML(brands, "");
  populateHTML(brands_el, "_el");
  populateHTML(brands_co, "_co");
  populateHTML(brands_hl, "_hl");
  populateHTML(brands_mtp, "_mtp");
  populateHTML(brands_etp, "_etp");
  populateHTML(brands_ctp, "_ctp");
  populateHTML(brands_htp, "_htp");

  generateAccordion("");
  generateAccordion("_el");
  generateAccordion("_co");
  generateAccordion("_hl"); 
  generateAccordion("_mtp");
  generateAccordion("_etp");
  generateAccordion("_ctp");
  generateAccordion("_htp");

  function getCentersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("ratedCenters"));
  }

  function hasBeenRated(id) {
    var ratedCenters = getCentersFromLocalStorage();
    var isAlreadyRated = false;
    if (ratedCenters !== null) {
      for (var i = 0; i < ratedCenters.length; i++) {
        if (ratedCenters[i].id === id) {
          isAlreadyRated = true;
          break;
        }
      }
    }
    return isAlreadyRated;
  }

  function attachStarRatingHandlers(id, rating) {
    $('#rate-' + id + ' button').on('mouseover', function () {
      var onStar = parseInt($(this).data('value'), 10);
      // Now highlight all the stars that's not after the current hovered star
      $('#rate-' + id + ' button.star').each(function (e) {
        if (e < onStar) { $(this).addClass('hover'); }
        else { $(this).removeClass('hover'); }
      });
    })

    $('#rate-' + id + ' button').on('mouseout', function () {
      $('#rate-' + id + ' button.star').each(function (e) {
        $(this).removeClass('hover');
      });
    });

    $('#rate-' + id + ' button').on('click', function () {
      var onStar = parseInt($(this).data('value'), 10); // The star currently selected
      var stars = $('#rate-' + id + ' button.star');

      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
        $(stars[i]).prop('disabled', true);
      }

      for (i = 0; i < onStar; i++) { $(stars[i]).addClass('selected'); }

      var ratingValue = parseInt($('#rate-' + id + ' button.selected').last().data('value'), 10);
      console.log('rating value is', ratingValue);
      setAndUpdateRating(id, rating, ratingValue);
      updateRateCenterDisplay(ratingValue, id);
      // var ratingText = '';
      // ratingValue === 1 ? ratingText = ratingValue + ' star' : ratingText = ratingValue + ' stars';
      // jQuery("#rate-" + id).text(" You rated this center with " + ratingText);
    });
  }

  function updateRateCenterDisplay(ratingValue, id) {
    var ratingText = '';
    ratingValue === 1 ? ratingText = ratingValue + ' star' : ratingText = ratingValue + ' stars';
    jQuery("#rate-" + id).text(" You rated this center with " + ratingText);
  }

  function setAndUpdateRating(id, databaseRating, newRating) {
    var dbRating = databaseRating.split("|");
    if (parseInt(newRating) === 1) { dbRating[0] = (parseInt(dbRating[0]) + 1).toString(); }
    else if (parseInt(newRating) === 2) { dbRating[1] = (parseInt(dbRating[1]) + 1).toString(); }
    else if (parseInt(newRating) === 3) { dbRating[2] = (parseInt(dbRating[2]) + 1).toString(); }
    else if (parseInt(newRating) === 4) { dbRating[3] = (parseInt(dbRating[3]) + 1).toString(); }
    else if (parseInt(newRating) === 5) { dbRating[4] = (parseInt(dbRating[4]) + 1).toString(); }

    db.collection("centers").doc(id)
      .update({ "rating": dbRating.join("|") })
      .then(function () {
        var ratedCenters = [];
        var ratedCenter = {
          id: id,
          newRating: newRating,
          rating: dbRating.join("|")
        }
        if (getCentersFromLocalStorage() !== null) {
          ratedCenters = getCentersFromLocalStorage();
        }
        ratedCenters.push(ratedCenter);
        localStorage.setItem("ratedCenters", JSON.stringify(ratedCenters));
        // rate here
      });
  }

  function averageRating(data) {
    var rating = data.split("|")
    var frequency = parseInt(rating[0]) + parseInt(rating[1]) + parseInt(rating[2]) + parseInt(rating[3]) + parseInt(rating[4]);
    var dataValue = (parseInt(rating[0]) * 1) + (parseInt(rating[1]) * 2) + (parseInt(rating[2]) * 3) + (parseInt(rating[3]) * 4) + (parseInt(rating[4]) * 5);
    if (frequency === 0) { frequency = 1; }
    return Math.round((dataValue / frequency) * 10) / 10;
  }

  function updateRateStatus(id, rating) {
    var ratingArray = rating.split("|");
    var totalRating = 0;
    for (var i = 0; i < ratingArray.length; i++) {
      totalRating += parseInt(ratingArray[i]);
    }

    jQuery("#rate-qty-" + id + ".rate-qty.one").text(ratingArray[0] + " votes" + " (" + ratio(ratingArray[0], totalRating) * 100 + "%)");
    jQuery("#rate-qty-" + id + ".rate-qty.two").text(ratingArray[1] + " votes" + " (" + ratio(ratingArray[1], totalRating) * 100 + "%)");
    jQuery("#rate-qty-" + id + ".rate-qty.three").text(ratingArray[2] + " votes" + " (" + ratio(ratingArray[2], totalRating) * 100 + "%)");
    jQuery("#rate-qty-" + id + ".rate-qty.four").text(ratingArray[3] + " votes" + " (" + ratio(ratingArray[3], totalRating) * 100 + "%)");
    jQuery("#rate-qty-" + id + ".rate-qty.five").text(ratingArray[4] + " votes" + " (" + ratio(ratingArray[4], totalRating) * 100 + "%)");

    jQuery("#rate-bar-" + id + ".rate-bar.one").css("width", ratio(ratingArray[0], totalRating) * 100 + "%");
    jQuery("#rate-bar-" + id + ".rate-bar.two").css("width", ratio(ratingArray[1], totalRating) * 100 + "%");
    jQuery("#rate-bar-" + id + ".rate-bar.three").css("width", ratio(ratingArray[2], totalRating) * 100 + "%");
    jQuery("#rate-bar-" + id + ".rate-bar.four").css("width", ratio(ratingArray[3], totalRating) * 100 + "%");
    jQuery("#rate-bar-" + id + ".rate-bar.five").css("width", ratio(ratingArray[4], totalRating) * 100 + "%");
  }

  function ratio(num, den) {
    var fraction = Math.round((num / den) * 1000) / 1000;
    return (den === 0) ? 0 : fraction;
  }
  // **************** POPULATE HTML ********************* 
  function populateHTML(data, suffix) {
    // attachRating(data);
    data.forEach(function (br, index) {
      var brandName = br.brand.toLowerCase().trim();
      var brandId = brandName + '-' + index;
      var brand_filter = '';
      if (
        br.brand === "Tecno-Infinix-Itel" ||
        br.brand === "HP-Dell-Lenovo-Acer" ||
        br.brand === "Wiko-Lenovo-Huawei"
      ) { brand_filter = br.brand.replace(/-/g, '/') }
      else { brand_filter = br.brand.replace(/-/g, ' ') }
      jQuery('#card' + suffix).append(
        jQuery('<div />', { class: 'ac-element' + suffix }).append(
          jQuery('<h1 />', { class: 'title-no-margin' + suffix, text: brand_filter }),
          jQuery('<div />', { class: 'content' + suffix, id: brandId })
        )
      )
      br.states.forEach(function (st, index) {
        jQuery('#' + brandId).append(
          jQuery('<div />', {
            class: ('canClick' + suffix + ' ' + brandName + '-' + index),
            text: st.state,
          }).click(function () {
            var title = '<h2 class="detailTitle">' + br.brand + '-' + st.state + ' Centers' + '</h1>';
            var details = '';
            st.centers.forEach(function (ct) {
              // fetch and update rating from firestore
              // attach a listener to listen for rating changes
              // asynchronous event. Fires after toggleModal() has been called
              db.collection("centers").where("id", "==", ct.id.toString())
                .onSnapshot(function (snapshot) {
                  snapshot.docChanges().forEach(function (change) {
                    if (!hasBeenRated(ct.id)) {
                      console.log('in here')
                      attachStarRatingHandlers(ct.id, change.doc.data().rating);
                    }
                    else {
                      var ratedCenters = getCentersFromLocalStorage();
                      var ratingValue;
                      if (ratedCenters !== null) {
                        for (var i = 0; i < ratedCenters.length; i++) {
                          if (ratedCenters[i].id === ct.id) {
                            ratingValue = ratedCenters[i].newRating;
                            break;
                          }
                        }
                      }

                      updateRateCenterDisplay(ratingValue, ct.id);
                      // var ratingText = '';
                      // ratingValue === 1 ? ratingText = ratingValue + ' star' : ratingText = ratingValue + ' stars';
                      // jQuery("#rate-" + ct.id).text(" You rated this center with " + ratingText);
                    }
                    jQuery('#' + ct.id).html(averageRating(change.doc.data().rating));
                    updateRateStatus(ct.id, change.doc.data().rating);
                  });
                });
              // fill up center details
              details += '<div class="centerDetailItem' + suffix + '">';
              details += '<div><strong>Service Center:</strong> ' + ct.sCenter + '</div>';
              details += '<div><strong>Region:</strong> ' + ct.region + '</div>';
              if (ct.address) {
               details += '<div><strong>Address:</strong> ' +
                ct.address + ' <a target="_blank" class="map" href="' + ct.map + '">view map</a></div>';
              }
              details += '<div><strong>Phone:</strong> ' + ct.phone + '</div>';
              if (ct.address2) {
                details += '<div><strong>Address 2:</strong> ' +
                  ct.address2 + ' <a target="_blank" class="map" href="' + ct.map2 + '">view map</a></div>';
                details += '<div><strong>Phone 2:</strong> ' + ct.phone2 + '</div>';
              }

              if (ct.email) {
                details += '<div><strong>Email:</strong> ' + ct.email + '</div>';
              }

              if (ct.warranty) {
                details += '<div><strong>Warranty:</strong> ' + ct.warranty + '</div>';
              }
              var rateMarkup = "<div id='rate-" + ct.id + "' class='rating-stars'><button class='star' data-value='1'><i class='fa fa-star fa-fw'></i></button><button class='star' data-value='2'><i class='fa fa-star fa-fw'></i></button><button class='star' data-value='3'><i class='fa fa-star fa-fw'></i></button><button class='star' data-value='4'><i class='fa fa-star fa-fw'></i></button><button class='star' data-value='5'><i class='fa fa-star fa-fw'></i></button></div>";
              details += '<div class="rating"><strong>Rate Center:</strong>' + rateMarkup + '</div>';
              details += '<div><strong>Average Rating:</strong> <span id="' + ct.id + '">0</span></div>';
              // Rating Status
              details += '<div class="rate-status"><span class="rate-title">5 Star</span><div class="bar-container"><div id="rate-bar-' + ct.id + '" class="rate-bar five"></div></div><span class="rate-qty five" id="rate-qty-' + ct.id + '"></span></div>';
              details += '<div class="rate-status"><span class="rate-title">4 Star</span><div class="bar-container"><div id="rate-bar-' + ct.id + '" class="rate-bar four"></div></div><span class="rate-qty four" id="rate-qty-' + ct.id + '"></span></div>';
              details += '<div class="rate-status"><span class="rate-title">3 Star</span><div class="bar-container"><div id="rate-bar-' + ct.id + '" class="rate-bar three"></div></div><span class="rate-qty three" id="rate-qty-' + ct.id + '"></span></div>';
              details += '<div class="rate-status"><span class="rate-title">2 Star</span><div class="bar-container"><div id="rate-bar-' + ct.id + '" class="rate-bar two"></div></div><span class="rate-qty two" id="rate-qty-' + ct.id + '"></span></div>';
              details += '<div class="rate-status"><span class="rate-title">1 Star </span><div class="bar-container"><div id="rate-bar-' + ct.id + '" class="rate-bar one"></div></div><span class="rate-qty one" id="rate-qty-' + ct.id + '"></span></div>';
              details += '</div>';
            })

            jQuery('#centers-content').html(title + '<div class="centerDetails' + suffix + '">' + details + '</div>');
            // remove next two lines and take them to onSnapshot listener (line 3346)
            // as well as the then block of setAndUpdateRating update function (line 3280)
            toggleModal();
          })
        )
      })
    })
  }

  // *************************************************** GENERATE ACCORDION ***************************************
  function generateAccordion(suffix) {
    var gianniAccordion = (function () {
      return class {

        transitionendEventName() {
          var i,
            el = document.createElement('div'),
            transitions = {
              'transition': 'transitionend',
              'OTransition': 'otransitionend',
              'MozTransition': 'transitionend',
              'WebkitTransition': 'webkitTransitionEnd'
            };

          for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
              return transitions[i];
            }
          }
        }

        expand(el) {
          function resetHeight(ev) {
            if (ev.target != el.content) return
            el.content.removeEventListener(this.transitionendevent, bindEvent);

            if (!el.isOpen) return

            requestAnimationFrame(() => {
              el.content.style.transition = '0';
              el.content.style.height = 'auto';

              requestAnimationFrame(() => {
                el.content.style.height = null;
                el.content.style.transition = null;

                this.fire("elementOpened", el);
              });
            });
          }

          var bindEvent = resetHeight.bind(this);
          el.content.addEventListener(this.transitionendevent, bindEvent);

          el.isOpen = true;
          el.content.style.height = el.content.scrollHeight + "px";
        }

        collapse(el) {

          function endTransition(ev) {
            if (ev.target != el.content) return
            el.content.removeEventListener(this.transitionendevent, bindEvent);

            if (el.isOpen) return

            this.fire("elementClosed", el);
          }

          var bindEvent = endTransition.bind(this);
          el.content.addEventListener(this.transitionendevent, bindEvent);

          el.isOpen = false;

          requestAnimationFrame(() => {
            el.content.style.transition = '0';
            el.content.style.height = el.content.scrollHeight + "px";

            requestAnimationFrame(() => {
              el.content.style.transition = null;
              el.content.style.height = 0;
            });
          });
        }

        open(el) {
          el.selected = true;
          this.fire("elementSelected", el);
          this.expand(el);
          el.wrapper.classList.add(this.selectedClass);
        }

        close(el) {
          el.selected = false;
          this.fire("elementUnselected", el);
          this.collapse(el);
          el.wrapper.classList.remove(this.selectedClass);
        }

        toggle(el) {
          if (el.selected) {
            this.close(el);
          } else {
            this.open(el);

            if (this.oneAtATime) {
              this.els.filter(e => e != el && e.selected).forEach(e => {
                this.close(e);
              });
            }
          }
        }

        attachEvents() {
          this.els.forEach((el, i) => {
            el.trigger.addEventListener("click", this.toggle.bind(this, el));
          });
        }

        setDefaultData() {
          this.els = [];
          this.events = {
            'elementSelected': [],
            'elementOpened': [],
            'elementUnselected': [],
            'elementClosed': []
          };
          this.transitionendevent = this.transitionendEventName();
          this.oneAtATime = true;
          this.selectedClass = "selected";
          this.trigger = ".title-no-margin" + suffix;
          this.content = ".content" + suffix;
        }

        setCustomData(data) {
          var keys = Object.keys(data);

          for (var i = 0; i < keys.length; i++) {
            this[keys[i]] = data[keys[i]];
          }
        }

        fire(eventName, el) {
          var callbacks = this.events[eventName];
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](el)
          }
        }

        on(eventName, cb) {
          if (!this.events[eventName]) return
          this.events[eventName].push(cb);
        }

        constructor(data) {
          this.setDefaultData();
          this.setCustomData(data); // ES6 => Object.assign(this, data)

          [].forEach.call(document.querySelectorAll(this.elements), (el, i) => {
            this.els.push({
              wrapper: el,
              trigger: el.querySelector(this.trigger),
              content: el.querySelector(this.content)
            });

            this.els[i].content.style.height = 0;
          });

          this.attachEvents();
        }

      }
    })();

    var myAccordion = new gianniAccordion({
      elements: ".card" + suffix + " " + ".ac-element" + suffix
    });

    myAccordion.on("elementSelected", (data) => {
      console.log("elementOpened", data);
    });
  }
});