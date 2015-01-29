

jQuery(function() {

		jQuery(".gnb .depth1")

});

jQuery(".gnb .depth1").hover(function() {


  	if ( jQuery( ".gnb .depth1 ul" ).is( ":hidden" ) ) {

     jQuery( ".gnb .depth1 ul" ).css( "display","block" ).slideDown( "slow" );

  } else {

    jQuery( ".gnb .depth1 ul" ).css( "display","block" ).slideUp( "slow" );

  }




});
