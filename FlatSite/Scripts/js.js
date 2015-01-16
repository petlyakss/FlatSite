function changeBg(img, id, color) {
    var buf = document.getElementById(id);
    var buf2 = document.getElementById(id + "_l");
    buf.style.background = 'url(\'/images/' + img + '.jpg\')';
    buf.style.backgroundRepeat = "repeat-x";
    buf.style.backgroundPosition = "top";
    buf2.style.color = "#" + color;
}

function opt_hover(selector) {

    $("#bg_col" + selector).attr('bgcolor', '#ededed');
    $("#img_l" + selector).attr('src', '/images/l1.jpg');
    $("#img_r" + selector).attr('src', '/images/l2.jpg');
    $("#optimg" + selector).css('display', 'block');
}

function opt_leave(selector) {
    $("#bg_col" + selector).removeAttr('bgcolor');
    $("#img_l" + selector).attr('src', '/images/l3.jpg');
    $("#img_r" + selector).attr('src', '/images/sp.gif');
    $("#optimg" + selector).css('display', 'none');
}

jQuery(document).ready(function () {
    $(".cursor_lupa").mousemove(function (e) {
        info = $('.info_flat');
        info.html($(this).data('label')).show();
        info.css('top', e.pageY + 30).css('left', e.pageX - 40);
    });
    $(".cursor_lupa").mouseout(function (e) {
        info = $('.info_flat');
        info.html('').hide();
    });



    $("img.carucel_inside").click(function () {
        $(".carucel_inside").removeClass('active');
        $(this).addClass('active');
        var src = $(this).attr('data-full');
        $("#active_image").fadeOut('fast', function () {
            $("#active_image").attr('src', src);
        });
        $("#active_image").fadeIn('slow');
    });

    $(".small_sel").click(function () {
        td = $(this).parents('td.sel_parent');
        span = td.find('.small_sel').find('span');
        opts = td.find(".small_options");
        inp = td.find("input");
        if (td.find(".small_options:visible").length > 0) {
            span.html('Выберите');
            inp.val('');
            opts.hide();
        } else {
            opts.show();
        }
    });

    $('.small_options span').click(function () {
        td = $(this).parents('td.sel_parent');
        span = td.find('.small_sel').find('span');
        opts = td.find(".small_options");
        inp = td.find("input");
        text = $(this).text();
        inp.val(text);
        span.html(text);
        opts.hide();

    });


    $("#send_quest").click(function () {
        $(".ask").removeClass('error');
        $("#send_quest").hide();
        $("#loader").show();
        $.post('/ajax/faq.php', $("#feedback").serialize(), function (msg) {
            //alert(msg);
            var json = $.parseJSON(msg);
            if (json.success == true) {
                $("#send_quest").show();
                $("#loader").hide();
                $("#feedback").trigger('reset');
                alert(json.msg);
            } else {
                $.each(json.msg, function (a, b) {
                    $("input[name=" + b + "], textarea[name=" + b + "]").addClass('error');
                });
                $("#send_quest").show();
                $("#loader").hide();
            }
        });
        return false;
    });

    $("#switcher, #switcher_2").live('click', function () {
        var sw = $("#switcher");
        var sw2 = $("#switcher_2");
        if ($("#switcher:visible").length > 0) {
            sw.hide();
            sw2.show();
            $("#nopay").hide();
            $("#pay").show();
        } else {
            sw2.hide();
            sw.show();
            $("#pay").hide();
            $("#nopay").show();
            $("#payment-text, #pay_order_next").show();
            $("#pay_order_form, #pay_order").hide();
        }
    });

    $(".save_ord").click(function (e) {
        $(".err").hide();

        var form = $(this).attr('id');
        $(".save-ord-" + form).hide();
        $(".loader").show();
        $("label").text('');

        $.post('/ajax/order.php', $("#" + form + "_form").serialize(), function (msg) {
            //alert(msg);
            var json = $.parseJSON(msg);
            if (json.success == true) {
                $(".save_ord").show();
                $(".loader").hide();
                $("#" + form + "_form").trigger('reset');
                if (json.pay == false) {
                    $(".transfertype").hide().find('input').attr('disabled', 'disabled');
                    $(".transer_no").attr('checked', 'checked');
                    alert(json.msg);
                    $.fancybox.close();

                } else document.location.href = "/" + json.lang + "/merchant/1.htm";
            } else {

                if (json.pay == true) {
                    var context = $("#pay");
                    $.each(json.msg, function (a, b) {
                        if ($("*[name='" + a + "']", context).parent().find('.select_text').length > 0)
                            $("*[name='" + a + "']", context).parent().find('.select_text').addClass('error_color').text(b);
                        else
                            $("*[name='" + a + "']", context).addClass('error_color').val(b);

                    });
                } else {
                    var context = $("#nopay");
                    $.each(json.msg, function (a, b) {
                        if ($("*[name='" + a + "']", context).parent().find('.select_text').length > 0)
                            $("*[name='" + a + "']", context).parent().find('.select_text').addClass('error_color').text(b);
                        else
                            $("*[name='" + a + "']", context).addClass('error_color').val(b);

                    });
                }
                $(".save-ord-" + form).show();
                $(".loader").hide();
            }
        });

    });

    $("#pay .inp1,#nopay .inp1").live('click', function () {
        var el = $(this).parent().find('.select_text');
        if (el.length > 0) {
            if (el.hasClass('error_color'))
                el.removeClass('error_color').text('Выберите');
        } else {
            if ($(this).hasClass('error_color')) {
                $(this).val('').removeClass('error_color')
            }
        }
    });

    $(".transfer").click(function () {
        var context = $(this).parents('#pay').length > 0 ? $("#pay") : $("#nopay");
        if ($(this).val() == '1') {
            $(".transfertype", context).show().find('input').removeAttr('disabled');
        } else {
            $(".transfertype", context).hide().find('input').attr('disabled', 'disabled');
        }
    });


    $.datepicker.setDefaults($.datepicker.regional["ru"]);
    $(".date_in").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            //$( ".date_out" ).datepicker({"disabled": false });
            $(".date_out").datepicker("option", "minDate", selectedDate);
        },
        minDate: new Date()
    });
    /* var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    var nextday = new Date((tomorrow.getMonth()+1)+','+tomorrow.getDate()+','+tomorrow.getFullYear()+',00:00:00');  */
    $(".date_out").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            //$( ".date_in" ).datepicker( "option", "minDate", selectedDate );
        },
        minDate: new Date()
    });

    $("#prettysel_pay_method").click(function () {
        span = $(this).find('span');
        if ($(".sub:visible").length > 0) {
            span.html('Выберите');
            $("#sel_pay_method").val(0);
            $(".sub").hide();
        } else {
            span.html('');
            $(".sub").show();
        }
    });

    $(".item").click(function () {
        span = $("#prettysel_pay_method").find('span');
        $("#sel_pay_method").val($(this).attr('data-id'));
        span.text($(this).attr('title'));
        $(".sub").hide();
    });
    var debug = false;
    $("#send_form").live('click', function () {
        $("#send_form").hide();
        $("#loader").show();
        var form = $("#review_form");
        $("input, textarea").removeClass('error');
        $.post('/ajax/reviews.php', form.serialize(), function (msg) {
            if (debug) alert("Дебаг сообщение\n" + msg);

            var json = $.parseJSON(msg);
            if (json.success == true) {
                $("#loader").hide();
                $("#send_form").show();
                $("#review_form").trigger('reset');
                alert(json.msg);
                $.fancybox.close();
            } else {
                $.each(json.msg, function (a, b) {
                    $("input[name=" + b + "], textarea[name=" + b + "]").addClass('error');
                });
                $("#loader").hide();
                $("#send_form").show();
            }
        });
        return false;
    });


    $('.highslide-overlay-next').live('mouseover mouseout', function (event) {
        if (event.type == 'mouseover') {
            $(".highslide-overlay-next .highslide-overlay-next-icon").css('display', 'block');
        } else {
            $(".highslide-overlay-next .highslide-overlay-next-icon").css('display', 'none');
        }
    });

    $('.highslide-overlay-prev').live('mouseover mouseout', function (event) {
        if (event.type == 'mouseover') {
            $(".highslide-overlay-prev .highslide-overlay-prev-icon").css('display', 'block');
        } else {
            $(".highslide-overlay-prev .highslide-overlay-prev-icon").css('display', 'none');
        }
    });


    $("#pay_order_next").click(function () {
        $("#payment-text, #pay_order_next").hide();
        $("#pay_order_form, #pay_order").show();
    });
});

function textchange(element) {
    var count = 250;
    a = element.value.length;
    if (a > count) {
        element.value = element.value.substring(0, count);
    }
    a = element.value.length;
    a = count - a;
    $("#leng").text(a);
}

