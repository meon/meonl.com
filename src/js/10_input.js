
var input = new Object;

$(document).ready(function() {
	if ($('.mainText').size()) {
		$('#contentInsideMain').css('margin', '0 auto');
		return;
	}
	
	$(window).bind('resize', input.adjustHeight);
	input.adjustHeight();

	/* redirect to search.meonl.com if q parameter is set */
	var q = $.getURLParam("q") || '';
	if (q != '') {
		window.location = 'http://search.meonl.com/?q='+q;
	}
	
	$('#searchTypes a').bind('click', input.searchTypeClick);
	
	$('#searchForm').bind('submit', searches.submit);
});

input.searchTypeClick = function (e) {
	var href = $(this).attr('href');
	$('#searchTypes a').removeClass('activeType');
	$(this).find('img').addClass('activeType');
	$('#searchInput').focus();
	return false;
}

input.adjustHeight = function () {
	var contentInsideMain = $('#contentInsideMain');
	var ws = windowSize();
	var heightFull = ws.height - 2*40;  /* 40px is header and footer */
	var marginTop = parseInt((heightFull - 0 - 20 - contentInsideMain.height()) / 2);
	contentInsideMain.css('margin-top', marginTop);
	contentInsideMain.css('margin-bottom', 0);
}
