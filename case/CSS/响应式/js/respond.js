document.onkeydown=function(c){var b=null;if(window.event){b=window.event;}else{b=c;}if(b!=null&&b.ctrlKey&&b.keyCode==13){var a=$("#quickAreaComment").is(":focus");var d=$("#comment").is(":focus");if(true==d){$("#submit").click();}if(true==a){$("#submitQuickBtn").click();}}};$(function(){var a=$("#comment").attr("default");var b=$("#comment").val();if(b==""){$("#comment").val(a);$("#comment").addClass("brack");}$("#comment").focus(function(){$("#comment").removeClass("brack");var c=$("#comment").attr("default");var d=$("#comment").val();if(d==c){$("#comment").val("");}});$("#comment").blur(function(){var d=$("#comment").attr("default");var e=$("#comment").val();if(e==""){$("#comment").addClass("brack");$("#comment").val(d);}else{var c=e.replace(d,"");$("#comment").val(c);$("#comment").removeClass("brack");}});$("#submit").click(function(){var d=$("#comment").attr("default");var e=$("#comment").val();if(d){var c=e.replace(d,"");$("#comment").val(c);}});});function get_init_respond(b,a){$("#quickReply .quickCommentType").val(b);$("#quickReply #comment_post_ID").val(a);var c=Date.parse(new Date());c=c/1000;$.ajax({type:"GET",url:"/respond.php?comment_type="+b+"&post_id="+a,dataType:"json",data:"nowtime="+c,success:function(d){if(d.is_login==0){$("#comment_user_send_message").remove();}else{if(d.user_header_info){$("#user_comment_head").html(d.user_header_info);}$("#login_user_id").val(d.is_login);$("#comment_user_login").remove();if(!d.is_anonymous){if(d.anonymousNotice){$("#comment").after(d.anonymousNotice);}$("#form_display_name").attr("href",smzdm_site_domain+"user").html(d.display_name);}else{$("#form_display_name").html(d.display_name);}if(d.connect_checkbox){$(".checkboxBtn").attr("checked","checked");}if(d.is_comment_ban){$("#submit").attr("disabled",true).fadeTo("slow",0.5);$("#bhNotice").html(d.is_comment_ban);is_comment_ban=true;}}$("#respond").css("display","");}});}function sinaconnect(b){if(b.checked==true){var a="yes";$(".checkboxBtn").attr("checked",true);}else{var a="no";$(".checkboxBtn").attr("checked",false);}$.ajax({type:"GET",url:"/respond.php?act=comment_connect&comment_connect="+a,dataType:"json",success:function(c){}});}