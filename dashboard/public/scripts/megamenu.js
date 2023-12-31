$(document).ready(function () {
  $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
    var $el = $(this);
    $el.toggleClass('active-dropdown');
    var $parent = $(this).offsetParent('.dropdown-menu');
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
    }
    var $subMenu = $(this).next('.dropdown-menu');
    $subMenu.toggleClass('show');

    $(this).parent('li').toggleClass('show');

    $(this)
      .parents('li.nav-item.dropdown.show')
      .on('hidden.bs.dropdown', function (e) {
        $('.dropdown-menu .show').removeClass('show');
        $el.removeClass('active-dropdown');
      });

    if (!$parent.parent().hasClass('navbar-nav')) {
      $el.next().css({
        'margin-top': '-1px',
        height: '100%',
      });
    }

    return false;
  });
  document.querySelectorAll('select').forEach((element) => {
    element.addEventListener('change', (e) => {
      e.target.setAttribute('title', e.target.value);
    });
  });

  $('#sortable').sortable();
  $('#sortable').disableSelection();
});
