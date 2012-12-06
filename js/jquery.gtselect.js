/**
 * jQuery gtSelect plugin
 * @author Gerson Thiago <http://www.gersonthiago.com> <https://github.com/gersonthiago/jquery.gtselect>
**/

;(function($){

	$.fn.gtselect = function(options) {

		var defaults = {
			speed : 200,
			width : undefined,
			height : undefined,
			linkRedirect : false,
			change : undefined,
			effect : 'slide'
		}, zIndex = 100, count = 0;

		function boxGtSelect(el, options) {
			
			this.el = $(el);
			this.options = $.extend({}, defaults, options);

			// create element boxSelect
			this.el.wrap('<div class="gtSelect" data-status="disabled" />');
			this.select = $(el).parent('.gtSelect');
			this.el.css('display','none');

			// verify if select is "disabled"
			this.selectDisabled = (typeof this.el.attr('disabled') !== 'undefined') ? true : false;

			// get options: values and texts
			var htmlSelect = '', 
				field = this.select.find('option'), 
				fields = '',
				cssHeight = '',
				liTop = 0,
				idClass = (typeof this.el.attr('id') === 'string') ? 'select_' + this.el.attr('id') : 'select'+count;
				width = this.el.width(),
				fieldChecked = {
					value : $(field[0]).attr('value'),
					text : $(field[0]).text()
				};

			// get list of the <option> and create list 
			for(var i = 0; i < field.length; i++){
				
				// get field selected
				if($(field[i]).attr('selected') == 'selected') { 
					
					fieldChecked = {
						value : $(field[i]).val(),
						text : $(field[i]).text()
					}

				}

				fields += '<li data-val="'+ $(field[i]).val() +'">'+ $(field[i]).text() +'</li>';

			}

			// verify height
			if(typeof this.options.height !== 'undefined') {
				cssHeight = 'style="max-height:'+ this.options.height +'px;" data-scroll="true"';
			}

			// if options width undefined, get width of the element
			if( typeof this.options.width === 'undefined' ) {
				this.options.width = width;
			}

			// the new html box select
			htmlSelect += '<span class="bg"></span>';
			htmlSelect += '<p class="activeOption">'+ fieldChecked.text +'</p>';
			htmlSelect += '<div class="listSelect" '+ cssHeight +'>';

			if( cssHeight !== '' ){ 
				htmlSelect += '<div class="scroll" style="max-height:'+ this.options.height +'px; overflow-x:hidden; overflow-y:auto;">'; 
			}

			htmlSelect += '<ul>'+ fields +'</ul>';

			if( cssHeight !== '' ){ 
				htmlSelect += '</div>'; 
			}

			htmlSelect += '</div>';
			htmlSelect += '<span class="arrow arrowDown">Down</span>';


			
			this.select.addClass(idClass).css({
				'width': this.options.width+'px',
				'zIndex': zIndex
			}).append(htmlSelect);
			
			if( !this.selectDisabled ) {
				this.appendEvents();
			}

			zIndex--;
			count++;
		}

		// add events for each gtselect
		boxGtSelect.prototype.appendEvents = function() {
			
			var self = this.select,
				opts = this.options,
				timeGtSelect = '',
				letterSelected = '',
				timerLetter = undefined;

			var changeValue = function(value, text) {
				
				self.find('select option').attr('selected',false);
				self.find('select option[value="'+value+'"]').attr('selected',true);
				self.find('.activeOption').text(text);

				if( opts.change !== undefined ) {
					opts.change(value, text, self);
				}

				self.find('select').trigger('change');

			}
			

			self.bind('mouseenter mouseleave click', function(e) {
				
				var target = $(this), 
					status = target.attr('data-status');

				if(e.type == 'click') {
					
					if(status == 'disabled') {
						
						target.find('.arrow').removeClass('arrowDown').addClass('arrowUp').text('Up');
						target.attr('data-status','waiting');

						if(opts.effect == 'slide') {
							
							target.find('.listSelect').slideDown(opts.speed, function() {
								target.attr('data-status','enabled');
							});

						} else if(opts.effect == 'fade') {

							target.find('.listSelect').fadeIn(opts.speed, function() {
								target.attr('data-status','enabled');
							});

						}

					} else {
						
						target.find('.arrow').removeClass('arrowUp').addClass('arrowDown').text('Down');
						target.attr('data-status','waiting');
						
						if(opts.effect == 'slide') {

							target.find('.listSelect').slideUp(opts.speed, function() {
								target.attr('data-status','disabled');
							});

						} else if(opts.effect == 'fade') {

							target.find('.listSelect').fadeOut(opts.speed, function() {
								target.attr('data-status','disabled');
							});

						}

						self.find('li').css({ opacity : 1 });
						
						if(e.target.nodeName.toLowerCase() == 'li') {
							
							// if linkRedirect is true, redirect
							if(opts.linkRedirect){
								
								if(e.target.getAttribute('data-val') != "") {
									location.href = e.target.getAttribute('data-val');
								}

							} else {
								changeValue($(e.target).attr('data-val'),$(e.target).text());
							}

						}


					}

				} else if(e.type == 'mouseenter') {
					
					if(status == 'enabled') { 
						clearTimeout(timeGtSelect); 
					}

				} else {
					if(status == 'enabled') {
						
						timeGtSelect = setTimeout(function() {
							self.trigger('click');
						},1000);

					}
				}
			});

			// get key
			function execKeyDown(e) {
					
				var key = (e.keyCode ? e.keyCode : e.which),
					letter = '',
					list = [];

				if(typeof timerLetter !== 'undefined') {
					clearTimeout( timerLetter );
				}
				
				switch( key ) {
					case 48 : letter = "0"; break;
						case 96 : letter = "0"; break;
					case 49 : letter = "1"; break;
						case 97 : letter = "1"; break;
					case 50 : letter = "2"; break;
						case 98 : letter = "2"; break;
					case 51 : letter = "3"; break;
						case 99 : letter = "3"; break;
					case 52 : letter = "4"; break;
						case 100 : letter = "4"; break;
					case 53 : letter = "5"; break;
						case 101 : letter = "5"; break;
					case 54 : letter = "6"; break;
						case 102 : letter = "6"; break;
					case 55 : letter = "7"; break;
						case 103 : letter = "7"; break;
					case 56 : letter = "8"; break;
						case 104 : letter = "8"; break;
					case 57 : letter = "9"; break;
						case 105 : letter = "9"; break;
					case 65 : letter = "a"; break;
					case 66 : letter = "b"; break;
					case 67 : letter = "c"; break;
					case 68 : letter = "d"; break;
					case 69 : letter = "e"; break;
					case 70 : letter = "f"; break;
					case 71 : letter = "g"; break;
					case 72 : letter = "h"; break;
					case 73 : letter = "i"; break;
					case 74 : letter = "j"; break;
					case 75 : letter = "k"; break;
					case 76 : letter = "l"; break;
					case 77 : letter = "m"; break;
					case 78 : letter = "n"; break;
					case 79 : letter = "o"; break;
					case 80 : letter = "p"; break;
					case 81 : letter = "q"; break;
					case 82 : letter = "r"; break;
					case 83 : letter = "s"; break;
					case 84 : letter = "t"; break;
					case 85 : letter = "u"; break;
					case 86 : letter = "v"; break;
					case 87 : letter = "w"; break;
					case 88 : letter = "x"; break;
					case 89 : letter = "y"; break;
					case 90 : letter = "z"; break;
				}

				if(letter !== '') {

					letterSelected += letter;

					timerLetter = setTimeout(function() {
						letterSelected = '';
						self.find('li').css({ opacity : 1 });
					}, 1500);

				}

				// verify if existing letter
				self.find('li').each(function(i) {
					
					var li = $(this),
						top = 0;

					// compare the letters with options
					if(li.text().substr(0,letterSelected.length).toLowerCase() == letterSelected && li.attr('data-val') !== '') {
						
						if(self.find('.scroll').length > 0) {
							top = i * (li.height() + parseInt(li.css('paddingTop').replace('px','')) + parseInt(li.css('paddingTop').replace('px','')) );
						}
						
						li.css({ opacity : 1 });

						list.push({
							el : self.find('option[value='+ li.attr('data-val') +']'),
							val : li.attr('data-val'),
							top : top
						});

					} else {

						li.css({ opacity : 0.3 });

					}

				});


				// if count 1
				// select the only option
				if(list.length == 1) {
					
					self.find('select option').attr('selected',false);
					list[0].el.attr('selected',true);
					self.find('li[data-val='+ list[0].val +']').trigger('click');

				} else if(list.length > 1) {

					if(self.find('.scroll').length > 0) {
						self.find('.scroll').animate({ scrollTop : list[0].top }, opts.speed);
					}

				} else {

					self.find('li').css({ opacity : 1 });

				}
				
			}

			// get keydown event
			$('html').bind('keydown', function(e) { 
				if(self.attr('data-status') == 'enabled') {
					execKeyDown(e);
				}
			});

			// get any click
			$('html').bind('click', function(e) {
				if($(e.target).parents('.gtSelect').length == 0){
					if(self.attr('data-status') == 'enabled') {
						clearTimeout(timeGtSelect); 
						self.trigger('click');
					}
				}
			});
			
		}

		return this.each(function() {
			new boxGtSelect(this, options);
		});
		
	}

})(jQuery);