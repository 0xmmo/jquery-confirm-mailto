(function($){
	$.fn.confirmMailto = function(options){ 

		var settings = $.extend({
            message: 'Do you want to send an email to $to?',
            to: 'href',
            callback: function(){},
            success: function(){},
            fail: function(){}
        }, options );

		var rgx = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

		var handler = function(event){ 

        	var message = settings.message;
        	var to = settings.to;

	    	to = (to=='href') ? $(this).attr('href').match(rgx) : (to=='html') ? $(this).html() : to ; // PS: Strip Tags
			message = (message.replace('$to',to)==message) ? (message+to) : message.replace('$to',to) ;

			if(confirm(message)){
    			settings.success();
    			var result = true;
			}else{
				event.preventDefault();
    			settings.fail();
    			var result = false;
			}

    		setTimeout(function(){ settings.callback(result) },1);

			return result;
		};

	    this.filter('[href^="mailto:"]').each(function(){

	    	$(this).bind('click',handler);

		});

		return this;
	};
}(jQuery));

