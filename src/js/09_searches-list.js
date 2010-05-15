var searches = new Object();

searches.fullList   = 'gybwacArsmGdvhBnMulUWSRNfqkDLFzt';

$(document).ready(function(){
	var searchEnginesDiv = $('#searchEngines');
	searchEnginesDiv.append(searches.genHTML(searches.fullList));
	searchEnginesDiv.find('a').bind('click', searches.click);
	searchEnginesDiv.find('a').bind('dblclick', searches.dblclick);
	
	var sInput = document.createElement("input");
	sInput.id = 'sInput';
	sInput.type = 'hidden';
	sInput.name = 's';
	$('#searchInputBoxInside').append(sInput);

	$('#searchForm').attr('action', 'http://search.meonl.com/'+lang+'/');

	var searchesList = $.cookies.get('searches') || 'g';
	// if the window size is smaller than 1200 (to fit 2 search engines) select just one engine
	var ws = windowSize();
	if (ws.width < 1200) {
		searchesList = searchesList.charAt(0);
	}
	for (var i = 0; i < searchesList.length; i++) {
		$('#searchEngines a[href="'+searchesList.charAt(i)+'"]').trigger('click');
	}
	
});

searches.genHTML = function (list, extended) {
	var html = '';
	
	// sort list by name
	var searchList = [];
	for (var i = 0; i < list.length; i++) {
		searchList[i] = list.charAt(i);
	}
	searchList.sort(
		function (a,b) {
			if (searchEngines[lang][a].name < searchEngines[lang][b].name) { return -1 }
			else if (searchEngines[lang][a].name > searchEngines[lang][b].name) { return 1 }
			else { return 0 }
		}
	);
	
	for (var i in searchList) {
		var letter = searchList[i];
		var search = searchEngines[lang][letter];
		
		if (extended) {
			html = html+'<a href="'+letter+'"><img src="'+search.icon+'" width="16px" height="16px"/></a>';
			html = html+'<a href="'+letter+'">'+search.name+'</a>';
			html = html+'<br/>';
		}
		else {
			html = html+'<a href="'+letter+'" title="'+search.name+'"><img src="'+search.icon+'" width="16px" height="16px"/></a>';
		}
	}
	return html;
}

searches.dblclick = function (e) {
	$('#searchEngines a img').removeClass('activeEngine');
	$(this).find('img').addClass('activeEngine');
	$('#sInput').val($(this).attr('href'));
	$.cookies.set('searches', $(this).attr('href'), cfg.cookieSettings);
	
	searches.updateTypeIcon();
	$('#searchInput').focus();
	return false;
}

searches.click = function (e) {
	// if the window size is smaller than 1200 (to fit 2 search engines) select just one engine
	var ws = windowSize();
	if (ws.width < 1200) {
		$('#searchEngines a img').removeClass('activeEngine');
	}

	$(this).find('img').toggleClass('activeEngine');
	if ($('.activeEngine').size() == 0) {
		$(this).find('img').toggleClass('activeEngine');
	}
	
	var searchesList = $('#sInput').val() || '';
	
	$('#searchEngines a').each(function () {
		var letter = $(this).attr('href');
		var img = $(this).find('img');
		if (img.hasClass('activeEngine')) {
			if (searchesList.indexOf(letter) == -1) {
				searchesList = searchesList+letter;
			}
		}
		else {
			searchesList = searchesList.replace(letter, '');
		}
	});

	$('#sInput').val(searchesList);
	$.cookies.set('searches', searchesList, cfg.cookieSettings);
	
	searches.updateTypeIcon();
	$('#searchInput').focus();
	return false;
}

searches.updateTypeIcon = function () {
	var typeImgSrc = 'http://search.meonl.com/favicon.ico';
	if ($('.activeEngine').size() == 1) {
		typeImgSrc = $('.activeEngine').attr('src');
	}
	$('#currentSearch img').attr('src', typeImgSrc);
}

searches.submit = function () {
	if ($('#searchInput').val() == '') {
		return false;
	}
	
	if (($('.activeEngine').size() == 1) && ($('#sInput').attr('value') != 'g')) {
		window.location = searchEngines[lang][$('#sInput').val()].q+$('#searchInput').val();
		return false;
	}
	return true;
}
