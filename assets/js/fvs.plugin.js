(function ($) {
    jQuery.fn.setBreadcrumbs = function (json) {
        return this.each(function () {
            $(this).html($('<li>').html(($('<i>').html($('<a>').addClass('icon home').attr({ href: '/', rel: 'true' })))));
            if (json.length)
                for (var i = 0; i < json.length; i++)
                    $(this).append(($('<li>').html(($('<i>').html($('<a>').html(json[i].html).attr({ href: json[i].href, rel: 'true' }))))));
            else
                $(this).append(($('<li>').html(($('<i>').html($('<a>').html(json.html).attr({ href: json.href, rel: 'true' }))))));
        });
    };
    jQuery.fn.setLoader = function (callback) {
        return this.each(function () {
            $(this).fadeOut(function () {
                $(this).setHtmlMid($('<div>').addClass('loader'));
            }).fadeIn(function () {
                $.isFunction(callback) && callback.call(this);
            });
        });
    };
    jQuery.fn.setPage = function (url, e, callback) {
        return this.each(function () {
            var tmp = $(this);
            $.ajax({ url: url, data: undefined, dataType: 'json', cache: false }).done(function (data, textStatus, jqXHR) {
                tmp.fadeOut(function () {
                    $(this).html(data.html);
                    e.setBreadcrumbs(data.breadcrumbs);
                    document.title = data.title;
                    $.isFunction(callback) && callback.call(this);
                }).fadeIn();
            }).fail(function (responseText, textStatus, jqXHR) {
                //window.location.reload(); // ---------------------
                $.get(url, function (data, textStatus, jqXHR) {
                    tmp.fadeOut(function () {
                        $(this).html(data);
                        $.isFunction(callback) && callback.call(this);
                    }).fadeIn();
                });
            });
        });
    };
    jQuery.fn.setHtmlMid = function (html) {
        return this.each(function () {
            $(this).html($('<div>').addClass('fdt').html($('<div>').addClass('fvm ftc').html(html)));
        });
    };
    jQuery.fn.aload = function () {
        var url = $(this)[0].href;
        if (url && url.trim().length !== 0) {
            if ($(this).attr('rel') === 'true') {
                if (url !== window.location.href) {
                    $('.view').vload(url, function () {
                        history.pushState({ href: url }, "...", url);
                    });
                }
            }
            else
                window.location.href = url;
        }
        return false;
    };
    jQuery.fn.vload = function (url, callback) {
        $(this).stop(true).setLoader(function () {
            $(this).setPage(url, $('.x-breadcrumbs'), callback);
        });
    };
}(jQuery));
