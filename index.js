'use-strict';

const url = 'https://developer.nps.gov/api/v1/parks?stateCode=ca'
const apiKey = 'rOSgoEBaYhbpTlSU80U74n6e3eTdZDPAO6p39MlA';

function processResults(states){
    const options = {
        headers: new Headers({
          "X-Api-Key": apiKey,
          "Access-Control-Allow-Origin": "*"})
      };
    
      fetch(url, options)
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

$(watchForm);