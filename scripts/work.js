$(window).load(function(){
	

var cases = new Array();
var headerArray = new Array();
var descArray = new Array();
var locationArray = new Array();
var catArray = new Array();
var imagesArray = new Array();
var idArray = new Array();
var videosArray = new Array();

var curProj = Number;

$.getJSON('../work/brandingCases.json', function(data) {

	 $.each(data.item, function(i,item){
	  	var numID = i;
	  	var id=data.item[i].id.value;	
	  	var header=data.item[i].header.value;
        var desc=data.item[i].desc.value;
        var loc=data.item[i].location.value;
        var cat=data.item[i].categories.value;
		var kind=data.item[i].kind.value;
		var photosArray = new Array();
		var vidsArray = new Array();
		
		$.each(data.item[i].photos.photo, function(i,photo){ 	
			photosArray.push(data.item[numID].photos.photo[i]);
		});
		
		$.each(data.item[i].videos.vid, function(i,vid){ 	
			vidsArray.push(data.item[numID].videos.vid[i]);
		});
		
		
		idArray.push(id);
		videosArray.push(vidsArray);
		imagesArray.push(photosArray);
		descArray.push(desc);
		headerArray.push(header);
	 	locationArray.push(loc);
	 	catArray.push(cat);
	 	
	 	var kindID = '#'+kind;
	 	
	 	$('#workNav').find(kindID).append("<li id='"+i+"'>"+header+'<br/>'+loc+"</li>")
	 });
	 
	
	
	$('#portfolioContainer').height($( window ).height()-135);
	 
	$('#places').hide();
	$('#places').delay(100).slideDown(1500, 'easeInOutExpo');

	$('#products').hide();
	$('#products').delay(350).slideDown(1500, 'easeInOutExpo');
	
	
	$('#organizations').hide();
	$('#organizations').delay(600).slideDown(1500, 'easeInOutExpo');
	
	$('#backstory').hide();
	$('#backstory').delay(900).slideDown(1500, 'easeInOutExpo'); 
	
	$('#workNav').find('li').click(function() {
		var liSelected = $(this);
		curProj = liSelected.attr('id');
		collapse(liSelected.attr('id'));
		
		
		
		$('#workNav').find('li').removeClass('selected');
		$(this).attr("class", "selected");
		window.location.hash = idArray[$(this).attr('id')];
		if($('#sideBar').css('position')=='absolute'){
			$("#sideBar").hide('slide', { direction: 'left'},400);
			$("#workContainer").show('slide', { direction: 'up'},400);
		}
		
	});
	
	$('#quickPrev').click(function() {
		var prevProj = curProj-1;
		
		if(prevProj==-1){
			prevProj=idArray.length-1;
		}
		
		collapse(prevProj);
		$('#workNav').find('li').removeClass('selected');
		$('#workNav').find('#'+prevProj).attr("class", "selected");
		window.location.hash = idArray[prevProj];
	});
	
	$('#quickNext').click(function() {
		var nextProj = Number(curProj)+1;
		var arrayLength = idArray.length;
		
		if(nextProj==arrayLength){
			nextProj=0;
		}
		
		collapse(nextProj);
		$('#workNav').find('li').removeClass('selected');
		$('#workNav').find('#'+nextProj).attr("class", "selected");
		window.location.hash = idArray[nextProj];
	});
	
	
	$('#workNav').find('li').hover(
			function () {
			  $(this).stop().animate({"opacity": 1}, 100);
			},
			function () {
			  $(this).stop().animate({"opacity": .7}, 200);
			}
		  );
	
		  $('#openNav').click(function() {
		  	$("#sideBar").show('slide', { direction: 'left'},400);	
		  	$("#workContainer").hide('slide', { direction: 'up'},400);	
		  	$("#closeNav").show('slide', { direction: 'right'},400);	
		  });
		  
		   $('#closeNav').click(function() {
		  		$("#sideBar").hide('slide', { direction: 'left'},400);	
		  		$("#workContainer").show('slide', { direction: 'up'},0);
			  	$("#closeNav").hide('slide', { direction: 'right'},400);	
		  });
	if($('#sideBar').css('position')=='absolute'){
		$("#workNav").hide('slide', { direction: 'left'},0);
	}
	
	
	
	
	
	collapse(0);
	getHash();
});

function changeNav(){

	
}

function collapse(sel){
		//console.log(sel)
		
		var p = $( "#category");
		var offset = p.offset();
		curProj = sel;
		if(offset.top==149){
		//	$("#images").hide('slide', { direction: 'up'}, 0);
			$('.portfolioImage').stop().animate({"opacity": 0}, 0);
			$('#headerLine').stop().animate({"opacity": 0}, 0);
			$('#desc').stop().animate({"opacity": 0}, 0);
			$("#portfolioHeader").stop().animate({"top":40, "opacity":0}, 0);
			$("#location").stop().animate({"top":43, "opacity":0}, 0);
			$("#category").stop().animate({"top":-20, "opacity":0}, 50, function() {
					changePiece(sel);
				});
		}else{
			$("html, body").animate({ scrollTop: 0 }, "slow");
			//$("#images").hide('slide', { direction: 'up'}, 800);
			$('.portfolioImage').stop().animate({"opacity": 0}, 400);
			$('#headerLine').delay(250).animate({"opacity": 0}, 400);
			$('.projNav').stop().animate({"opacity": 0}, 400);
			
			
			$('#desc').stop().animate({"opacity": 0}, 400);
			$("#portfolioHeader").stop().animate({"top":40, "opacity":0}, 1200, 'easeOutBack');
			$("#location").stop().animate({"top":43, "opacity":0}, 1200, 'easeOutBack');
			$("#category").stop().animate({"top":-20, "opacity":0}, 1200, 'easeOutBack', function() {
					changePiece(sel);
				});
			}
}

function getHash(){
	var currentHash = window.location.hash;
	if(currentHash==''){
		window.location.hash = idArray[0];
		
		$('#workNav').find('#0').attr("class", "selected");
		
	}
	
	for (var i = 0; i < idArray.length; i++) {
		if(idArray[i]==currentHash.substr(1)){
			collapse(i);
			curProj = i;
			$('#workNav').find('#'+i).attr("class", "selected");
		}
	}
}

function changePiece(pieceID){
	//	$("#images").show('slide', { direction: 'up'},400);
		//$( "#portfolioContainer" ).scrollTop(0);
		$('.portfolioImage').stop().animate({"opacity": 1}, 400);
		
		if(location.host!='localhost:8888'){
			ga('send', 'event', 'workNav', 'click', idArray[pieceID]);
		}
		
		$('#headerLine').stop().animate({"opacity": 1}, 400);
		$('#images').html('');
		$('#videos').html('');
		$('#portfolioHeader').html(headerArray[pieceID]);
		$('#desc').html(descArray[pieceID]);
		$('#location').html(locationArray[pieceID]);
		$('#category').html(catArray[pieceID]);
		
		$.each(imagesArray[pieceID], function(i,photo){
			$('#images').append("<div id='img"+i+"'  num='"+i+"' class='portfolioImage' style='height:29px;'><div class='loadingImg'><img src='../images/loading.gif' /'> <p>LOADING IMAGE</p></div><img style='opacity:0;' onLoad='imgLoaded(this);' border='0' src='../"+photo.path+"' /><div class='imgCaption'><p>"+photo.caption+"</p></div></div>");
		}); 
		
		$.each(videosArray[pieceID], function(i,vid){
			$('#videos').append(vid.path);
			
			$('.vid iframe').each(function() {
				$(this).height( ($(this).width() * 0.76) * 12/16 );
			});	
		});
		
		
		$("#portfolioHeader").stop().animate({"top":0, "opacity":1}, 1200, 'easeOutBack');
		$("#location").delay(100).animate({"top":20, "opacity":1}, 1200, 'easeOutBack');
		$("#category").delay(300).animate({"top":0, "opacity":1}, 1200, 'easeOutBack');
		$('#desc').delay(300).animate({"opacity": 1}, 400);
		$('.projNav').stop().animate({"opacity":1}, 400);
		
	}
});

function imgLoaded(pic){
	
	//console.log($(pic).parent());
	var id = $(pic).parent().attr('num');
	var hei = $(pic).height();
	$(pic).css("top", -hei);
	$(pic).stop().delay(300*id).animate({"top":0, "opacity":1}, 1200, 'easeOutExpo');
	$(pic).parent().find('.loadingImg').hide();
	$(pic).parent().stop().css("background-color", "#ffffff");
	$(pic).parent().stop().animate({"height":hei}, 1200, 'easeOutBack', function() {
					$(pic).parent().css("height", "auto");
				});
	
	
	$('.portfolioImage').hover(
			function () {
				if($(this).find('.imgCaption').find('p').html()){
			 		$(this).find('.imgCaption').stop().animate({"bottom": 0}, 600, 'easeOutExpo');
			 		}
			},
			function () {
			   $(this).find('.imgCaption').stop().animate({"bottom": -45}, 800, 'easeOutExpo');
			}
		  );
	
				
}

$(window).resize(function() {
		$('.vid iframe').each(function() {
			$(this).height( ($(this).width() * 0.79) * 12/16 );
		});
	});



	