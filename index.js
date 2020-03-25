'use-strict';

const urlPrefix = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://developer.nps.gov/api/v1/parks?'
const apiKey = 'rOSgoEBaYhbpTlSU80U74n6e3eTdZDPAO6p39MlA';

function processResults(states){

    const stateString = formatParams(states);
    const searchUrl = urlPrefix + url + stateString;
    console.log(searchUrl); 

    fetch(searchUrl, {
    method: 'GET',  
    headers: {
        "X-Api-Key": apiKey}})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => handleResults(responseJson.data))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
    }   

function handleResults(parks) {
    for (let i = 0; i < parks.length; i++){
        console.log(parks[i]);
        $(".search-results").append(createResultHtml(parks[i]));
    }
}

function createResultHtml(park) {
    return `<div class="result">\
    <h3><a class="park-link" href="${park.url}" target="_blank">${park.fullName}, ${park.states}</a></h3>\
    <p class="park-description"> ${park.description}</p>
    <a class="park-email" href="mailto:${park.contacts.emailAddresses[0].emailAddress}">EMAIL</a><a class="park-phone" href="tel:${park.contacts.phoneNumbers[0].phoneNumber}">CALL</a>
</div>`;
}

function formatParams(states, limit=10) {
    // create correct parameter format for passing to endpoint URL
    let stateString = "";

    for (let i=0; i < states.length; i++){
        stateString += states[i] + ",";
    }

    const paramString = "stateCode=" + stateString.slice(0,-1) + "&limit=" + limit;
    return paramString;
}

function watchForm(){
    $("#submit-button").click(event => {
        event.preventDefault();
        const states = $('#search').val();
        $('#search').val("");
        processResults(states);
    });
}

$(document).ready(function(){
    $('#search').selectize({
        maxItems: 5,
        placeholder: "Enter state(s) here",
        delimiter: ',',
        persist: false,
        items: ["abc", "bbb", "bbb"]
    });
});


$(watchForm);