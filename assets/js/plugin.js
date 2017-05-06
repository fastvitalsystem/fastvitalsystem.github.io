(function ($) {
    $.fn.setBreadcrumbs = function (json) {
        return this.each(function () {
            $(this).html($('<li>').html(($('<i>').html($('<a>').addClass('icon home').attr({ href: '/', rel: 'sync' })))));
            if (json.length)
                for (var i = 0; i < json.length; i++)
                    $(this).append(($('<li>').html(($('<i>').html($('<a>').html(json[i].html).attr({ href: json[i].href, rel: 'sync' }))))));
            else $(this).append(($('<li>').html(($('<i>').html($('<a>').html(json.html).attr({ href: json.href, rel: 'sync' }))))));
        });
    };
    $.fn.setLoader = function (callback) {
        return this.each(function () {
            $(this).fadeOut(function () {
                $(this).fvsContentMid($('<div>').addClass('loader'));
            }).fadeIn(function () {
                $.isFunction(callback) && callback.call(this);
            });
        });
    };
    $.fn.setPage = function (url, e) {
        return this.each(function () {
            var tmp = $(this);
            $.ajax({url: url, data: undefined, dataType: 'json', cache: false}).done(function (data, textStatus, jqXHR) {
                tmp.fadeOut(function () {
                    $(this).html(data.html);
                    e.setBreadcrumbs(data.breadcrumbs);
                    document.title = data.title;
                }).fadeIn();
            }).fail(function (responseText, textStatus, jqXHR) {
                tmp.fadeOut(function () {
                    //window.location.reload();
                    $(this).load(url);
                }).fadeIn();
            });
        });
    };
    $.fn.fvsContentMid = function (html) {
        return $(this).each(function () {
            $(this).html(
                $('<div>').addClass('fdt').html(
                    $('<div>').addClass('fvm ftc').html(html)
                )
            );
        });
    }
}(jQuery));