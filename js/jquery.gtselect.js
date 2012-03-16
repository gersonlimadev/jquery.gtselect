(function($){

	
	$.fn.gtselect = function(options){

		var defaults = {
			speed : 2000,
			linkRedirect : false
		}

		function boxSelect(el, options){
			
			this.el = $(el);
			this.options = $.extend({}, defaults, options);

			this.el.wrap('<div class="boxSelect">');
			this.select = this.el.parent('.boxSelect');
			this.el.css('display','none');
			
			// get options: values and texts
			var htmlSelect = '', 
				field = this.select.find('option'), 
				fields = '', 
				fieldChecked = {
					ind : 0,
					value : 0,
					text : field[0].text
				};

			for(var i=field.length-1; i>0; i--){
				if(field[i].getAttribute('checked')!=null){ fieldChecked = {ind:i,value:field[i].getAttribute('value'),text:field[i].text}; }
				fields += '<li data-val="'+field[i].getAttribute('value')+'">'+field[i].text+'</li>';
			}

			// the new html box select
			htmlSelect += '<p class="activeOption">'+fieldChecked.text+'</p>'+
				'<ul>'+fields+'</ul>'+
				'<span class="arrow arrowDown">Down</span>'+
				'<input type="hidden" name="" value="'+fieldChecked.value+'" />';
			this.select.append(htmlSelect);


		}


		return this.each(function(){
			boxSelect(this, options);
		});
		
	}
	

})(jQuery);