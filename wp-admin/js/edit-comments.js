var theList,theExtraList,toggleWithKeyboard=false;(function(a){setCommentsList=function(){var g,i,h,f=0,c,e,d,b;g=a('#comments-form .tablenav :input[name="_total"]');i=a('#comments-form .tablenav :input[name="_per_page"]');h=a('#comments-form .tablenav :input[name="_page"]');c=function(k,j){var l=a("#"+j.element);if(l.is(".unapproved")){l.find("div.comment_status").html("0")}else{l.find("div.comment_status").html("1")}a("span.pending-count").each(function(){var m=a(this),o;o=m.html().replace(/[ ,.]+/g,"");o=parseInt(o,10);if(isNaN(o)){return}o=o+(a("#"+j.element).is("."+j.dimClass)?1:-1);if(o<0){o=0}a("#awaiting-mod")[0==o?"addClass":"removeClass"]("count-0");o=o.toString();if(o.length>3){o=o.substr(0,o.length-3)+" "+o.substr(-3)}m.html(o)})};e=function(j){j.data._total=g.val();j.data._per_page=i.val();j.data._page=h.val();j.data._url=document.location.href;return j};d=function(j,k,l){if(k<f){return}g.val(j.toString());if(l){f=k}a("span.total-type-count").each(function(){var m=a(this),o;o=g.val().toString();if(o.length>3){o=o.substr(0,o.length-3)+" "+o.substr(-3)}m.html(o)})};b=function(l,j){a("span.pending-count").each(function(){var m=a(this),o;o=m.html().replace(/[ ,.]+/g,"");o=parseInt(o,10);if(isNaN(o)){return}if(a("#"+j.element).is(".unapproved")){o=o-1}else{if(a(j.target).parents("span.unapprove").size()){o=o+1}}if(o<0){o=0}a("#awaiting-mod")[0==o?"addClass":"removeClass"]("count-0");o=o.toString();if(o.length>3){o=o.substr(0,o.length-3)+" "+o.substr(-3)}m.html(o)});a("span.spam-count").each(function(){var m=a(this),o;o=m.html().replace(/[ ,.]+/g,"");o=parseInt(o,10);if(isNaN(o)){return}if(a(j.target).parents("span.spam").size()){o=o+1}else{if(a("#"+j.element).is(".spam")){o=o-1}}if(o<0){o=0}o=o.toString();if(o.length>3){o=o.substr(0,o.length-3)+" "+o.substr(-3)}m.html(o)});if(("object"==typeof l)&&f<j.parsed.responses[0].supplemental.time){d(j.parsed.responses[0].supplemental.total,j.parsed.responses[0].supplemental.time,true);if(a.trim(j.parsed.responses[0].supplemental.pageLinks)){a(".tablenav-pages").find(".page-numbers").remove().end().append(a(j.parsed.responses[0].supplemental.pageLinks))}else{if("undefined"!=typeof j.parsed.responses[0].supplemental.pageLinks){a(".tablenav-pages").find(".page-numbers").remove()}}}else{var k=parseInt(g.val(),10);if(k--<0){k=0}d(k,l,false)}if(theExtraList.size()==0||theExtraList.children().size()==0){return}theList.get(0).wpList.add(theExtraList.children(":eq(0)").remove().clone());a("#get-extra-comments").submit()};theExtraList=a("#the-extra-comment-list").wpList({alt:"",delColor:"none",addColor:"none"});theList=a("#the-comment-list").wpList({alt:"",delBefore:e,dimAfter:c,delAfter:b,addColor:"none"})};a(document).ready(function(){setCommentsList()});commentReply={init:function(){var b=a("#replyrow");a("a.cancel",b).click(function(){return commentReply.revert()});a("a.save",b).click(function(){return commentReply.send()});a("input#author, input#author-email, input#author-url",b).keypress(function(c){if(c.which==13){commentReply.send();c.preventDefault();return false}});a("#the-comment-list .column-comment > p").dblclick(function(){commentReply.toggle(a(this).parent())});a("#doaction, #doaction2, #post-query-submit").click(function(c){if(a("#the-comment-list #replyrow").length>0){commentReply.close()}});this.comments_listing=a('#comments-form > input[name="comment_status"]').val()||""},addEvents:function(b){b.each(function(){a(this).find(".column-comment > p").dblclick(function(){commentReply.toggle(a(this).parent())})})},toggle:function(b){if(a(b).css("display")!="none"){a(b).find("a.vim-q").click()}},revert:function(){if(a("#the-comment-list #replyrow").length<1){return false}a("#replyrow").fadeOut("fast",function(){commentReply.close()});return false},close:function(){a(this.o).fadeIn("fast").css("backgroundColor","");a("#com-reply").append(a("#replyrow"));a("#replycontent").val("");a("#edithead input").val("");a("#replysubmit .error").html("").hide();a("#replysubmit .waiting").hide();if(a.browser.msie){a("#replycontainer, #replycontent").css("height","120px")}else{a("#replycontainer").resizable("destroy").css("height","120px")}},open:function(i,g,c){var e=this,d,b,f;e.close();e.o="#comment-"+i;a("#replyrow td").attr("colspan",a(".widefat thead th:visible").length);d=a("#replyrow"),rowData=a("#inline-"+i);b=e.act=(c=="edit")?"edit-comment":"replyto-comment";a("#action",d).val(b);a("#comment_post_ID",d).val(g);a("#comment_ID",d).val(i);if(c=="edit"){a("#author",d).val(a("div.author",rowData).text());a("#author-email",d).val(a("div.author-email",rowData).text());a("#author-url",d).val(a("div.author-url",rowData).text());a("#status",d).val(a("div.comment_status",rowData).text());a("#replycontent",d).val(a("textarea.comment",rowData).val());a("#edithead, #savebtn",d).show();a("#replyhead, #replybtn",d).hide();f=a(e.o).height();if(f>220){if(a.browser.msie){a("#replycontainer, #replycontent",d).height(f-105)}else{a("#replycontainer",d).height(f-105)}}a(e.o).after(d.hide()).fadeOut("fast",function(){a("#replyrow").fadeIn("fast")})}else{a("#edithead, #savebtn",d).hide();a("#replyhead, #replybtn",d).show();a(e.o).after(d);a("#replyrow").hide().fadeIn("fast")}if(!a.browser.msie){a("#replycontainer").resizable({handles:"s",axis:"y",minHeight:80,stop:function(){a("#replycontainer").width("auto")}})}setTimeout(function(){var l,j,m,h,k;l=a("#replyrow").offset().top;j=l+a("#replyrow").height();m=window.pageYOffset||document.documentElement.scrollTop;h=document.documentElement.clientHeight||self.innerHeight||0;k=m+h;if(k-20<j){window.scroll(0,j-h+35)}else{if(l-20<m){window.scroll(0,l-35)}}a("#replycontent").focus().keyup(function(n){if(n.which==27){commentReply.revert()}})},600);return false},send:function(){var b={};a("#replysubmit .waiting").show();a("#replyrow input").each(function(){b[a(this).attr("name")]=a(this).val()});b.content=a("#replycontent").val();b.id=b.comment_post_ID;b.comments_listing=this.comments_listing;a.ajax({type:"POST",url:wpListL10n.url,data:b,success:function(c){commentReply.show(c)},error:function(c){commentReply.error(c)}});return false},show:function(b){var e,g,f,d;if(typeof(b)=="string"){this.error({responseText:b});return false}e=wpAjax.parseAjaxResponse(b);if(e.errors){this.error({responseText:wpAjax.broken});return false}if("edit-comment"==this.act){a(this.o).remove()}e=e.responses[0];g=e.data;a(g).hide();a("#replyrow").after(g);this.o=f="#comment-"+e.id;this.revert();this.addEvents(a(f));d=a(f).hasClass("unapproved")?"#ffffe0":"#fff";a(f).animate({backgroundColor:"#CCEEBB"},600).animate({backgroundColor:d},600);a.fn.wpList.process(a(f))},error:function(b){var c=b.statusText;a("#replysubmit .waiting").hide();if(b.responseText){c=b.responseText.replace(/<.[^<>]*?>/g,"")}if(c){a("#replysubmit .error").html(c).show()}}};a(document).ready(function(){var e,b,c,d;commentReply.init();if(typeof QTags!="undefined"){ed_reply=new QTags("ed_reply","replycontent","replycontainer","more")}if(typeof a.table_hotkeys!="undefined"){e=function(f){return function(){var h,g;h="next"==f?"first":"last";g=a("."+f+".page-numbers");if(g.length){window.location=g[0].href.replace(/\&hotkeys_highlight_(first|last)=1/g,"")+"&hotkeys_highlight_"+h+"=1"}}};b=function(g,f){window.location=a("span.edit a",f).attr("href")};c=function(){toggleWithKeyboard=true;a("#comments-form thead #cb input:checkbox").click().attr("checked","");toggleWithKeyboard=false};d=function(f){return function(h,g){a("option[value="+f+"]").attr("selected","selected");a("form#comments-form")[0].submit()}};a.table_hotkeys(a("table.widefat"),["a","u","s","d","r","q",["e",b],["shift+a",d("approve")],["shift+s",d("markspam")],["shift+d",d("delete")],["shift+x",c],["shift+u",d("unapprove")]],{highlight_first:adminCommentsL10n.hotkeys_highlight_first,highlight_last:adminCommentsL10n.hotkeys_highlight_last,prev_page_link_cb:e("prev"),next_page_link_cb:e("next")})}})})(jQuery);