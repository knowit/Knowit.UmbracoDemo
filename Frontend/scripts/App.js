(function($, App) {

//  todo: document.documentElement.clientWidth instead of fixed...
	var outer_width = 710,
		paddingx = Math.round(outer_width*0.1),
		paddingy = Math.round(outer_width*0.08),
		marginy = 0,
		fadeOutTime = 300,
		fadeInTime = 600,
		currentArticleTile,
		currentArticleBox,
		currentArticleUrl,
		overlay = $("#overlay"),
		originalTitle,
		originalUrl,
		History = window.History;
	
	var notifyGoogle = function(){
	
		if(window._gaq){
			_gaq.push(['_trackPageview']);
		}
		
	};

	var resizeArticleBox = function(){
	
		if(!!currentArticleBox){
			var newCssOptions = getArticleEndCss();
			currentArticleBox.css(newCssOptions);
		}
		
	};	
	
	var getArticleStartCss = function(){
		return {
			top: currentArticleTile.offset().top - $(window).scrollTop(),
			left: currentArticleTile.offset().left,
			width: currentArticleTile.width(),
			height: currentArticleTile.height()
		}
	};

	var getArticleEndCss = function(){
		return {
			"width": Math.floor(outer_width - (paddingx * 2)),
			"height": Math.floor($(window).height() - (paddingy * 2) - (marginy * 2)),
			"top": marginy,
			"left": Math.floor(($(window).width() - outer_width) / 2),
			"padding-top": paddingy,
			"padding-bottom": paddingy,
			"padding-left": paddingx,
			"padding-right": paddingx,
			"border-radius": 0
		}
	};
	
	var setRequestHeaders = function(xhr){
	
		xhr.setRequestHeader('X-AJAX-CALL', 'true');
		
	};	
	
	var getArticleLoadOptions = function(){
		return {
			"url":			currentArticleUrl,
			"data":			{ _ajax: true },
			"type":			"GET",
			"dataType":		"html",
			"beforeSend": 	setRequestHeaders
		}
	};
	
	var showArticle = function(data){
	
		var html = data[0];
		var fullArticle = $(html);
		var leadParagraph = currentArticleBox.find("p:not(.comments):not(.author)");	

		leadParagraph.css({
			"position":	"absolute",
			"width":	leadParagraph.width()
		});
		leadParagraph.fadeOut(400);
		
		fullArticle.hide();
		fullArticle.appendTo(currentArticleBox);
		fullArticle.fadeIn(400);
		
	};
	
	var showError = function(){
		// TODO
		console.log("ERROR");
		
	};
	
	var closeArticle = function(){
	
		History.replaceState({}, originalTitle, originalUrl);
		notifyGoogle();
	
		// In case the function is triggered from a box initially open
		if(!currentArticleBox){
			currentArticleBox = $("body > .current");
		}
		
		overlay.fadeOut(fadeOutTime);
		
		currentArticleBox.fadeOut(fadeOutTime, function(){
			currentArticleBox.remove();
			currentArticleBox = null;
			currentArticleTile = null;
			currentArticleUrl = null;
		});
		
	};
	
	var appendCloseButton = function(){
	
		var closer = $("<div />");
		closer.addClass("close")
			.on("click", closeArticle)
			.appendTo(currentArticleBox)
			.fadeIn();
		
	};
	
	var fixArticleScroll = function(){
	
		currentArticleBox.css({
			"overflow-y": "scroll",
			"overflow-x": "hidden",
			"-webkit-overflow-scrolling": "touch"
		});
	
	};
	
	var animateArticleBoxDone = function(){
	
		appendCloseButton();
		fixArticleScroll();
		
	};

	var loadArticleTextDone = function(resp, status, xhr){
	
		var title = xhr.getResponseHeader("X-AJAX-RESPONSE-TITLE");
		History.replaceState({}, title, currentArticleUrl);
		notifyGoogle();
	
	};
	
	var openArticle = function(){
	
		currentArticleTile = $(this);
		currentArticleBox = currentArticleTile.clone();
		currentArticleUrl = currentArticleBox.find("h1 a").prop("href");
		
		if(!History.enabled){
			window.location = currentArticleUrl;
			return;
		}
		
		currentArticleBox.css(getArticleStartCss());
		var debugEndCss = getArticleEndCss();

		currentArticleBox.addClass("current");
		currentArticleBox.appendTo("body");
		
		var animationOptions = getArticleEndCss();
		var articleLoadOptions = getArticleLoadOptions();
		
		var loadArticleText = $.ajax(articleLoadOptions);
		var animateArticleBox = currentArticleBox.animate(animationOptions, fadeInTime).promise();
		var animateAndLoad = $.when(loadArticleText, animateArticleBox);
		
		animateArticleBox.done(animateArticleBoxDone);
		loadArticleText.done(loadArticleTextDone);
		animateAndLoad.done(showArticle);
		loadArticleText.fail(showError);
		
		overlay.fadeIn(fadeInTime);
		
	};

	var showStartupArticle = function(){

		if($(".current").length > 0){
			currentArticleBox = $(".current");
			currentArticleBox.css(getArticleEndCss());
			overlay.show();
			appendCloseButton();
			fixArticleScroll();
		}

	};
	
	var setup = function(){
	
		// Masonry setup
		var masonryOptions = {
			itemSelector : '.post',
			isAnimated: false,
			isFitWidth: true
		};
		$('.container').masonry(masonryOptions);
		
		// Url state setup
		originalTitle = window.blogtitle ? window.blogtitle : document.title;
		originalUrl = window.blogurl ? window.blogurl : window.location.pathname;
		
		// Bindings
		$(".container .post:not(.nop) a").on("click", function(e){ e.preventDefault(); });
		$(".container .post:not(.nop)").on("click", openArticle);
		$(window).on("resize", resizeArticleBox);
		$("body > .current > .close").on("click", closeArticle);

		// Show current article, if there is should be an open article on load
		showStartupArticle();

		// Let's go!
		$("#hider").fadeOut();
		
	};
	
	App.setup = setup;

})(jQuery, window.App = window.App || {});
