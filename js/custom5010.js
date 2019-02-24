jQuery(document).ready(function(){jQuery('.main-navigation a[href^="#"]').on("click",function(e){e.preventDefault();var n=this.hash,t=jQuery(n);jQuery("html, body").animate({scrollTop:t.offset().top-65},1000,"swing")}),function(e){e(".btn-menu1").click(function(n){n.preventDefault(),e("body").toggleClass("with--sidebar"),e("#mainnav-mobi").css("display","block")}),e("#site-cache").click(function(n){e("body").removeClass("with--sidebar")})}(jQuery)});

jQuery(document).ready(function() {
    jQuery('nav#mainnav-mobi').mmenu({
        drag: true,
        pageScroll: {
            scroll: true,
            update: true
        },
        // extensions: {
        // 	'all': ['pagedim-white'],
        // 	'(min-width: 400px)' : ['pagedim-black']
        // },
        sidebar: {
            expanded: 800
        }
    });
});
jQuery(document).ready(function() {
    jQuery("#mobilenav").mmenu({
        // Options
    });
    var API = jQuery("#mobilenav").data("mmenu");

    jQuery(".btn-menu").click(function() {
        API.open();
    });
    jQuery("#mobile-menu li a,.btn-menu").click(function() {
        API.close();
    });
});
jQuery(document).ready(function() {
    jQuery('#mobilenav a[href^="#"]').on("click", function(e) {
        e.preventDefault();
        var n = this.hash,
            t = jQuery(n);
        jQuery("html, body").animate({
            scrollTop: t.offset().top - 78
        }, 0, "swing")
    })
});

function isValidEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

jQuery(function ($)
{
	var submittingFormInProgress = false,
		$fieldRequired = $('<span role="alert" class="wpcf7-not-valid-tip" style="opacity: 0;">The field is required.</span>'),
		$emailNotValid = $('<span role="alert" class="wpcf7-not-valid-tip">The e-mail address entered is invalid.</span>'),
		$mailSentOK = $(".wpcf7-mail-sent-ok").first(),
		$validationErrors = $(".wpcf7-validation-errors").first(),
		removeFRAfter = 1750,
		$wpcf7Submit = $(".wpcf7-submit"),
		$form = $wpcf7Submit.parents("form").first(),
		$ajaxLoader = $(".ajax-loader"),
		validateForm = function ()
		{
			var $yourName = $form.find("input[name=your-name]"),
				$yourEmail = $form.find("input[name=your-email]"),
				valid = true;
			
			if (!!!$yourName.val().length)
			{
				var $fr1 = $fieldRequired.clone();
				$yourName.parent().append($fr1);
				$fr1.animate({ opacity: 1 }, "fast");
				setTimeout(function ()
				{
					$fr1.animate({ opacity: 0 }, "fast", function ()
					{
						$fr1.remove();
					});
				}, removeFRAfter);
				valid = false;
			}
			
			if (!!!$yourEmail.val().length || !isValidEmail($yourEmail.val()))
			{
				var $fr2 = $fieldRequired.clone();
				if (!!$yourEmail.val().length && !isValidEmail($yourEmail.val())) $fr2 = $emailNotValid.clone();
				$yourEmail.parent().append($fr2);
				$fr2.animate({ opacity: 1 }, "fast");
				setTimeout(function ()
				{
					$fr2.animate({ opacity: 0 }, "fast", function ()
					{
						$fr2.remove();
					});
				}, removeFRAfter);
				valid = false;
			}
			
			return valid;
		};
	$wpcf7Submit.off("click").on("click", function (e)
	{
		e.preventDefault();
		if (submittingFormInProgress) return;
		
		submittingFormInProgress = true;
		$ajaxLoader.addClass("is-active");
		
		var isFormValid = validateForm();
		if (isFormValid)
		{
			$.post(
				"https://notify.990consulting.com/990_inquiry/",
				{
					name: $form.find("input[name=your-name]").val(),
					email: $form.find("input[name=your-email]").val(),
					subject: $form.find("input[name=your-subject]").val(),
					message: $form.find("textarea[name=your-message]").val()
				},
				function (resp)
				{
					if (resp == "success")
					{
						$form.find("input[name=your-name]").val("");
						$form.find("input[name=your-email]").val("");
						$form.find("input[name=your-subject]").val("");
						$form.find("textarea[name=your-message]").val("");
						$mailSentOK.slideDown("fast");
						setTimeout(function ()
						{
							$mailSentOK.slideUp("fast");
						}, removeFRAfter * 2);
					}
					else
					{
						$validationErrors.slideDown("fast");
						setTimeout(function ()
						{
							$validationErrors.slideUp("fast");
						}, removeFRAfter * 2);
					}
				}
			).always(function ()
			{
				$ajaxLoader.removeClass("is-active");
				submittingFormInProgress = false;
			});
		}
		else
		{
			$validationErrors.slideDown("fast");
			setTimeout(function ()
			{
				$validationErrors.slideUp("fast");
			}, removeFRAfter * 2);
			$ajaxLoader.removeClass("is-active");
			submittingFormInProgress = false;
		}
	});
});

jQuery(function ($)
{
	function removeHash ()
	{ 
		var scrollV, scrollH, loc = window.location;
		if ("pushState" in history)
			history.pushState("", document.title, loc.pathname + loc.search);
		else {
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;

			loc.hash = "";

			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
		}
	}
	if (!!window.location.hash.length)
	{
		if (window.location.hash == "#services"
		|| window.location.hash == "#TheData"
		|| window.location.hash == "#about"
		|| window.location.hash == "#media"
		|| window.location.hash == "#contact")
		{
			$(window).load(function ()
			{
				var body = $("html, body");
				body.stop().animate({scrollTop: "-=70"}, 0, removeHash);
			});
		}
	}
});
