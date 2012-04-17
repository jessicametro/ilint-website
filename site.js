$(function() {
   scrollToSomething();
    setupHoverNavigation();
    makeTopbarFade();
    currentNavigationItemShouldBeNotClickable();
    if (shouldDoScrollingStuff()) {
        watchForScrolling();
	scrollLinksScroll();
        watchForHashChange();
        updateSelected();
    }
    fixfixH2s();

    fixfixfix();
});




function fixfixH2s() {
   $("h2").each(function(index, Element) {
	 console.log("asdf");
      $(this).attr("title",$(this).text());
   });
}

function fixfixfix() {
   $("#scroller").wrap("<div id='scroller-wrapper'/>");
   $(".scrollwatcher").wrap("<div class='innerinnercontent'/>");
}

function currentNavigationItemShouldBeNotClickable() {
    $("a.current").click(function(e) {
	    e.preventDefault();
    });
}

function makeTopbarFade() {
    if ($("#mainimage").length == 0) return; //nothing to do here
    $("a.inbound").click(function(e) {
        e.preventDefault();
        href = $(this).attr('href');
        $("html, body").animate({ scrollTop: 0 }, 300);
        $("body").css("height", $("body").height());
        $('#mainimage').animate( { 'height': '0px' }, 500, function() {
            window.location = href;
        });
    });
    $("#navigation a, #navigation-fixed a").click(function(e) {
        e.preventDefault();
        href = $(this).attr('href');
	if ($(this).hasClass("home")) {
	   var mainimage = $("#mainimage");
	   mainimage.show();
	   $('#slider').nivoSlider({
		   effect: "fade",
		   controlNav: false,
		   captionOpacity: 0.9,
	   });
	   var height = mainimage.height();
	   mainimage.css("height", 0);
	   $("body").css("height", $("body").height());
	   mainimage.animate( { 'height': height }, 700, function() {
	       window.location = href;
	   });
	   $("html, body").animate({ scrollTop: 0 }, 500);
	}
	else if (!$(this).hasClass("inbound") && !$(this).hasClass("current")) {
	   var animtime = Math.log(1 + $(window).scrollTop() / $(window).height())  / 5;
	   console.log(animtime);
	   $("html, body").animate({ scrollTop: 0 }, animtime*1000, function() {
		 window.location = href;
	   });
	}

    });

}

function shouldDoScrollingStuff() {
    if ($("#scroller").length == 0) return false;
    return true;
}

function watchForHashChange() {
    $(window).bind('hashchange', function() {
	  //scrollToSomething();
    });
}

function scrollToSomething() {
     var href = window.location.hash.replace("+","");
     if (!href || !$(href).length) return;
      var animtime = Math.log(1 + Math.abs($(window).scrollTop()-$(href).offset().top) / $(window).height())  / 5;
      var scrollto = href;
      if ($(href).hasClass("notopdivider")) { //meaning we're the top div
	    scrollto="#wrapper"; //make it tall
      }
      $.scrollTo($(scrollto) ,{
	    duration: animtime*1000,
	    offset: {left: 0, top: -40},
	    onAfter: function() {
	       unselectAllInScrollbar();
	       selectInScrollbar(href.replace("#",""),false);
	    },
      });

}

function scrollLinksScroll() {
   $("a.scrolllink").click(function(e) {
      e.preventDefault();
      href = $(this).attr('href');
      setHashForPage(href);
      scrollToSomething();
   });

   $(".scrollwatcher").mouseover(function(e) {
      if (!areWeAtBottom()) return;
      href = $(this).attr('id');
      setHashForPage("#"+href);
      unselectAllInScrollbar();
      selectInScrollbar(href,false);

   });
}


function areWeAtBottom() {
var scrollbottom = $(window).scrollTop() + $(window).height();
    var docheight = $(document).height();
    //console.log("scrollbottom : "+scrollbottom);
    //console.log("docheight : " +docheight);
    if (scrollbottom >= docheight) {
       return true;
    }
    return false;
}

function setHashForPage(href) {
    window.location.hash = "+"+href.replace("#","");
}

function watchForScrolling() {
    var scrolleritem = $("#scroller");
    var scrolly = scrolleritem.offset().top-62;
    $(document).scroll(function() {
        var windowy = $(window).scrollTop();
        if (scrolly >= windowy) {
            hideHoverScroller();
        } else {
            showHoverScroller();
        }
        if (!areWeAtBottom())
	    updateSelected(); //Uncomment this line to have scrolling update the sections
    });
}

function updateSelected() {
    //if ( $(".content_selected").offset().top- ($(document).height()-$(window).heigh$(this).html)t()+73)) {
      //leave it alone
     // return;
    //}
    var scrollbottom = $(window).scrollTop() + $(window).height();
    var docheight = $(document).height();
    //console.log("scrollbottom : "+scrollbottom);
    //console.log("docheight : " +docheight);
    if (scrollbottom >= docheight) {
       return;
    }
    $(".scrollwatcher").each(function(index, Element) {
        var name = $(this).attr('id');
        var itemy = $(this).offset().top;
	var update = true;
        var height = $(this).height()+31; //we has 30 padding at bottom
	if ($(this).hasClass("notopdivider")) { //meaning we're the top div
	    height = height + itemy;
	    itemy = 0; //make it tall
	 }
        var scrolly = fixScrollToActuallyReachBottomThing();
        //scrolly  = scrolly + 100; //give us some buffer;
        if ((itemy+height) > scrolly && itemy < scrolly) {
            selectInScrollbar(name, update);
        } else {
            unselectInScrollbar(name);
        }
    });
}
function fixScrollToActuallyReachBottomThing() {
	var scrolly = $(window).scrollTop();
	var height = $(window).height();
	var docheight = $(document).height();
	var marginbottom = $("#footer").height() + 31;
	return scrolly + 73; // (height-marginbottom) * (scrolly/(docheight-height));
}
function selectInScrollbar(name, shouldupdatehash) {
    $("a.scrolllink").each(function(index, element) {
        var linkname = $(this).attr("href").replace("#", "");
        if (linkname == name) {
            $(this).addClass("selected");
        }
    });
    $("#"+name).addClass("content_selected").removeClass("content_unselected").parent().addClass("content_selected").removeClass("content_unselected");
    if (shouldupdatehash) {
       setHashForPage(name);
    } else {
    }
}
function unselectInScrollbar(name) {
    $("a.scrolllink").each(function(index, element) {
        var linkname = $(this).attr("href").replace("#", "");
        if (linkname == name) {
            $(this).removeClass("selected");
        }
    });
    $("#"+name).addClass("content_unselected").removeClass("content_selected").parent().addClass("content_unselected").removeClass("content_selected");
}
function unselectAllInScrollbar() {
   $(".content_selected").removeClass("content_selected").addClass("content_unselected").parent().addClass("content_unselected").removeClass("content_selected");
   $("a.selected").removeClass("selected");
}
function showHoverScroller() {
    $("#scroller-fixed").show();
    $("#scroller").hide();
}
;
function hideHoverScroller() {
    $("#scroller-fixed").hide();
    $("#scroller").show();
}


function setupHoverNavigation() {
   $("#wrapper").append("<div id='navigation-fixed-wrapper'></div>");
   var newnav =  $("#navigation").clone().appendTo("#navigation-fixed-wrapper");
   newnav.attr("id","navigation-fixed");
   var oldnav = $("#navigation");
   var scrolly = oldnav.offset().top;
   $(document).scroll(function() {
	 console.log("DOOP");
       var windowy = $(window).scrollTop();
        if (scrolly >= windowy) {
            hideHoverNav();
        } else {
            showHoverNav();
        }
   });
}
function showHoverNav() {
    $("#navigation").css("visibility", "hidden");
    $("#navigation-fixed-wrapper").show();
}
function hideHoverNav() {
    $("#navigation").css("visibility", "visible");
    $("#navigation-fixed-wrapper").hide();
}
