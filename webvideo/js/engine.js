$( document ).ready(function() {
   

    var backposition = "";

    $(".catitem").click(function(event) {
    	/* Act on the event */
    	backposition = getscreenpos();
      var main = $("#mainmasterdiv").css('display');
      var search = $("#mastersearchdiv").css('display');
      console.log('variable search =' + search );
      var more = $("#showcategorydiv").css('display');
      console.log('variable moore =' + more );
      if (main == 'block') {

        console.log('main = block condition');
      openmovie('home');
      }else if (search == "block"){

        console.log('search = block condition');
        openmovie('search');

      }else if(more == "block"){
        console.log('more = block condition ');
        openmovie('more');
      }
    	
    	
    });

    $(".showmore").click(function(event) {
      fadeoutmain(0);
      setTimeout(function(){

      $("#showcategorydiv").css('display', 'block');
      window.scrollTo(0,0);
      },300);
      setTimeout(function(){
      $("#showcategorydiv").css('opacity', '1');

      },800);
    });

    $("#rght").click(function(event) {
      $(".usercontextmenu").css('display', 'block');
        var setpos = ($(this).position());
        var alto = ( 5 + setpos.top + $(this).height());
        var rpos = ($(document).width() - ( $(this).offset().left + $(this).outerWidth()  )  );
        
        console.log(rpos);
        setTimeout(function(){

        $(".usercontextmenu").css('top', alto);
        $(".usercontextmenu").css('right', rpos);
        $(".usercontextmenu").css('opacity', '1');
        },50);
        $(".blackcontainer").css('display', 'block');
    });


    $("#lft").click(function(event) {
    	/* Act on the event */
      var show = $("#mastertvshowdiv").css('display');
      var search = $("#mastersearchdiv").css('display');
      var more = $("#showcategorydiv").css('display');
      if (show == "block") {
    	 closemovie();
        
      }else if (search == "block") {
        closesearch('home');
      }else if (more == "block"){
        $("#showcategorydiv").css('opacity', '0');
        setTimeout(function() {
        $("#showcategorydiv").css('display', 'none');
        fadeinmain();

        }, 200);
      }
      else{

      	$(".contextmenu").css('display', 'block');
        var setpos = ($(this).position());
        var alto = ( 5 + setpos.top + $(this).height());
        console.log(alto);
        setTimeout(function(){

        $(".contextmenu").css('top', alto);
        $(".contextmenu").css('left', setpos.left);
        $(".contextmenu").css('opacity', '1');
        },50);
        $(".blackcontainer").css('display', 'block');

      }
    	
    	
    	
    });

    $("#cntr").click(function(event) {
    	console.log("did");
    	$(".srchbox").css('display', 'block').focus();
    	$("#srch").css('width', '94%');

    });

    $("#srch").keypress(function(event) {
    	if(event.which == 13){
    		
    		opensearch();
    	$(".srchbox").blur();


    	}
    });

    function getscreenpos(){
    	var pos = $(window).scrollTop();
    	return pos;
    }

    $(".chapteritem").click(function(event) {
    
    	$(".blackcontainer").css('display','block');
    	$("#superdiv").css('filter', 'blur(20px)');
    	$(".episodedetail").css('bottom', '-50px');
    	$(".episodedetail").css('display', 'block');
  		setTimeout(function(){
    	$(".episodedetail").css('opacity', '1');
    	$(".episodedetail").css('bottom', '20px');
    	$(".episodedetail").css('position', 'fixed');
  		},700)
    	

    });

    // seasonopt
    $(".seasonopt").click(function(event) {
       $(this).css('background', 'gray');
       $(this).css('color', '#585858');

    });
    // end seasonopt

    // size controller

      $(".leftcon").click(function(event) {
        var a = getselected();
        console.log('valor resivido seleccionado:' + a);
        if (a > 1 ) {
          a = a-1;
          console.log('valor enviado a la funcion:'+a);
          setselected(a);
        }else{
          console.log(a)
        }

      });

       $(".rightcon").click(function(event) {
        var a = getselected();
        console.log('valor resivido seleccionado:' + a);
        if (a < 4 ) {
          a = a+1;
          console.log('valor enviado a la funcion:'+a);
          setselected(a);
        }else{
          console.log(a)
        }

      });
    // end size controller

    function setselected(a){
      $(".sizecontainer").children().removeClass('sizeselected');
      $("#s"+a).addClass('sizeselected');

      switch (a) {
        case 1:
          console.log('establecer tamano 1');
            $(".catcontent").css('height', '170px');
            $(".catitem").css({
              'height': '140px',
              'width': '90px'
            });
            $(".catitemimg").css('height', '120px');
          break;
         case 2:
          console.log('establecer tamano 2');
            $(".catcontent").removeAttr('style');
            $(".catitem").removeAttr('style');
            $(".catitemimg").removeAttr('style');
          break;
          case 3:
          console.log('establecer tamano 3');
            $(".catcontent").css('height', '260px');
            $(".catitem").css({
              'height': '235px',
              'width': '150px'
            });
            $(".catitemimg").css('height', '210px');
          break;
          case 4:
            console.log('establecer tamano 4');
            $(".catcontent").css('height', '345px');
            $(".catitem").css({
              'height': '315px',
              'width': '220px'
            });
            $(".catitemimg").css('height', '295px');
          break;
      }
    }


    function getselected(){
       for(var i = 1; i<5 ; i++){

          if ($("#s"+i).hasClass('sizeselected')) {
            return i;
          }
        }
    }



    function closeeps(){
    	$("#superdiv").removeAttr('style');
    	$("#superdiv").removeAttr('class');
    	$(".episodedetail").removeAttr('style');
      $(".blackcontainer").css('display','none');
      
    }

   
    $(".blackcontainer").click(function(event) {
      if ($(".episodedetail").css('display') == 'block') {
      closeeps();  
      }else{
        
    	$(".blackcontainer").css('display','none');
      
        $(".contextmenu, .usercontextmenu").css('top', '50px');
        $(".contextmenu, .usercontextmenu").css('opacity', '0');
        // $(".usercontextmenu").css('top', '50px');
        // $(".usercontextmenu").css('opacity', '0');

        $(".catselector").css({
          opacity: 0,
          marginTop: '0px',
        });
         $(".seasonoptcontent").css({
          opacity: 0,
          marginTop: '-8px',
        })

      setTimeout(function(){

      $(".seasonoptcontent, .contextmenu, .usercontextmenu, .catselector").removeAttr('style');
   

      },300);

      }
    });



    $(".seasonselector").click(function(event) {
      console.log('dropdown menu');
      $(".seasonoptcontent").css('display', 'block');
      setTimeout(function(){
        $(".seasonoptcontent").css({opacity:1,marginTop:'-5px'});

      },200);
      $(".blackcontainer").css('display', 'block');
    });

    $("#catbar").click(function(event) {
      $(".catselector").css('display', 'block');
      setTimeout( function(){
        
        $(".catselector").css({
          opacity: 1,
          marginTop: '4px'
        });
        $(".blackcontainer").css('display', 'block');

      },100);
    });

     $(".closebtn").click(function(event) {

    	closeeps();

    // 	$(".episodedetail").css('bottom', '-50px');
    // 	$(".episodedetail").css('display', 'block');
  		// setTimeout(function(){
    // 	$(".episodedetail").css('opacity', '1');
    // 	$(".episodedetail").css('bottom', '20px');
    // 	$(".episodedetail").css('position', 'fixed');
  		// },700)
    	

    });




// function openmovie(from){
// 	if($("#mastertvshowdiv").css('display') == 'none'){
// 		console.log('go ahead');
// 		$("#mainmasterdiv").css('opacity', '0');
// 		$("#cntr").css('opacity', '0');
// 		$("#mastertvshowdiv").css('opacity', '0');
// 		setTimeout(function(){
// 			$("#mainmasterdiv").css('display','none');
// 			 window.scrollTo(0,0);
// 			 $("#mastertvshowdiv").css('display', 'block');
// 			 setTimeout(function(){
// 			 $("#mastertvshowdiv").css('opacity', '1');

// 			 },15);
// 		},500);


function fadeoutmain(p){

	$("#mainmasterdiv").css('opacity', '0');
	$("#cntr").css('opacity', p);
	if (p == 0) {	
		$("#cntr").css('display', 'none');
	}
	$("#mastertvshowdiv").css('opacity', '0');
  setTimeout(function(){
    $("#mainmasterdiv").css('display','none');
  },300);
}

function fadeinmain(){
	$("#mainmasterdiv").css('display', 'block');
			setTimeout(function(){
				$("#mainmasterdiv").css('opacity', '1');
				$("#cntr").css('opacity', '1');
				$("#cntr").css('display', 'block');
				window.scrollTo(0,backposition);
			},15);
}


function opensearch(){
  fadeoutmain(1);
  setTimeout(function(){
      
       window.scrollTo(0,0);
       $("#mastersearchdiv").css('display', 'block');
       setTimeout(function(){
       $("#mastersearchdiv").css('opacity', '1');

       },15);
    },500);

}

function closesearch(to){
  $("#mastersearchdiv").css('opacity', 0);
  $(".srchbox").val('');
    setTimeout(function(){
      $("#mastersearchdiv").css('display', 'none');
        if (to == "home") {
          console.log('to home condition');
        fadeinmain();
        }else if (to == "show"){
          console.log('to show condition');
          $("#cntr").css('opacity',"0");
          $("#cntr").css('display',"none");

        }
    },500);
}

function closemovie(){
  if($("#mastertvshowdiv").css('display') == 'block'){
    console.log('closing');
    
    $("#mastertvshowdiv").css('opacity', 0);
    setTimeout(function(){
      $("#mastertvshowdiv").css('display', 'none');
      fadeinmain();
    },500);
    
    
  }
}

function openmovie(from){
	 console.log(from);
		if (from == "search") {
      console.log("from search condition");
      closesearch("show");
      
    }else if (from == "home"){
      fadeoutmain(0);
      console.log("from home condition");
      
    }else if (from == "more"){
      console.log('from more');
       $("#showcategorydiv").css('opacity', '0');
        setTimeout(function() {
        $("#showcategorydiv").css('display', 'none');
      },200);
    }


		setTimeout(function(){
			
			 window.scrollTo(0,0);
			 $("#mastertvshowdiv").css('display', 'block');
			 setTimeout(function(){
			 $("#mastertvshowdiv").css('opacity', '1');

			 },15);
		},500);

	
}



// more detail action

$(".moredetail").click(function(event) {
  $(this).css('opacity', '0');
  $(".sipnosis, .infoholder").css('height', 'auto');
 
});

// more detail action END

// Comment Bar Action 

$(".comentbar").click(function(e){
  
})

// Comment Bar Action END


document.addEventListener("touchmove", ScrollStart, false);
document.addEventListener("scroll", Scroll, false);

function ScrollStart() {
     var a = 5;
	var pos = $(window).scrollTop();
	if(pos > a) {
	    $("#headermenu").css({
	                background: 'rgba(33,33,33,0.94)'
	            });
	}
	else {
	    $("#headermenu").css({
	                background: 'transparent'
	            });
	}
}

function Scroll() {
    //end of scroll event for iOS
    //and
    //start/end of scroll event for other browsers
     var a = 5;
	var pos = $(window).scrollTop();
	if(pos > a) {
	    $("#headermenu").css({
	                background: 'rgba(33,33,33,0.94)'
	            });
	}
	else {
	    $("#headermenu").css({
	                background: 'transparent'
	            });
	}
}




});