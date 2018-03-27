// find out if utm_source exists in array
// replace the phone number in each instance on the page

// default number for page
var defaultNumber = '1-866-243-0621';

// list of phone numbers to use for specific UTM sources
// utm_source: 'phone number'
var phoneNumbers = {
    test: '888-888-8888'
};

$(function () {
    // get utm_source param from url
    let utmSource = getURLParameter('utm_source');

    let number = defaultNumber;
    // if the UTM source has its own number, set it as the number
    if(typeof phoneNumbers[utmSource] !== 'undefined') {
        number = phoneNumbers[utmSource];
    }

    // update text fields based on number
    $('.phone').text(number);
    // update href's based on number
    $('a.trackphone').attr('href', 'tel:'+number);
});

// some regex to get a url parameter
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
