

$(function() {

    //addInboundClassToLinks();
    makeTopbarFade();
    currentNavigationItemShouldBeNotClickable();
    if (shouldDoScrollingStuff()) {
        watchForScrolling();
        watchForHashChange();
        updateSelected();
    }

});


//never called.
function addInboundClassToLinks() {
    $('a').each(function() {
       var that = $(this);
       var href = that.attr('href');
       if(href.search('/') == -1 && href.search('#') == -1) {      
          that.addClass('inbound');
       }
    });
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
    $("a.home").click(function(e) {
        e.preventDefault();
        href = $(this).attr('href');
        var mainimage = $("#mainimage");
        mainimage.show();
        $('#slider').nivoSlider({
    		effect: "fade",
    		controlNav: false,
    		captionOpacity: 0.9,
    	});
    	var height = mainimage.height();
        mainimage.css("height", 0);
        $("html, body").animate({ scrollTop: 0 }, 300);
        $("body").css("height", $("body").height());
        mainimage.animate( { 'height': height }, 500, function() {
            window.location = href;
        });
    });

}

function shouldDoScrollingStuff() {
    if ($("#scroller").length == 0) return false;
    return true;
}

function watchForHashChange() {
    $(window).bind('hashchange', function() {
        var url = $.param.fragment();
        console.log("URL CHANGED: "+url);
    });
}

function watchForScrolling() {
    var scrolleritem = $("#scroller");
    var scrolly = scrolleritem.offset().top;
    $(document).scroll(function() {
        var windowy = $(window).scrollTop();
        if (scrolly >= windowy) {
            hideHoverScroller();
        } else {
            showHoverScroller();
        }
        updateSelected();
    });
}

function updateSelected() {
    $(".scrollwatcher").each(function(index, Element) {
        var name = $(this).attr('id');
        var itemy = $(this).offset().top;
        var height = $(this).height();
        var scrolly = fixScrollToActuallyReachBottomThing();
        //scrolly  = scrolly + 100; //give us some buffer;
        if ((itemy+height) > scrolly && itemy < scrolly) {
            selectInScrollbar(name);
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
	return scrolly + (height-marginbottom) * (scrolly/(docheight-height));
}
function selectInScrollbar(name) {
    $("a.scrolllink").each(function(index, element) {
        var linkname = $(this).attr("href").replace("#", "");
        if (linkname == name) {
            $(this).addClass("selected");
        }
    });
}
function unselectInScrollbar(name) {
    $("a.scrolllink").each(function(index, element) {
        var linkname = $(this).attr("href").replace("#", "");
        if (linkname == name) {
            $(this).removeClass("selected");
        }
    });
}
function showHoverScroller() {
    $("#scroller-fixed").show();
    $("#scroller").hide();
}

function hideHoverScroller() {
    $("#scroller-fixed").hide();
    $("#scroller").show();
}
