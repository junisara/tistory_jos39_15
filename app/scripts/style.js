'use strict';

/***************************************/
/**** 날자를 디자인 형태로 구분하기*****/
/***************************************/
function contentDateDesign() {
    if (jQuery('.article_date').html()) {
        var article_rep_date = jQuery('.article_date').html();
        var article_rep_date_S = article_rep_date.split(' ');
        var article_rep_date_YMD = article_rep_date_S[0].split('/');
        jQuery('.article_rep_date .ym').html(article_rep_date_YMD[0] + '.' + article_rep_date_YMD[1]);
        jQuery('.article_rep_date .d').html(article_rep_date_YMD[2]);
    }
}

/*
/* 본문 이미지의 width가 본문을 넘어서면 width값 조절
 */
function contentImgSize() {
    jQuery('.imageblock').css('width', 'auto');
    jQuery('.content_body img').addClass('img-responsive');
    jQuery('.entry-ccl a img').removeClass('img-responsive');
}

/*
/* 매인 화면과 사이드화면의 높이를 동일하게 맞추기
 */
function sameHeight(cHeight, sHeight) {
    if (cHeight > sHeight) {
        jQuery('#sideArea').height(cHeight);
    } else {
        jQuery('#contents').height(sHeight + 30);
    }
}

/*
/* 사이드바 마우스 온 시 투명도 없애기
 */
function sidebarDumy() {
    jQuery('#sideArea').mouseenter(function() {
            jQuery('.trans-dumy').animate({
                opacity: 0
            }, 200, function() {
                jQuery('.trans-dumy').css('display', 'none');
            });
        })
        .mouseleave(function() {
            jQuery('.trans-dumy').animate({
                opacity: 1
            }, 200, function() {
                jQuery('.trans-dumy').css('display', 'block');
            });
        });
}

/*
/* 사이드바 아이콘의 세로 중앙정렬
 */
function icon_mouseOnMiddle() {

    var obj         = jQuery('#blogImage').offset();
    var objHeight   = jQuery('#blogImage').height();
    var objWidth    = jQuery('#blogImage').width();

    // .icon_mouseOn의 현재 위치에서 특정치(50px)만큼 이동
    jQuery('.icon_mouseOn').css('top', obj.top + objHeight + 40);
    jQuery('.icon_mouseOn').css('left', objWidth/2 - 30);
}

/* GNB 마우스 업때 조루 방지
/*
var delay = 150, setTimeoutConst;

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
*/


contentDateDesign();
contentImgSize();
sidebarDumy();

jQuery(document).ready(function() {
    var contentsHeight = jQuery('#contents').height();
    var sideAreaHeight = jQuery('#sideArea').height();
    var winHeight = jQuery(window).height();

    sameHeight(contentsHeight, sideAreaHeight); // 매인 화면과 사이드화면의 높이를 동일하게 맞추기
    icon_mouseOnMiddle(winHeight); //사이드바 아이콘의 세로 중앙정렬

   // 티스토리에서 이미지 바로 아래 있는 글(p태그) 의 아래 여백을 넣기
    jQuery('.imageblock').parent('p').attr('style', 'margin-bottom : 2em !important');

    // 링크가 걸려있는 경우 무조건 새창으로 띄우기
    jQuery('.markdown-here-wrapper a').attr('target','_blank');
});

jQuery(window).resize(function() {
    var contentsHeight = jQuery('#contents').height();
    var sideAreaHeight = jQuery('#sideArea').height();
    var winHeight = jQuery(window).height();

    sameHeight(contentsHeight, sideAreaHeight);
    icon_mouseOnMiddle(winHeight);
});
