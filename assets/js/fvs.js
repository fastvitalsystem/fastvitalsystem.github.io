$(document).ready(function () {
    //history.replaceState( { href: window.location.href }, '...', window.location.href );
    $(this).on('click', 'a', function () {
        return $(this).aload();
    });
    window.addEventListener('popstate', function (e) {
        var x = e.state;
        x && $('.view').vload(x.href);
    });
});
