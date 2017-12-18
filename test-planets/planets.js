$(document).ready(function renderInfoBubble() {
    let x = 150;
    let y = 150;
    $('.planets').off('click').on('click', function () {
        var xi = 0;
        var yi = 0;
        $(this).css('left', xi).css('top', yi).animate({
            left: x,
            top: y
        });
        $('<div class="planets-info-wrapper">' +
            '<div class="planets-info">' +
            '<div class="container-fluid">' +
            '<div class="row">' +
            '<div class="col-xs-11 col-sm-11 col-md-11">' +
            '<p class="overwiev">' +
            '<span>Overview:</span>The third planet from the Sum and with harbor life.' +
            'According to radiometric dating and other sources of evidence' +
            '</p>' +
            '</div>' +
            '<div class="col-xs-1 col-sm-1 col-md-1">' +
            '<p class="close">x' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            ' <div class="col-xs-6 col-sm-6 col-md-6">' +
            ' <ul>' +
            '<li>' +
            '<span>Population:</span>' +
            '1 000 000 000 citizen</li>' +
            '<li>' +
            '<span>Kinds: </span>' +
            'humans, trains, robots</li>' +
            '<li>' +
            '<span>Water:</span>' +
            '20%</li>' +
            '</ul>' +
            '</div>' +
            '<div class="col-xs-6 col-sm-6 col-md-6">' +
            ' <ul>' +
            '<li>' +
            '<span>Land:</span>' +
            '80%</li>' +
            '<li>' +
            '<span>Seasons: </span>' +
            '2</li>' +
            '<li>' +
            '<span>Countinents:</span>' +
            'Europe</li>' +
            '<li>' +
            '<span>Countries:</span>' +
            'Bulgaria</li>' +
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
            '</div>').appendTo('body');

        $('.slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1000,
            arrows: false,
        });
    });
});
$('body').on('click', '.close', function removeInfoBubble() {
    $('.planets-info-wrapper').remove();
});
