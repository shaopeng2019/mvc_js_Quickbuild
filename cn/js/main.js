//公用方法
var handleEvns = {
  pageLayoutFunc: function () {
    // rem响应设置
    var htmlFontSize = APP.utils.getResponsiveFlex(100) + 'px';
    $('html').css({
      fontSize: htmlFontSize
    })
    this.handleEvns.registerComponents();
  },
  registerComponents: function () {
    window.dsModel = new DS_Library.Modal({
      cancelShow: false, //是否显示取消按钮
      level: 'warning', //info success warning error
    })
  }
}

// 页面管理
var PageManage = {
  homeIndex: function () {
    console.log('home page start')
  }
}

var app = new APP({
  pageManage: PageManage,
  handleEvns: handleEvns,
  before: function () {
    // console.log('运行之前')
    this.handleEvns.pageLayoutFunc();
  },
  after: function () {
    // console.log('运行之后')
  }
});