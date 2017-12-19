function clearData(){
    $('.modal-header').empty();
    $('.modal-body').empty();
    $('.modal-footer').empty();
}

function renderSavePlanet(SolarSystem){
    $('#links').on('click', '.save-planet', function (e) {
        e.preventDefault();
        clearData();
        let modalHead =  $('.modal-header');
        let modalBody =  $('.modal-body');

        $('<h1>').addClass('modal-title').text('Which planet do you want to save?')
            .appendTo(modalHead);

        $(`<button type="button" class="close" data-dismiss="modal">&times;</button>`)
            .appendTo(modalHead)
            .css('cursor', 'pointer');

        $('<h4>')
            .text('UASA want to send some bombs and explode 1 planet. Now you can choose which planet to save from destroinment.')
            .appendTo(modalBody);

        let form = $('<form>');
        form
            .attr('id', 'savePlanet')
            .appendTo(modalBody);

        renderInputsAndChangeResult(SolarSystem);
    });
}

function renderInputsAndChangeResult(SolarSystem) {
    $('<button id="btnSave">Save Planet</button>')
        .appendTo($('#savePlanet'));

        for (let value in SolarSystem){
            let planets = SolarSystem[value];
            if (value === 'SavePlanet') {
                for (let planetName in planets){
                    $('#savePlanet')
                        .append($('<input type="radio" id="'+ planetName +'" name="savePlannet" value="'+ planetName + '"><label for="'+ planetName +'">'+ planetName +'</label>'));
                    //console.log(planetName); //връща името на планетата

                    let radioValue = planets[planetName];
                    //console.log(radioValue['result']); //връща гласовете
                    enterIntoDatabase(planetName, radioValue);
                }
            }
        }
}

function btnSaveFunction(radioValue, planetName){
    $('#savePlanet').on('click', '#btnSave', function (e) {
        e.preventDefault();
        console.log('1');
        let checkedPlanet = $('input[name=savePlannet]:checked').val();
        //console.log(checkedPlanet);
        console.log('2');
        if(checkedPlanet===planetName){
            console.log('3');
            radioValue['result']++;
            console.log('4');
            $('#btnSave').attr("disabled", true);
            $('<p>')
                .addClass('btnMessage').text("You successfully voted for "+ checkedPlanet + "! Thank you!")
                .appendTo($('.modal-footer'));
        }
    });
}


function loadFromDatabase(){
    $.ajax({
        url: 'https://brooklynbridge-jsproject.firebaseio.com/.json',
        success: renderSavePlanet,
        error: function (e) {
            console.log('error1');
        }
    })
}

function enterIntoDatabase(planetName, resultFromVoting) {
    $.ajax({
        url: 'https://brooklynbridge-jsproject.firebaseio.com/SavePlanet/'+ planetName +'.json',
        type: 'POST',
        success: btnSaveFunction(resultFromVoting, planetName),
        error: function (e) {
            console.log('error2');
        }
    })

}

loadFromDatabase();

