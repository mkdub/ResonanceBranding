$(window).load(function(){
	$('#container').isotope({
	  // options
	  itemSelector : '.item',
	  layoutMode : 'fitRows'
	});
	
	$('.www').hide();
	//$('#mainAbout').find('#theWho').animate({"opacity": 1}, 100);
	//$('#mainAbout').find('#theWho').slideDown(2200, 'easeOutExpo');
	
	$('#mainHeader').hide();
	$('#mainHeader').animate({"opacity": 1}, 0);
	$('#mainHeader').slideDown(2000, 'easeInOutExpo');
	
	//$('.www').animate({"opacity": 1}, 100);
	//$('.www').delay().slideDown(2000, 'easeInOutExpo');
	
	$('#wwwNav').hide();
	$('#wwwNav').delay(100).slideDown(1500, 'easeInOutExpo');
	
	var secLength = $('.www').length;
	
	$('.www').each(function(i, sec) {
			
			
			var delayID = i;
			
			if(i==0){
				delayID = secLength;
			}else{
				delayID = secLength-delayID;
			}
			
			console.log(delayID);
			
			$(sec).delay(200*delayID).animate({"opacity": 1}, 500);
			$(sec).delay(200*delayID).slideDown(2000, 'easeInOutExpo');
			});	
	
	/*
	$('.www').waypoint(function() {
 		var $active = $(this);
		$('.selected').removeClass('selected');
    	$('a[href=#'+$active.attr('id')+']').find('li').addClass('selected');
	});
	*/
	
	
	
	var scrollElement_work = 'html, body';
	$("#wwwNav a").click(function(event) {
		
		var selID = '#'+$(this).find('li').attr('id');
	  	
	  	$('.selected').removeClass('selected');
	  	$(this).find('li').addClass('selected');
		
		event.preventDefault();
		var $this = $(this),
		target = this.hash,
		$target = $(target);
		
		titlePage = $this.attr('val');
			if(!titlePage){
				titlePage = $this.attr('title');
			}
		var scrollPosY = $target.offset().top-123;
		$(scrollElement_work).stop().animate({'scrollTop': scrollPosY}, 1000, 'swing', function() {document.title = "Resonance Consultancy - "+titlePage;});
	  });
	
	/*		
	
	$('.wwwNavLink').click(function() {
	  	var selID = '#'+$(this).attr('id');
	  	
	  	$('.selSection').stop().slideUp(600,'easeOutExpo', function(){
	  		$('#mainAbout').stop().find(selID).addClass('selSection');
	  		
	  		$('.selSection').animate({"opacity": 1}, 100);
			$('.selSection').slideDown(2200, 'easeInOutExpo');
	  	});
	  });*/
	
	
});