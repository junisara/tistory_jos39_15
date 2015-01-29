'use strict';







var delay = 150,
    setTimeoutConst;

jQuery('.gnb .depth1').hover(function() {

    setTimeoutConst = setTimeout(function() {
        jQuery('.gnb .depth1 ul').slideDown('slow').css('display', 'block');
    }, delay);

}, function() {
    clearTimeout(setTimeoutConst);
    if (jQuery('.gnb .depth1 ul').is(':hidden')) {} else {
        jQuery('.gnb .depth1 ul').css('display', 'block').slideUp('slow');
    }

});
