$(function(){
    let routerName = kits.getRouterName(location.href);
    if(routerName === 'posts' || routerName === 'post-add' || routerName === 'categories'){
        $('#menu-posts').addClass('in').attr('aria-expanded', true);
        $('#menu-posts').siblings('a').removeClass('collapsed');
    }
    if(routerName === 'nav-menus' || routerName === 'slides' || routerName === 'settings'){
        $('#menu-settings').addClass('in').attr('aria-expanded', true);
        $('#menu-settings').siblings('a').removeClass('collapsed');
    }
    $('li').removeClass('active');
    $('#' + routerName).addClass('active');
})