'use-strict';

const urlPrefix = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://developer.nps.gov/api/v1/parks?'
const apiKey = 'rOSgoEBaYhbpTlSU80U74n6e3eTdZDPAO6p39MlA';

function processResults(states, maxResults){

    const stateString = formatParams(states, maxResults);
    const searchUrl = urlPrefix + url + stateString;
    console.log(searchUrl); 

    fetch(searchUrl, {
    method: 'GET',  
    headers: {
        "X-Api-Key": apiKey,
        "Access-Control-Allow-Origin": "*"}})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => handleResults(responseJson.data))
        .catch(err => {
            $('body').waitMe('hide');
            $('.js-error-message').removeClass("hidden");
            $('.js-error-message').text(`Something went wrong: ${err.message}. Please try again.`);
        });
    }   

function handleResults(parks) {
    $(".search-results").empty();
    $('body').waitMe('hide');

    if (parks.length === 0){
        $('.js-error-message').removeClass("hidden");
        $('.js-error-message').text(`No results found. Please try again.`);
    }

    for (let i = 0; i < parks.length; i++){
        console.log(parks[i]);
        $(".search-results").append(createResultHtml(parks[i]));
    }
}

function createResultHtml(park) {
    const address = park.addresses[0];
    return `<article class="result">\
        <h3><a class="park-link" href="${park.url}" target="_blank">${park.fullName}</a></h3>\
        <h4 class="park-state"><span class="park-state-title">STATE(S): </span>${park.states}</h4>\
        <section class="park-info">\
            <p class="park-description"> ${park.description}</p>\
            <img class="park-image" src="${park.images[0].url}" alt="${park.images[0].alt}">\
        </section>\
        <p><span class="park-title">ADDRESS: </span> ${address.line1}, ${address.city}, ${address.stateCode}. ${address.postalCode}.</p>
        <section park-contact-info>\
            <a class="park-email" href="mailto:${park.contacts.emailAddresses[0].emailAddress}"><i class="icon fas fa-at"></i>EMAIL</a>\
            <a class="park-phone" href="tel:${park.contacts.phoneNumbers[0].phoneNumber}"><i class="icon fas fa-phone"></i>CALL</a>\
        </section>\
    </article`;
}


function formatParams(states, limit) {
    // create correct parameter format for passing to endpoint URL
    let stateString = "";

    for (let i=0; i < states.length; i++){
        stateString += states[i] + ",";
    }

    const paramString = "stateCode=" + stateString.slice(0,-1) + "&limit=" + limit;
    return paramString;
}

function bothFieldsComplete(states, maxResults) {
    return states.length > 0 && maxResults != "";
}

function watchForm(){
    $("#submit-button").click(event => {
        event.preventDefault();
            
        const states = $('#search').val();
        const maxResults = $('#max-results').val();

        if (bothFieldsComplete(states, maxResults)){
            $('.js-error-message').addClass("hidden");
            run_waitMe("bounce");
            processResults(states, maxResults);
        }
        else {
            $('.js-error-message').removeClass("hidden");
            $('.js-error-message').text("Please add at least one state.")
        }
    });
}    

$(document).ready(function(){
    $('#search').selectize({
        maxItems: 5,
        placeholder: "Enter state(s) here",
        delimiter: ',',
        persist: false,
    });

    $('#max-results').selectize({
        create: true,
    });

    $(".items").on("click", ".item", function() {
        // remove selected item from selected if clicks
        let select = $('#search').selectize();
        let selectSizeControl = select[0].selectize;
        let selectedValue = $(this).attr("data-value");
        select[0].selectize.removeItem(selectedValue);
        select[0].selectize.refreshItems();
        select[0].selectize.refreshOptions();
        })
});

$(watchForm);




function run_waitMe(effect){
    $('body').waitMe({
    effect: 'bounce',
    text: 'fetching results...',
    bg: 'rgba(255,255,255,0.7)',
    color: '#000',
    maxSize: '',
    waitTime: -1,
    source: '',
    textPos: 'vertical',
    fontSize: '40px'});
}
