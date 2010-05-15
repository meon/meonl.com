$(document).ready(function() {
	$('#swLang').contextMenu({menuClass: 'contextMenu'});
	$('.contextMenu').find('a').click(function () {
		lang = $(this).attr('href');
		url  = 'http://meonl.com/'+lang+'/';
		window.location.href = url;
		return false;
	});
	$('.contextMenu').find('a[href="'+lang+'"]').parent().remove();
});
