'use-strict';

const url = 'http://crossorigin.me/https://developer.nps.gov/api/v1/parks?stateCode='
const apiKey = 'rOSgoEBaYhbpTlSU80U74n6e3eTdZDPAO6p39MlA';

function processResults(states){
    const searchUrl = url + states;

    fetch(searchUrl, {
    method: 'GET',
    headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"}})
    .then(results => console.log(results));

}   

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const states = $('#states').val();
        $('#states').val("");
        processResults(states);
    });
}

$(document).ready(function(){
    $('#search').selectize({
        maxItems: 5,
        placeholder: "Enter state(s) here",
        delimiter: ',',
        persist: false
    });
});


$(watchForm);