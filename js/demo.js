var winW;
var winH;
var items;

$(document).ready(function(){
	winW = $(window).width();
	winH = $(window).height();

	$('.item').popover({
		trigger:'hover',
		// trigger:'click',
		// delay:200,
		container:'body',
		template:'<div class="popover" role="tooltip"><div class="popover-title"></div><div class="popover-content"></div></div>'
	});
});

$(window).load(function(){
	var loading = $('#loading');
	setTimeout(function(){
		$('#loading').fadeOut('slow');
		showRoom();
	},2000);
});

$(window).resize(function(){
	winW = $(window).width();
	winH = $(window).height();
});

function showRoom () {
	var items = $('.item');
	var itemArr = [];
	var i = 0;
	while(i < items.length){ itemArr.push(i); i++; }
	itemArr = shuffle(itemArr);
	$.each(itemArr,function(k,val){
		setTimeout(function(){
			items.eq(val).addClass('active');
		},k*100);
	});

	items.on('click',function(){
		if($(this).hasClass('itemlink')){
			var theURL = $(this).attr('url');
			window.open(theURL,'_blank');
		} else {
			var theID = $(this).attr('id');
			$('#'+theID+'Modal').modal('show');
		}
	});

	$('.modal').on('shown.bs.modal', function () {
		var allThumb = $(this).find('.thumbnail');
		var allThumbNotShow = $(this).find('.thumbnail').not('.showed');

		if(allThumb.length > 0){
			if(allThumbNotShow.length > 0){
				$.each(allThumbNotShow,function(){
					$(this).css('background-image','url('+$(this).attr('src')+')');
					$(this).addClass('showed');
				});
			}
			$(this).find('.thumbnail').eq(0).trigger('click');

			if(allThumb.length == 1){
				$(this).find('.photo-wrapper').addClass('hidethumb');
			}
		}
	});

	$('.modal').on('hide.bs.modal', function () {
		var allIframe = $(this).find('iframe');

		if(allIframe.length > 0){
			allIframe.remove();
		}
	});

	$('.photo-wrapper .thumbnail').on('click',function(){
		var pimg = $(this).parents('.photo-wrapper').find('.pimg');
		var pinfo = $(this).parents('.photo-wrapper').find('.pinfo');
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

		var theInfo = $(this).attr('info');

		pimg.html('');
		if($(this).hasClass('youtube')){
			pimg.append('<iframe width="560" height="320" src="https://www.youtube.com/embed/'+$(this).attr('rel')+'?rel=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>');
		} else {
			pimg.append('<img src="'+$(this).attr('src')+'" />');
		}

		pinfo.text('');
		if(theInfo.length > 0){
			pinfo.html(theInfo);
		}

		if($(this).hasClass('big-info')){
			var allEachDetail = $(this).parents('.modal-body').find('.detail-text-multi').find('.each-detail');
			allEachDetail.removeClass('active');
			allEachDetail.eq($(this).index()).addClass('active');
		}
	});
}

function shuffle(array) {
	var newArr = [], n = array.length, i;

	while (n) {
		i = Math.floor(Math.random() * n--);
		newArr.push(array.splice(i, 1)[0]);
	}

	return newArr;
}