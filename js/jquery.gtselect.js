(function($){

	
	$.fn.gtselect = function(options){

		var defaults = {
			speed : 200,
			width : 300,
			linkRedirect : false
		}, zIndex = 100;

		function boxGtSelect(el, options){
			
			this.el = $(el);
			this.options = $.extend({}, defaults, options);

			// create element boxSelect
			this.el.wrap('<div class="boxSelect" data-status="disabled">');
			this.select = this.el.parent('.boxSelect');
			this.el.css('display','none');
			
			// change attr name
			var attrName = this.el.attr('name');
			this.el.attr('name',attrName+'Old');

			// get options: values and texts
			var htmlSelect = '', 
				field = this.select.find('option'), 
				fields = '', 
				fieldChecked = {
					value : '',
					text : field[0].text
				};
			
			for(var i=0; i<field.length; i++){
				if(field[i].getAttribute('checked')!=null){ fieldChecked = {value:field[i].getAttribute('value'),text:field[i].text}; }
				fields += '<li data-val="'+field[i].getAttribute('value')+'">'+field[i].text+'</li>';
			}

			// the new html box select
			htmlSelect += '<p class="activeOption">'+fieldChecked.text+'</p>'+
				'<div class="listSelect" style="width:'+this.options.width+'"><ul>'+fields+'</ul></div>'+
				'<span class="arrow arrowDown">Down</span>'+
				'<input type="hidden" name="'+attrName+'" value="'+fieldChecked.value+'" />';
			this.select.css({'width':this.options.width,'zIndex':zIndex}).append(htmlSelect);

			this.appendEvents();

			zIndex--;
		}

		// add events for each gtselect
		boxGtSelect.prototype.appendEvents = function(){
			
			var gtSelect = this.select,
				opts = this.options,
				timeGtSelect = '';

			var changeValue = function(value, text){
				gtSelect.find('input').val(value);
				gtSelect.find('.activeOption').text(text);
			}


			gtSelect.bind('mouseenter mouseleave click', function(e){
				var target = $(this), status = gtSelect.attr('data-status');
				if(e.type=='click'){
					if(status=='disabled'){
						target.find('.arrow').removeClass('arrowDown').addClass('arrowUp').text('Up');
						target.find('.listSelect').slideDown(opts.speed);
						gtSelect.attr('data-status','enabled');
					} else {
						target.find('.listSelect').slideUp(opts.speed);
						target.find('.arrow').removeClass('arrowUp').addClass('arrowDown').text('Down');
						if(e.target.nodeName.toLowerCase()=='li'){
							changeValue(e.target.getAttribute('data-val'),e.target.firstChild.textContent)
						}
						gtSelect.attr('data-status','disabled');
					}
				} else if(e.type=='mouseenter'){
					if(status=='enabled'){ clearTimeout(timeGtSelect); }
				} else {
					if(status=='enabled'){ 
						timeGtSelect = setTimeout(function(){
							gtSelect.trigger('click');
						},1000);
					}
				}
			});
						
		}

		return this.each(function(){
			new boxGtSelect(this, options);
		});
		
	}
	

})(jQuery);