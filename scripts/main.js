$(window).load(function(){
	//$("#wrapper2").offset().left
	
	
	
	if($("#whyHeadline").html()){
	  $("#whyHeadline").fitText();
	  $("#whyHeadline").fitText(1.2);
	  $("#whyHeadline").fitText(1.1, { minFontSize: '60px', maxFontSize: '150px' });
	}
	
	var stripWidth = $( window ).width();
	$('.stripBar').stop().animate({"width": stripWidth-320}, 2000, 'easeInOutExpo');
	
	$('#sideBar').height($( window ).height()-121);
	
	 $(window).resize(function(){
    	$('.stripBar').width($( window ).width()-320);
    	$('#sideBar').height($( window ).height()-121);
 	 });
	
	$('#topBar').animate({'opacity':1}, 1500);
	
	$('#mainStory').hide();
	$('#mainStory').delay(300).slideDown(1500, 'easeInOutExpo');
	
	$('#contactInfo').hide();
	$('#contactInfo').delay(300).slideDown(1500, 'easeInOutExpo');
	
	$('#homeHeader').hide();
	$('#homeHeader').animate({"opacity": 1}, 0);
	$('#homeHeader').slideDown(2000, 'easeInOutExpo');
	
	
	
	
	$('#navUnderline').animate({'opacity':0}, 0);
	$('.mainNav').find('li').hover(
			function () {
			  $(this).stop().animate({"opacity": .8}, 100);
			  var p =  $(this).position();
			  var width = $(this).width();
			  
			  $('#navUnderline').stop().animate({left:p.left, width:width}, 400, 'easeOutExpo');
			  
			},
			function () {
			  $(this).stop().animate({"opacity": .4}, 200);
			  var p =  $('.mainNav').find('#selected').position();
			  var width = $('.mainNav').find('#selected').width();
			  $('.mainNav').find('#selected').stop().animate({"opacity": .8}, 200);
			  $('#navUnderline').stop().animate({left:p.left, width:width}, 400, 'easeOutExpo');
			}
		  );
	
	
	
	setTimeout(setUnderline, 100);
	
	function setUnderline(){
		var p =  $('.mainNav').find('#selected').position();
		var width = $('.mainNav').find('#selected').width();
				  
		$('.mainNav').find('#selected').animate({"opacity": .8}, 0);
		$('#navUnderline').animate({left:p.left, width:width}, 0);
		$('#navUnderline').animate({'opacity':1}, 0);
	}
	
	
	$('#send_message2').click(function(e){
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Contact', 'Form', 'Send Email']);
    var error = false;
    var name = $('#name2').val();
    var email = $('#email2').val();
    var subject = $('#subject2').val();
    var message = $('#message2').val();
	
    if(name.length == 0){
      var error = true;
      $('#name_error2').fadeIn(500);
    }else{
      $('#name_error2').fadeOut(500);
    }
    if(email.length == 0 || email.indexOf('@') == '-1'){
      var error = true;
      $('#email_error2').fadeIn(500);
    }else{
      $('#email_error2').fadeOut(500);
    }
    if(subject.length == 0){
      var error = true;
      $('#subject_error2').fadeIn(500);
    }else{
      $('#subject_error2').fadeOut(500);
    }
    if(message.length == 0){
      var error = true;
      $('#message_error2').fadeIn(500);
    }else{
      $('#message_error2').fadeOut(500);
    }
    if(error == false){
      $('#send_message2').attr({'disabled' : 'true', 'value' : 'Sending...' });
      $.get("/email", $("#contact_form2").serialize(),function(result){
        result = result.trim();
        if(result == 'sent'){
          $('#cf_submit_p2').remove();
          $('#mail_success2').fadeIn(500);
        }else{
          $('#mail_fail2').fadeIn(500);
          $('#send_message2').removeAttr('disabled').attr('value', 'Send The Message');
        }
      });
    }
  });
	
	
		
});

