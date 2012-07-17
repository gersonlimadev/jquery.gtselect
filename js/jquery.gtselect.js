/**
 * jQuery gtSelect plugin
 * @author Gerson Thiago <http://www.gersonthiago.com> <https://github.com/gersonthiago/jquery.gtselect>
**/

;(function($){

	$.fn.gtselect = function(options){

		var defaults = {
			speed : 200,
			width : 300,
			height : null,
			linkRedirect : false,
			change : undefined
		}, zIndex = 100;

		function boxGtSelect(el, options){
			this.el = $(el);
			this.options = $.extend({}, defaults, options);

			// create element boxSelect
			this.el.wrap('<div class="gtSelect" data-status="disabled" />');
			this.select = $(el).parent('.gtSelect');
			this.el.css('display','none');
			
			// get options: values and texts
			var htmlSelect = '', 
				field = this.select.find('option'), 
				fields = '', 
				fieldChecked = {
					value : $(field[0]).attr('value'),
					text : $(field[0]).text()
				};

			for(var i=0; i<field.length; i++){
				if($(field[i]).attr('selected')=='selected'){ fieldChecked = {value:$(field[i]).val(),text:$(field[i]).text()}; }
				fields += '<li data-val="'+$(field[i]).val()+'">'+$(field[i]).text()+'</li>';
			}

			// verify height
			var cssHeight = '';
			if(!(this.options.height==null)){
				var cssHeight = ' height:'+this.options.height+'px; overflow-x:hidden; overflow-y:auto;';
			}

			// the new html box select
			htmlSelect += '<p class="activeOption">'+fieldChecked.text+'</p>'+
				'<div class="listSelect" style="'+cssHeight+'"><ul>'+fields+'</ul></div>'+
				'<span class="arrow arrowDown">Down</span>';
			
			this.select.css({'width':this.options.width+'px','zIndex':zIndex}).append(htmlSelect);
			
			this.appendEvents();

			zIndex--;
		}

		// add events for each gtselect
		boxGtSelect.prototype.appendEvents = function(){
			
			var self = this.select,
				opts = this.options,
				timeGtSelect = '';

			var changeValue = function(value, text){
				self.find('select option').attr('selected',false);
				self.find('select option[value="'+value+'"]').attr('selected',true);
				self.find('.activeOption').text(text);
				if( opts.change !== undefined ){
					opts.change(value, text, self);
				}
			}
			
			self.bind('mouseenter mouseleave click', function(e){
				var target = $(this), status = target.attr('data-status');
				if(e.type=='click'){
					if(status=='disabled'){
						target.find('.arrow').removeClass('arrowDown').addClass('arrowUp').text('Up');
						target.find('.listSelect').slideDown(opts.speed);
						target.attr('data-status','enabled');
					} else {
						target.find('.listSelect').slideUp(opts.speed);
						target.find('.arrow').removeClass('arrowUp').addClass('arrowDown').text('Down');
						if(e.target.nodeName.toLowerCase()=='li'){
							// if linkRedirect is true, redirect
							if(opts.linkRedirect){
								if(e.target.getAttribute('data-val')!=""){
									location.href = e.target.getAttribute('data-val');
								}
							} else {
								changeValue($(e.target).attr('data-val'),$(e.target).text());
							}
						}
						target.attr('data-status','disabled');
					}
				} else if(e.type=='mouseenter'){
					if(status=='enabled'){ clearTimeout(timeGtSelect); }
				} else {
					if(status=='enabled'){
						timeGtSelect = setTimeout(function(){
							self.trigger('click');
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