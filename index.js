'use-strict';

const url = 'https://developer.nps.gov/api/v1/parks?stateCode='
const apiKey = 'rOSgoEBaYhbpTlSU80U74n6e3eTdZDPAO6p39MlA';

function processResults(states){
    const stateString = formatStates(states);
    const searchUrl = url + stateString;
    console.log(searchUrl); 

    fetch(searchUrl, {
    method: 'GET',
    headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "no-cors"}})
    .then(results => console.log(results));

}   

function formatStates(states) {
    // create correct parameter format for passing to endpoint URL
    let stateString = "";
    for (let i=0; i < states.length; i++){
        stateString += states[i] + ",";
    }
    return stateString.slice(0,-1)
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