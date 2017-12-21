$(function () {
  initMeters();
  initIscroll();
  initCursor();
});

function initMeters() {
  var scaleValue = 141;
  var item = [];
  for (var a = 0; a < 61; a++) {
    item[a] =
      '<li>' +
      '<div class="scale">' +
      '<div class="scale-line-short"></div>' +
      '<div class="scale-space"></div>' +
      '<div class="scale-line-short"></div>' +
      '<div class="scale-space"></div>' +
      '<div class="scale-line"></div>' +
      '<div class="scale-space"></div>' +
      '<div class="scale-line-short"></div>' +
      '<div class="scale-space"></div>' +
      '</div>' +
      '<div id="' + a + '">' + (scaleValue++) + '</div>' +
      '<input type="hidden" value="' + (scaleValue - 1) + '">' +
      '</li>';
  }
  var meters = '<ul>' + item.join(' ') + '</ul>';
  $("#scroller").append(meters);
}

var myScroll;

function initIscroll() {
  myScroll = new IScroll('#wrapper', {
    eventPassthrough: true,
    scrollX: true,
    scrollY: false,
    preventDefault: false

  });
  //监听滚动结束事件
  myScroll.on('scrollEnd', function () {
    var num = $('#scroller li').length;
    var position = $('.cursor').offset().left;
    var disArray = [];
    var disValue = [];
    for (var a = 0; a < num - 1; a++) {
      var scaleValue = $('#' + a).text();
      var scalePosition = $('#' + a).offset().left;
      var distances = scalePosition - position;
      distances = Math.abs(distances);
      disArray.push(distances);
      disValue.push(scaleValue);
    }
    //获取数组中最小值的索引
    var index = indexOfSmallest(disArray);

    $("#bodyHeight").text(disValue[index]);
    metersAdsorption();
  });

}

//初始游标指向160
function initCursor() {
  var height = 160;
  var te = $("input[value='160']").prev().attr('id');
  myScroll.scrollToElement(document.getElementById(te), 0, true, null);
  $("#bodyHeight").text(height);
}

function indexOfSmallest(a) {
  return a.indexOf(Math.min.apply(Math, a));
}

//米尺吸附
function metersAdsorption() {
  var bodyHeight = $("#bodyHeight").text();
  var el = $('input[value="' + bodyHeight + '"]').prev().attr('id');
  myScroll.scrollToElement(document.getElementById(el), 0, true, null);
}



