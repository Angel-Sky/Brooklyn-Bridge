$(document).ready(function () {
  var bigBox = $('.big-box');
  bigBox.css({display: 'none'});
  var windowWidth = $( window ).width();
  var error = '';
  var wrapper = $('#wrapper');

  bigBox.width(Number(windowWidth - 400) + 'px');
  //On resize to change the size of the Modal
  $(window).resize(function () {
    bigBox.width(Number($( window ).width() - 300) + 'px');
  });

  //Modal with info
  var wrapperBox = $('<div class="wrapperBox"></div>');
  bigBox.append(wrapperBox);

  //X to close the Modal later
  bigBox.append('<div class="closeX">x</div>');

  $('.planet').click(function () {
    wrapperBox.empty();
    wrapper.addClass('toggled');
    var planetName = $(this).attr('data-planet');
    $.ajax({
      url: 'https://solar-system-3699c.firebaseio.com/.json',
      success: function (data) {
        ajaxSuccess(data, planetName);
      },
      error: function () {
        wrapperBox.append('<div class="error">There was error we are sorry.</div>');
      }
    });
   });

  function ajaxSuccess(json, planetName) {
      for(var i in json) {
        var solarSystem = json[i];
        for(var k in solarSystem) {
          var allPlanets = solarSystem[k];
          var singlePlanet = allPlanets[planetName];
          showClickedPlanetData(singlePlanet);
        }
      }
    }

    function showClickedPlanetData(singlePlanet) {
      bigBox.css({display: 'block'});
      //append planet info
      wrapperBox.append(
        '<div class="planet-info"><span>Overview: </span>'+ singlePlanet['overview'] +'</div>',
        '<div class="planet-info"><span>Spieces: </span>'+ singlePlanet['spieces'] +'</div>',
        '<div class="planet-info"><span>Population: </span>'+ singlePlanet['population'] +'</div>',
        '<div class="planet-info"><span>Water: </span>'+ singlePlanet['water'] +'</div>',
        '<div class="planet-info"><span>Land: </span>'+ singlePlanet['land'] +'</div>',
        '<div class="planet-info"><span>Seasons: </span>'+ singlePlanet['seasons'] +'</div>',
        '<div class="planet-info"><span>Contients: </span>'+ singlePlanet['continets'] +'</div>',
        '<div class="planet-info"><span>Countries: </span>'+ singlePlanet['countries'] +'</div>'
      );

    //close X
    $('.closeX').click(function () {
      wrapperBox.empty();
      bigBox.css({display: 'none'});
    });
    }


});
