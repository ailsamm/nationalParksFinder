'use-strict';

const url = 'https://developer.nps.gov/api/v1/parks?stateCode='
const apiKey = 'rOSgoEBaYhbpTlSU80U74n6e3eTdZDPAO6p39MlA';

function processResults(states){
    const searchUrl = url + states;
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
/* $(function() {
	$('.select').selectize({
        delimiter: ',',
        persist: false,
        placeholder: "something",
        maxItems: 5,
        options: ["first", "second", "third"],
        create: function(input) {
            return {
                value: input,
                text: input
            }
        }
    });
}); */

$(watchForm);