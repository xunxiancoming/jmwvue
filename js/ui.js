$.fn.UiSearch = function(){
  var ui = $(this);
  $('.ui-search-selected',ui).on('click',function(){
    $('.ui-search-selected-list').show();
    return false;
  });
  $('.ui-search-selected-list a',ui).on('click',function(){
    $('.ui-search-selected').text($(this).text());
    $('.ui-search-selected-list').hide();
    return false;
  })
  $('body').on('click',function(){
    $('.ui-search-selected-list').hide();
  })
}

$.fn.UiTaps = function(){
  var ui = $(this);
  var clickEl = $('.ui-item',ui);
  var uiBody = $('.ui-wraps');
  uiBody.css('display','none').eq(0).css('display','block');

  clickEl.on('click',function(){
    var index = $(this).index();
    clickEl.removeClass('user_focus').eq(index).addClass('user_focus');
    uiBody.css('display','none').eq(index).css('display','block');
  })
}

$.fn.UiItemTap = function(tap,wrap){
  var ui = $(this);
  var clickEl = $('li',tap);
  var uiBody = $('.ui-body',wrap);
  uiBody.css('display','none').eq(0).css('display','block');


  clickEl.on('click',function(){
    var index = $(this).index();
    clickEl.removeClass('focus').eq(index).addClass('focus');
    uiBody.css('display','none').eq(index).css('display','block');
  })
}

$.fn.DatePicker = function(){
  var ui = $(this);
  ui.datepicker({
    language: 'zh-CN',
    autoclose: true,
    todayHighlight: true
  });
}

$.fn.UiSwiper = function(){
  var ui = $(this);
  var swiperImgs = $('.swiper-box a',ui);
  var dots = $('.img-dot ul li',ui);
  var flag = true;
  var index = 1;

  swiperImgs.css({opacity: 0 }).eq(0).css({opacity: 1 });

  var time = function(){
    if(index > swiperImgs.length-1){
      index = 0;
    }
    swiperImgs.animate({opacity: 0 }).eq(index).animate({opacity: 1 });
    dots.removeClass('dot_focus','none').eq(index).addClass('dot_focus','block');
    index++;
  }
  
  var go = setInterval(time,3000);

  dots.on('click',function(){
    var num = $(this).index();
    swiperImgs.animate({opacity: 0 }).eq(num).animate({opacity: 1 });
    dots.removeClass('dot_focus','none').eq(num).addClass('dot_focus','block');
  })

  ui.on('mouseover',function(){
    flag = false;
    clearInterval(go);
  })

  ui.on('mouseout',function(){
    flag = true;
    go = setInterval(time,3000)
  })
}

$.fn.UiFresh = function(){
  var ui = $(this);
  var cardContentHeight = $('.card-body ul',ui).height();
  var cardContent = $('.card-body ul',ui);
  var li = $('.card-body ul li',ui);
  var liHeight = $('.card-body ul li',ui).height();
  var index = 1;
  var top = 0;
  
  if(cardContentHeight >= 190){
    var timer = setInterval(function(){
      if(index > li.length-1){
        index = 1;
      }
      cardContent.animate({top:-(32*index)})
      top  = cardContent.css('top');
      index++;
  
      if(parseInt(top)+cardContentHeight<=190){
        index = 1;
      }
    },1000)
  }
 
}

$(function(){
  $('.ui-search').UiSearch();

  $('.up').UiTaps();

  $('.user-taps').UiItemTap($('.index-taps-title'),$('.index-taps-content'));
  $('.user-taps').UiItemTap($('.notify-taps-title'),$('.notify-taps-content'));
  $('.user-taps').UiItemTap($('.article-taps-title'),$('.article-taps-content'));
  $('.user-taps').UiItemTap($('.personalFile-taps-title'),$('.personalFile-taps-content'));
  $('.user-taps').UiItemTap($('.investFile-taps-title'),$('.investFile-taps-content'));
  $('.user-taps').UiItemTap($('.message-taps-title'),$('.message-taps-content'));

  $('#selecteDate').DatePicker();
  $('#schoolYear').DatePicker();
  $('#dateStart').DatePicker();
  $('#dateEnd').DatePicker();
  $('#timeStart').DatePicker();
  $('#timeEnd').DatePicker();

  $('.img-swiper').UiSwiper();

  $('.card').UiFresh()
})
