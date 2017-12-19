$(document).ready(function () {
    let bigBox = $('.big-box');
    bigBox.css({display: 'none'});
    let windowWidth = $(window).width();
    let error = '';
    let wrapper = $('#wrapper');
    bigBox.width(Number(windowWidth - 400) + 'px');
    
    //On resize to change the size of the Modal
    $(window).resize(function () {
        bigBox.width(Number($(window).width() - 300) + 'px');
    });
    
   // Modal with info
    let wrapperBox = $('<div class="wrapperBox"></div>');
    bigBox.append(wrapperBox);
    function ajaxSuccess(json, planetName) {
        for (let i in json) {
            let solarSystem = json[i];
            for (let k in solarSystem) {
                let allPlanets = solarSystem[k];
                let singlePlanet = allPlanets[planetName];
                showClickedPlanetData(singlePlanet);
            }
        }
    }
    function showClickedPlanetData(singlePlanet) {
        bigBox.css({display: 'block'});
        //append planet info
        wrapperBox.append($('<div class="planets-info-wrapper">' +
            '<div class="planets-info">' +
            '<div class="container-fluid">' +
            '<div class="row">' +
            '<div class="col-xs-11 col-sm-11 col-md-11">' +
            '<p class="overwiev"><span>Overview:</span>' + singlePlanet['overview'] + '</p>' +
            '</div>' +
            '<div class="col-xs-1 col-sm-1 col-md-1">' +
            '<p class="close">x' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            ' <div class="col-xs-6 col-sm-6 col-md-6">' +

            ' <ul>' +
            '<li><span>Spieces:</span>' + singlePlanet['spieces'] + '</li>' +
            '<li><span>Population:</span>' + singlePlanet['population'] + '</li>' +
            '<li><span>Water:</span>' + singlePlanet['water'] + '</li>' +
            '</ul>' +

            '</div>' +
            '<div class="col-xs-6 col-sm-6 col-md-6">' +

            '<ul>' +
            '<li><span>Land:</span>' + singlePlanet['land'] + '</li>' +
            '<li><span>Seasons: </span>' + singlePlanet['seasons'] + '</li>' +
            '<li><span>Continents:</span>' + singlePlanet['continents'] + '</li>' +
            '<li><span>Countries:</span>' + singlePlanet['countries'] + '</li>' +
            '</ul>' +

            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-12 col-sm-12 col-md-12">' +
            '<div class="slider">' +
            '<div>' +
            '<img src="images/1.jpg">' +
            '</div>' +
            '<div>' +
            '<img src="images/2.jpg">' +
            '</div>' +
            '<div>' +
            '<img src="images/3.jpg">' +
            '</div>' +
            '<div>' +
            '<img src="images/4.jpg">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>')
        );

        $('.slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1000,
            arrows: false,
        });
        //close X
        $('body').on('click', '.close', function removeInfoBubble() {
            $('.planets-info-wrapper').remove();

            otherPlahets = $('.planets').find('.planet');
            otherPlahets.fadeIn(1000);
            $('.active').animate({
                left: xi,
                top: yi
            })

        });

    }
    $('.planet').click(function () {
        let otherPlahets = $('.planets').find('.planet').not(this);
        otherPlahets.fadeOut(1000);
        wrapperBox.empty();
        wrapper.addClass('toggled');
        let planetName = $(this).attr('data-planet');
        let xi = $(this).offset().left;
        console.log(xi);
        let yi = $(this).offset().top;
        console.log(yi);

        $(this).animate({
            left: xi - xi + 100,
            top: yi - yi + 138,
        },400);

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
    //deni history link
    function renderHistory(histories) {

        for (let key in histories) {
            let history = histories[key];
            let historyDiv = $('<div class="history-content">')
                .append('<p>' + history+ '</p>');
            $('#history .modal-body').append(historyDiv);
        }

    }
    function renderHistoryData(histories) {
        renderHistory(histories);
    }
    function getAllHistory() {
        let requestURL = 'https://brooklynbridge-c825a.firebaseio.com/SolarSystem/History.json';
        $.get(requestURL)
            .then(renderHistory)
            .catch((err) => console.log(err));
    }
    getAllHistory()

});
