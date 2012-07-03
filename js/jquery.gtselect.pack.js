/**
 * jQuery gtSelect plugin
 * @author Gerson Thiago <http://www.gersonthiago.com> <https://github.com/gersonthiago/jquery.gtselect>
**/
(function(a){a.fn.gtselect=function(b){var d={speed:200,width:300,height:null,linkRedirect:false,change:undefined},e=100;function c(f,o){this.el=a(f);this.options=a.extend({},d,o);this.el.wrap('<div class="gtSelect" data-status="disabled" />');this.select=a(f).parent(".gtSelect");this.el.css("display","none");var l=this.el.attr("name");this.el.attr("name",l+"Old");var n="",m=this.select.find("option"),j="",h={value:a(m[0]).attr("value"),text:a(m[0]).text()};for(var g=0;g<m.length;g++){if(a(m[g]).attr("selected")=="selected"){h={value:a(m[g]).val(),text:a(m[g]).text()}}j+='<li data-val="'+a(m[g]).val()+'">'+a(m[g]).text()+"</li>"}var k="";if(!(this.options.height==null)){var k=" height:"+this.options.height+"px; overflow-x:hidden; overflow-y:auto;"}n+='<p class="activeOption">'+h.text+'</p><div class="listSelect" style="'+k+'"><ul>'+j+'</ul></div><span class="arrow arrowDown">Down</span><input type="hidden" name="'+l+'" value="'+h.value+'" />';this.select.css({width:this.options.width+"px",zIndex:e}).append(n);this.appendEvents();e--}c.prototype.appendEvents=function(){var f=this.select,i=this.options,g="";var h=function(j,k){f.find("input").val(j);f.find(".activeOption").text(k);if(i.change!==undefined){i.change(j,k,f)}};f.bind("mouseenter mouseleave click",function(l){var k=a(this),j=k.attr("data-status");if(l.type=="click"){if(j=="disabled"){k.find(".arrow").removeClass("arrowDown").addClass("arrowUp").text("Up");k.find(".listSelect").slideDown(i.speed);k.attr("data-status","enabled")}else{k.find(".listSelect").slideUp(i.speed);k.find(".arrow").removeClass("arrowUp").addClass("arrowDown").text("Down");if(l.target.nodeName.toLowerCase()=="li"){if(i.linkRedirect){if(l.target.getAttribute("data-val")!=""){location.href=l.target.getAttribute("data-val")}}else{h(a(l.target).attr("data-val"),a(l.target).text())}}k.attr("data-status","disabled")}}else{if(l.type=="mouseenter"){if(j=="enabled"){clearTimeout(g)}}else{if(j=="enabled"){g=setTimeout(function(){f.trigger("click")},1000)}}}})};return this.each(function(){new c(this,b)})}})(jQuery);