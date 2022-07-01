(function ($) {
  "use strict";
  // 初始化默认配置
  var ds_Config = {
    mask: {
      class: 'mask',
      id: null,
      click: function () { },
      leaveEnd: function () { }
    },
    alert: {
      class: 'alert',
      id: null,
      text: '请输入对应的弹框内容',
      btnText: '确定',
      click: function () { },
      leaveEnd: function () { },
      enter: function () { }
    },
    confirm: {
      class: 'confirm',
      id: null,
      text: '请输入对应的弹框内容',
      btnText: '确定',
      cancelText: '取消',
      click: function () { },
      leaveEnd: function () { },
      enter: function () { }
    },
    modal: {
      class: 'modal',
      id: null,
      title:'提示',
      text: '请输入对应的弹框内容',
      cancelShow:false, //是否显示取消按钮
      level: 'warning', //info  success  warning  error
      btnText: '确定',
      cancelText: '取消',
      click: function () { },
      leaveEnd: function () { },
      enter: function () { }
    },
    loading: {
      class: 'public-loading',
      id: null,
      tips: 'Loading'
    },
    standardSelect: {
      el: null,
      isServerRender: false, //是服务端渲染，还是接口
      placeholder: '请选择',
      data: [], //数据
      //数据格式模板,可以是string[] 也可以是 object[]
      dataTemplate: {
        label: 'label', //显示值
        value: 'value' //键值
      },
      //要求selected的值类型要和dataTemplate的类型一样，如果是对象至少存在一个键值对，value优先
      selected: {
        label: 'label',
        value: 'value'
      },
      arrowIcon: '#icon-standard-select-arrow',
      //每次选择选项触发
      click: function () { },
      //第一次创建和每次setOption渲染后触发
      created: function () { },
    },
    standardInput: {
      el: null,//获取带有input-type属性的元素
      type: 'input',//String 设置input类别, 'input','textarea' 默认input
      keyup: function () { },
      focus: function () { },
      blur: function () { },
      //如果是searchinput对象继承于standardinput对象，有一个扩展参数
      searchClick: function () { },//点击搜索按钮
      //如果是codeinput对象继承于standardinput对象，有两个扩展参数
      cooling: 60,//获取验证码冷却时间，默认60s
      getCodeClick: function () { }//获取验证码click事件
    },
    radio: {
      el: null,
      click: function () { }
    },
    checkBox: {
      el: null,
      click: function () { }
    },
    submitButton:{
      el:null,
      submit:function(){}
    },
    uploadImage:{
      el:null,
      isMultiple:false,//是否支持多图上传
      number:6,//最大数量
      format:'png,jpg,jpeg,gif',//支持上次格式
      maxSize:1024*1024*10,//文件大小限制
      previewWidth:300,//压缩-预览图片等比例宽度 px
      previewQuality:0.5,//压缩-预览图片质量 0-1
      errorLog:function(){}//上传失败对象和原因返回
    },
    lazyload:{
      isPreload:false,//是否支持预加载
      offset:0,//滚动加载触发范围,默认0
      //模板,可以为懒加载元素自定义标记属性,作用,为了防止和项目中同名属性冲突
      template: {
        type: 'lazy-type',
        src: 'lazy-src',
        loaded:'lazy-load'
      },
      //单个load完成后,可以对其做自定义的操作,比如,添加类名完成一些响应动效什么的
      loaded: function () {}
    }
  }


  // 基础Dom库
  var ds_Elements = {
    el_component_Mask: function (o) {
      var clas, id
      clas = utils.isExist(o.class) ? ' class="' + o.class + '" ' : ' '
      id = utils.isExist(o.id) ? ' id="' + o.id + '" ' : ''
      return '<div' + id + clas + 'ds-component="mask"></div>'
    },
    el_component_Alert: function (o) {
      var clas, id, text, btnText
      clas = utils.isExist(o.class) ? ' class="' + o.class + '" ' : ' '
      id = utils.isExist(o.id) ? ' id="' + o.id + '" ' : ''
      text = o.text
      btnText = o.btnText
      return (
        '<div' +
        id +
        clas +
        'ds-component="alert">' +
        '<div class="ds-alert-container">' +
        '<div class="ds-alert-box">' +
        '<p class="alert-tips">' +
        text +
        '</p>' +
        '</div>' +
        '<div class="ds-alert-btn-group">' +
        '<a class="ds-alert-yes-btn" href="javascript:void(0)">' +
        btnText +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>'
      )
    },
    el_component_Confirm: function (o) {
      var clas, id, text, btnText, cancelText;
      clas = utils.isExist(o.class) ? ' class="' + o.class + '" ' : ' ';
      id = utils.isExist(o.id) ? ' id="' + o.id + '" ' : '';
      text = o.text;
      btnText = o.btnText;
      cancelText = o.cancelText;
      return (
        '<div' +
        id +
        clas +
        'ds-component="confirm">' +
        '<div class="ds-confirm-container">' +
        '<div class="ds-confirm-box">' +
        '<p class="confirm-tips">' +
        text +
        '</p>' +
        '</div>' +
        '<div class="ds-confirm-btn-group">' +
        '<a class="ds-confirm-cancel-btn" href="javascript:void(0)">' + cancelText + '</a>' +
        '<a class="ds-confirm-yes-btn" href="javascript:void(0)">' +
        btnText +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>'
      )
    },
    el_component_Modal: function (o) {
      var clas, id, title, text, btnText, cancelText, level, cancelShow;
      clas = utils.isExist(o.class) ? ' class="' + o.class + '" ' : ' ';
      id = utils.isExist(o.id) ? ' id="' + o.id + '" ' : '';
      text = o.text;
      btnText = o.btnText;
      cancelText = o.cancelText;
      title=o.title;
      level=o.level;
      cancelShow = o.cancelShow;
      var html='<div' +id +clas +'ds-component="modal">' +
          '<div class="ds-modal-container">' +
            '<div class="ds-modal-box">' +
              '<div class="ds-modal-level">'+
                '<svg class="ds-icon '+level+'" aria-hidden="true">'+
                  '<use xlink:href="#icon-modal-'+level+'"></use>'+
                '</svg>'+
              '</div>'+
              '<div class="ds-modal-content-group">'+
                '<h2 class="ds-modal-content-title">'+title+'</h2>'+
                '<p class="ds-modal-content-tips">' + text + '</p>' +
              '</div>'+
            '</div>' +
            '<div class="ds-modal-btn-group">';
              if (cancelShow){
                html += '<a class="ds-modal-cancel-btn" href="javascript:void(0)">' + cancelText + '</a>';
              }
              html+='<a class="ds-modal-yes-btn" href="javascript:void(0)">' +btnText +'</a>' +
            '</div>' +
          '</div>' +
        '</div>';
      return html;
    },
    el_component_Loading: function (o) {
      var clas, id, tips;
      clas = utils.isExist(o.class) ? ' class="' + o.class + '" ' : ' ';
      id = utils.isExist(o.id) ? ' id="' + o.id + '" ' : '';
      tips = utils.isExist(o.tips) ? o.tips : '';
      return (
        '<div' +
        id +
        clas +
        'ds-component="public-loading">' +
        '<div class="loading-container">' +
        '<div class="loading-container-loader"></div>' +
        '</div>' +
        '<div class="loader-tips">' + tips + '</div>' +
        '</div>'
      )
    },
    el_component_StandardSelect: function (o) {
      //标准Select
      var placeholder, data, arrowIcon, dataTemplate, selected;
      placeholder = utils.isExist(o.placeholder) ? o.placeholder : '请选择';
      arrowIcon = utils.isExist(o.arrowIcon) ? o.arrowIcon : false;
      data = o.data || [];
      dataTemplate = o.dataTemplate;
      selected = o.selected
      var isObject = function (t) {
        return t instanceof Object
      }
      var selectedData = null //选中的值
      //默认选中判断  selectedValue赋值
      if (isObject(dataTemplate)) {
        var sValue = selected[dataTemplate.value];
        var sLabel = selected[dataTemplate.label];
        if (sValue) {
          //如果value存在优先value，否则label (这里不用find方法是因为要兼容ie)
          selectedData = data.filter(function (item) {
            if (sValue && item[dataTemplate.value] === sValue) {
              return true
            }
          })[0];
        } else if (sLabel) {
          selectedData = data.filter(function (item) {
            if (sLabel && item[dataTemplate.label] === sLabel) {
              return true
            }
          })[0];
        }
      } else if (selected) {
        for (var j = 0; j < data.length; j++) {
          if (data[j] === selected) {
            selectedData = data[j];
          }
        }
      }

      //选中的对象已获取，如果为对象，只需要对应的label值，仅限渲染显示
      if (isObject(selectedData)) {
        // 这里的this指向StandardSelect组件实例
        // this.data = JSON.parse(JSON.stringify(selectedData));
        this.data[dataTemplate.label] = selectedData[dataTemplate.label];
        this.data[dataTemplate.value] = selectedData[dataTemplate.value];
        // selectedData=selectedData[dataTemplate.label];
      } else if (selectedData) {
        this.data = {
          label: selectedData,
          value: selectedData
        }
      }
      var html = '<div class="ds-selected-current">';
      if (selectedData) {
        html += '<h2 class="ds-selected-text selected" ds-value="' + (isObject(selectedData) ? selectedData[dataTemplate.value] : selectedData) + '" >' + (isObject(selectedData) ? selectedData[dataTemplate.label] : selectedData) + '</h2>';
      } else {
        html += '<h2 class="ds-selected-text" >' + placeholder + '</h2>';
      }
      if (arrowIcon) {
        html +=
          '<svg class="ds-icon" aria-hidden="true">' +
          '<use xlink:href="' +
          arrowIcon +
          '"></use>' +
          '</svg>'
      }
      html += '</div>' +
        '<div class="ds-select-group">' +
        '<div class="ds-select-item-box">';
      for (var i = 0; i < data.length; i++) {
        html +=
          '<div class="ds-select-item" ds-value="' +
          (isObject(dataTemplate) ? data[i][dataTemplate.value] : data[i]) +
          '">' +
          (isObject(dataTemplate) ? data[i][dataTemplate.label] : data[i]) +
          '</div>';
      }
      html += '</div>' +
        '</div>';
      return html
    },
    el_component_UploadImage:{
      addButton:function(option,acceptStr){
        //添加按钮
        var isMultiple='';
        if(option.isMultiple===true){
          isMultiple='multiple'
        }
        var html='<div class="ds-upload-item ds-upload-add">'+
        '<svg class="ds-icon upload-image-add-icon" aria-hidden="true">'+
            '<use xlink:href="#icon-upload-file"></use>'+
        '</svg>'+
        '<input class="ds-upload-input" type="file" '+isMultiple+' accept="'+acceptStr+'" title="" add-button >'+
        '</div>';
        return html;
      },
      image:function(acceptStr){
        // 添加的image元素组
        // src 是图片显示路径，base64等等，acceptstr是accept属性值
        var html='<div class="ds-upload-item ds-upload-image">'+
        '<div class="ds-image"></div>'+
        '<svg class="ds-icon upload-image-remove-icon" aria-hidden="true">'+
            '<use xlink:href="#icon-upload-remove"></use>'+
        '</svg>'+
        '<input class="ds-upload-input" type="file" accept="'+acceptStr+'" title="" >'+
        '</div>';
        return html;
      }
    }
  }

  /*
   * 【Mask】 对象 参数可选
   * @option={
   *   ds_Config.mask
   * }
   */
  var component_Mask = function (option) {
    //默认配置
    this.config = utils.deepClone(ds_Config.mask);
    this.isInsert = false;
    this.setOption(option ? option : {})
  }
  component_Mask.prototype.setOption = function (option) {
    var self = this
    self.config = utils.configMerge(self.config, option)
    self.$el = $(ds_Elements.el_component_Mask(self.config))
  }
  component_Mask.prototype.show = function () {
    var self = this;
    self.$el.click(utils.throttle(function () {
      if (self.isInsert) {
        self.config.click.call(self);
      }
    }, 300))
    utils.animateEnter(this.$el, function () {
      // 动画进入之前
      self.$el.addClass('show');
      $('body').addClass('hidden');
      if (utils.navigator.isChrome() || utils.navigator.isFirefox() || utils.navigator.isIE()) {
        $('body').addClass('shake');
      }
    }, function () {
      //动画进入完成
      self.isInsert = true;
    }, 300)
  }
  component_Mask.prototype.hide = function () {
    var self = this
    utils.animateLeave(
      self.$el,
      function () {
        //动画开始回调
        self.$el.removeClass('show')
        self.isInsert = false;
      },
      function () {
        //动画结束回调
        $('body').removeClass('hidden');
        if (utils.navigator.isChrome() || utils.navigator.isFirefox() || utils.navigator.isIE()) {
          $('body').removeClass('shake');
        }
        self.config.leaveEnd();
      },
      300
    )
  }

  /*
   * 【Alert】 对象 参数可选
   * @option={
   *   ds_Config.alert
   * }
   */
  var component_Alert = function (option) {
    //默认配置
    this.config = utils.deepClone(ds_Config.alert);
    this.mask = new component_Mask();
    this.setOption(option ? option : {})
  }
  component_Alert.prototype.setOption = function (option) {
    var self = this
    self.config = utils.configMerge(self.config, option)
    self.$el = $(ds_Elements.el_component_Alert(self.config))
    self.$el.find('.ds-alert-yes-btn').click(function () {
      utils.animateLeave(
        self.$el,
        function () {
          self.config.click()
          self.$el.removeClass('show')
          self.mask.hide();
        },
        function () {
          self.config.leaveEnd()
        },
        300
      )
    })
    self.mask.$el.click(utils.throttle(function () {
      self.$el.find('.ds-alert-yes-btn').click();
    }, 300))
  }
  component_Alert.prototype.show = function (text, callbackLeave) {
    var self = this
    if (arguments.length === 2) {
      self.config.text = text
      self.config.leaveEnd = callbackLeave
    } else if (arguments.length === 1) {
      self.config.text = text;
      self.config.leaveEnd = function () { };
    }
    self.setOption({})
    utils.animateEnter(this.$el, function () {
      self.$el.addClass('show')
      self.mask.show();
      self.config.enter()
    }, function () {
      //动画进入之后
    }, 300)
  }

  /*
   * 【Confirm】 对象 参数可选
   * @option={
   *   ds_Config.confirm
   * }
   */
  var component_Confirm = function (option) {
    //默认配置
    this.config = utils.deepClone(ds_Config.confirm);
    this.mask = new component_Mask();
    this.setOption(option ? option : {})
  }
  component_Confirm.prototype.setOption = function (option) {
    var self = this
    self.config = utils.configMerge(self.config, option)
    self.$el = $(ds_Elements.el_component_Confirm(self.config))
    self.$el.find('.ds-confirm-yes-btn').click(function () {
      utils.animateLeave(
        self.$el,
        function () {
          self.config.click()
          self.$el.removeClass('show')
          self.mask.hide();
        },
        function () {
          self.config.leaveEnd()
        },
        300
      )
    });
    self.$el.find('.ds-confirm-cancel-btn').click(function () {
      utils.animateLeave(
        self.$el,
        function () {
          self.config.click();
          self.$el.removeClass('show');
          self.mask.hide();
        },
        function () {
        },
        300
      )
    });
    self.mask.$el.click(utils.throttle(function () {
      self.$el.find('.ds-confirm-cancel-btn').click();
    }, 300))
  }
  component_Confirm.prototype.show = function (text, callbackLeave) {
    var self = this
    if (arguments.length === 2) {
      self.config.text = text;
      self.config.leaveEnd = callbackLeave;
    } else if (arguments.length === 1) {
      self.config.text = text;
    }
    self.setOption({})
    utils.animateEnter(this.$el, function () {
      // 动画进入之前
      self.$el.addClass('show');
      self.mask.show();
      self.config.enter();
    }, function () {
      //动画进入之后
    }, 300)
  }

  /*
   * 【Confirm】 对象 参数可选
   * @option={
   *   ds_Config.confirm
   * }
   */
  var component_Modal = function (option) {
    //默认配置
    this.config = utils.deepClone(ds_Config.modal);
    this.mask = new component_Mask();
    this.setOption(option ? option : {})
  }
  component_Modal.prototype.setOption = function (option) {
    var self = this
    self.config = utils.configMerge(self.config, option)
    self.$el = $(ds_Elements.el_component_Modal(self.config))
    self.$el.find('.ds-modal-yes-btn').click(function () {
      utils.animateLeave(
        self.$el,
        function () {
          self.config.click()
          self.$el.removeClass('show')
          self.mask.hide();
        },
        function () {
          self.config.leaveEnd()
        },
        300
      )
    });
    self.$el.find('.ds-modal-cancel-btn').click(function () {
      utils.animateLeave(
        self.$el,
        function () {
          self.config.click();
          self.$el.removeClass('show');
          self.mask.hide();
        },
        function () {
        },
        300
      )
    });
  }
  component_Modal.prototype.show = function (text, callbackLeave, level, cancelShow) {
    var self = this

    if (arguments.length === 2) {
      self.config.text = text;
      self.config.leaveEnd = callbackLeave;
    } else if (arguments.length === 1) {
      self.config.text = text;
    } else if (arguments.length === 3) {
      self.config.level=level
      self.config.text = text;
      self.config.leaveEnd = callbackLeave;
    } else if (arguments.length === 4) {
      self.config.cancelShow = cancelShow
      self.config.level = level
      self.config.text = text;
      self.config.leaveEnd = callbackLeave;
    }
    self.setOption({})
    utils.animateEnter(this.$el, function () {
      // 动画进入之前
      self.$el.addClass('show');
      self.mask.show();
      self.config.enter();
    }, function () {
      //动画进入之后
    }, 300)
  }


  /*
   * 【Public Loading】 对象 参数可选
   * @option={
   *   ds_Config.
   * }
   */
  var component_Loading = function (option) {
    //默认配置
    this.config = ds_Config.loading
    this.isInsert = false
    this.setOption(option ? option : {})
  }
  component_Loading.prototype.setOption = function (option) {
    var self = this
    self.config = utils.configMerge(self.config, option)
    self.$el = $(ds_Elements.el_component_Loading(self.config))
  }
  component_Loading.prototype.show = function () {
    var self = this
    if (self.isInsert) {
      self.$el.stop().fadeIn(300)
      return false
    }
    self.isInsert = true;
    utils.animateEnter(this.$el, function () {
      self.$el.stop().fadeIn(300)
    }, function () {

    })
  }
  component_Loading.prototype.hide = function () {
    var self = this
    self.$el.stop().fadeOut(300, function () {
      self.$el.remove();
      self.isInsert = false;
    })
  }

  /*
   * 【Standard Select】 对象 参数可选
   * @option={
   *   ds_Config.
   * }
   */
  var component_StandardSelect = function (option) {
    //默认配置
    this.config = utils.deepClone(ds_Config.standardSelect);
    //data用于存放选中值
    this.data = {};
    //动画队列（用于存放计时器id）
    this.animateQueue = [];
    this.active = false;//状态，boolean 默认收起，true为展开
    ds_State.add('standardSelect', this);//添加到共享中心
    this.setOption(option ? option : {})
  }
  component_StandardSelect.prototype.setOption = function (option) {
    var self = this
    self.config = utils.configMerge(self.config, option);
    // console.log(utils.deepClone(option))
    // console.log(option.constructor===RegExp)
    self.$el = $(self.config.el)
    if (!self.config.isServerRender) {
      // 接口渲染
      //将渲染后的内容append到对应的元素里 并且如果有默认选中会赋值到self.data对象里
      self.$el.html('');
      self.$el.append($(ds_Elements.el_component_StandardSelect.call(self, self.config)));
    }
    var $group = self.$el.find('.ds-select-group')
    var $item = self.$el.find('.ds-select-item')
    var $current = self.$el.find('.ds-selected-current')
    var $currentText = self.$el.find('.ds-selected-text')
    if (self.config.isServerRender) {
      // 如果是服务端渲染(只运行第一次)
      var template = self.config.dataTemplate;
      self.data[template.label] = $currentText.text().trim();
      self.data[template.value] = $currentText.attr('ds-value').trim();
      self.config.isServerRender = false;
    }
    this.config.created.call(self);
    this.showGroup = function () {
      $current.addClass('active')
      self.active = true;
      utils.animateDisplayEnter(
        self.animateQueue,
        $group,
        function () {
          // 动画进入之前
          $group.addClass('show');
        },
        function () {
          //动画进入之后
        },
        200
      )
    }
    this.hideGroup = function () {
      $current.removeClass('active');
      self.active = false;
      utils.animateDisplayLeave(
        self.animateQueue,
        $group,
        function () {
          // 动画离开之前
          $group.removeClass('show');
        },
        function () {
          //动画离开之后
        },
        200
      )
    }
    $current.click(function (e) {
      e.stopPropagation()
      // e.eventPhase();
      if (!$(this).hasClass('active')) {
        // 打开下拉框之前先收起其他实例下拉框
        for (var i = 0; i < ds_State.standardSelect.length; i++) {
          if (ds_State.standardSelect[i].active) {
            ds_State.standardSelect[i].hideGroup();
          }
        }
        self.showGroup()
      } else {
        self.hideGroup()
      }
    })
    $item.click(function (e) {
      // e.stopPropagation();
      //data赋值
      if (self.config.dataTemplate instanceof Object) {
        self.data[self.config.dataTemplate.label] = $(this).text();
        self.data[self.config.dataTemplate.value] = $(this).attr('ds-value');

        $currentText.text(self.data[self.config.dataTemplate.label])
        $currentText.attr('ds-value', self.data[self.config.dataTemplate.value])
      } else {
        self.data = {
          label: $(this).text(),
          value: $(this).attr('ds-value')
        }
        $currentText.text(self.data.label)
        $currentText.attr('ds-value', self.data.value)
      }
      // console.log(self.data);
      $currentText.addClass('selected')
      self.hideGroup()
      self.config.click.call(self);
    })
    $(document).click(function () {
      self.hideGroup()
    })
  }

  /*
   * 【Standard Input】 对象 参数可选
   * @option={
   *   ds_Config.
   * }
   */
  var component_StandardInput = function (option) {
    //默认配置
    var self = this;
    self.config = utils.deepClone(ds_Config.standardInput);
    self.config = utils.configMerge(self.config, option);
    //组件根节点
    self.$el = $(self.config.el);
    if (self.config.type === 'input') {
      self.$input = $(self.config.el).find('input');
    } else if (self.config.type === 'textarea') {
      self.$input = $(self.config.el).find('textarea');
    }
    // input聚焦
    try {
      self.$input.focus(function () {
        // removeStyle();
        self.$el.addClass('focus');
        self.config.focus.call(this);
      })
    } catch (e) {
      console.error('standardInput "type"参数不合法,应该为"input"或"textarea')
    }
    // input聚焦
    self.$input.blur(function () {
      self.$el.removeClass('focus');
      self.config.blur.call(this);
    })
    self.$input.keyup(function () {
      self.$el.removeClass('error success');
      self.config.keyup.call(this);
    })
  }
  component_StandardInput.prototype.error = function () {
    this.$input.focus();
    this.$el.addClass('error');
  }
  component_StandardInput.prototype.success = function () {
    this.$el.addClass('success');
  }
  component_StandardInput.prototype.isRequired = function () {
    var self = this;
    var value = self.getValue();
    if (!value || typeof (value) === 'undefined' || value === '') {
      return false;
    }
    return true;
  }
  component_StandardInput.prototype.isEmail = function () {
    var self = this;
    var value = self.getValue();
    if (!/^([a-zA-Z]|[0-9]|\-|\_)(\w|\-|\_)+@([a-zA-Z0-9]|\-|\_)+\.([a-zA-Z]{2,4})$/.test(value)) {
      return false;
    }
    return true;
  }
  component_StandardInput.prototype.isPhone = function () {
    var self = this;
    var value = self.getValue();
    if (!/^1[3456789]\d{9}$/.test(value)) {
      return false;
    }
    return true;
  }
  component_StandardInput.prototype.isFixedPhone = function () {
    var self = this;
    var value = self.getValue();
    if (/^bai0[1-9]{2,3}-[1-9]\d{5,7}$/.test(value)) {
      return false;
    }
    return true;
  }
  component_StandardInput.prototype.getValue = function () {
    return this.$input.val().trim();
  }


  /*
  * 【SearchInput】 对象 参数可选 【继承StandardInput】
  * @option={
  *   ds_Config.
  * }
  */
  var component_SearchInput = function (option) {
    component_StandardInput.call(this, option);
    var self = this;
    self.$search = self.$el.find('.ds-icon-slot');
    self.$search.click(function () {
      self.config.searchClick.call(self);
    })
  }
  /* * 寄生组合式继承 component_StandardInput */
  component_SearchInput.prototype = (function (obj) {
    function f () { };
    f.prototype = obj;
    return new f();
  })(component_StandardInput.prototype);
  // 修复指向问题
  component_SearchInput.prototype.constructor = component_SearchInput;

  /*
* 【SearchInput】获取验证码 对象 参数可选 【继承StandardInput】
* @option={
*   ds_Config.
* }
*/
  var component_CodeInput = function (option) {
    component_StandardInput.call(this, option);
    var self = this;
    self.$getCodeBtn = self.$el.find('.ds-getcode-button');
    var interval = null;//验证码计时器
    self.$getCodeBtn.click(function () {
      if (interval) return false
      var isNext = false;//判断是否可以执行下面代码，比如接口是否请求成功
      self.config.getCodeClick.call(self, function (bool) {
        if (arguments) {
          isNext = bool;
        }
        isNext = true;
        //如果允许下一步
        if (!isNext) return false;
        coolingStart();
      });
    })
    // 开始冷却---
    var coolingStart = function () {
      self.$getCodeBtn.addClass('disable');
      var time = self.config.cooling;
      self.$getCodeBtn.text(time + 's');
      time--;
      interval = setInterval(function () {
        self.$getCodeBtn.text(time + 's');
        if (time <= 0) {
          clearInterval(interval);
          interval = null;
          self.$getCodeBtn.text('获取验证码');
          self.$getCodeBtn.removeClass('disable');
        }
        time--;
      }, 1000)
    }
  }
  /* * 寄生组合式继承 component_StandardInput */
  component_CodeInput.prototype = (function (obj) {
    function f () { };
    f.prototype = obj;
    return new f();
  })(component_StandardInput.prototype);
  // 修复指向问题
  component_CodeInput.prototype.constructor = component_CodeInput;


  /*
  * 【Redio】 对象 参数可选
  */
  var component_Radio = function (option) {
    var self = this;
    self.config = utils.deepClone(ds_Config.radio);
    self.config = utils.configMerge(self.config, option);
    self.$el = $(self.config.el);
    self.$radioItem = self.$el.find('.ds-radio-item');
    self.$radioItem.click(function () {
      if ($(this).hasClass('active')) return false;
      $(this).addClass('active').siblings().removeClass('active');
      self.config.click.call(self);
    })
  }
  component_Radio.prototype.getValue = function () {
    var self = this;
    var $active = self.$el.find('.ds-radio-item.active');
    return {
      label: $active.find('.ds-radio-label').text().trim(),
      value: $active.attr('ds-radio-value')
    }
  }

  /*
* 【Checkbox】 对象 参数可选
*/
  var component_CheckBox = function (option) {
    var self = this;
    self.config = utils.deepClone(ds_Config.checkBox);
    self.config = utils.configMerge(self.config, option);
    self.$el = $(self.config.el);
    self.$checkItem = self.$el.find('.ds-checkbox-item');
    self.$checkItem.click(function () {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active')
      } else {
        $(this).removeClass('active')
      }
      self.config.click.call(self);
    })
  }
  component_CheckBox.prototype.getValue = function () {
    var self = this;
    var labelArr = [];
    var valueArr = [];
    var objArr = [];
    self.$el.find('.ds-checkbox-item.active').each(function () {
      var value = $(this).attr('ds-checkbox-value');
      var label = $(this).children('.ds-checkbox-label').text().trim();
      labelArr.push(label);
      valueArr.push(value);
      objArr.push({ label: label, value: value });
    })
    return [labelArr, valueArr, objArr];
  }

  /*
   * 【Button】 对象 参数可选
  */
  var component_SubmitButton=function(option){
    //默认配置
    var self = this;
    self.config = utils.deepClone(ds_Config.submitButton);
    self.config = utils.configMerge(self.config, option);
    //组件根节点
    self.config.$el = $(self.config.el);
    //提交锁
    self.lock=false;
    self.config.$el.click(function () {
      if(self.lock){
        return false;
      }
      self.lock=true;
      self.showLoading();
      self.disable();
      self.config.submit.call(self, function () {
        // 请求成功后
        self.hideLoading();
        self.active();
        //解锁
        self.lock = false;
      });
    })
  }
  //显示loading
  component_SubmitButton.prototype.showLoading=function(){
    this.config.$el.addClass('loading');
  }
  //隐藏loading
  component_SubmitButton.prototype.hideLoading = function () {
    this.config.$el.removeClass('loading');
  }
  //激活-可点击
  component_SubmitButton.prototype.active = function () {
    this.config.$el.removeClass('disabled');
  }
  //禁止点击
  component_SubmitButton.prototype.disable = function () {
    this.config.$el.addClass('disabled');
  }

    /*
   * 【UploadImage】 对象 参数可选
  */
  var component_UploadImage=function(option){
    var self=this;
    //默认配置
    self.config = utils.deepClone(ds_Config.uploadImage);
    self.config = utils.configMerge(self.config,option);
    self.$el=$(self.config.el);
    //原图库集合
    self.savedArray=[];
    //当前已上传的file集合
    self.filesArray=[];
    //accept属性字符串【格式】
    self.acceptAttr='';
    self.init();
    self.$addBtn=self.$el.find('.ds-upload-add');
    // 添加和修改-委托 
    $(self.$el).on('change','input',function(){
      var $input=$(this);
      if(typeof($input.attr("add-button"))==="undefined"){
        // 修改
        var file=$input[0].files[0];
        var index=$input.parent().index();
        if(file.size>self.config.maxSize){
          // console.log(file.name+':文件大小超出');
          self.config.errorLog.call({tips:'文件过大',name:file.name});
          return false;
        }
        self.filesArray[index]=file;
        self.savedArray[index]=null;
        self.updateImageRender(file,index);
      }else {
        // 添加
        var files=$input[0].files;
        var fileArray=[];//通过渲染条件的图片
        // files集合装在到fileArray数组中
        for(var i=0;i<files.length;i++){
          // 文件大小
          if(files[i].size>self.config.maxSize){
            // console.log(files[i].name+':文件大小超出');
            self.config.errorLog.call({tips:'文件过大',name:files[i].name});
            continue;
          }
          // 判断隐藏添加按钮
          if(self.filesArray.length>=self.config.number-1){
            self.$addBtn.hide();
          }
          // 数量上限判断
          if(self.filesArray.length>=self.config.number){
            // console.log('图片数量达上限');
            self.config.errorLog.call({tips:'图片数量达到上限'})
            break;
          }
          self.savedArray.push(null);
          self.filesArray.push(files[i]);
          fileArray.push(files[i]);
        }
        self.addImageRender(fileArray);
      }
    })
    // 删除图片-委托
    $(self.$el).on('click','.upload-image-remove-icon',function(){
      // 删除
      var $image=$(this).parent();
      var index=$image.index();
      self.filesArray.splice(index, 1);
      self.savedArray.splice(index, 1);
      // console.log(self.filesArray)
      // console.log(self.savedArray)
      $image.remove();
      self.$addBtn.show();
    })

  }
  component_UploadImage.prototype.init=function(){
    // 构造后，初始化
    var self=this;
    // accept属性确定
    var formatArr=self.config.format.split(',');
    for(var i=0;i<formatArr.length;i++){
      var cut=',';
      if(i===formatArr.length-1){
        cut='';
      }
      self.acceptAttr+='image/'+formatArr[i].trim()+cut;
    }
    //判断之前是否存在图片
    var $beforeImage=self.$el.find('.ds-upload-image');
    if($beforeImage.length>0){
      $beforeImage.each(function(){
        var styleStr=$(this).find('.ds-image').attr('style');
        var url=(styleStr.split('(')[1]).split(')')[0];
        self.savedArray.push(url)
        self.filesArray.push(url);
        // 添加单图input
        if($(this).find('input').length===0){
          var inputStr='<input class="ds-upload-input" type="file" accept="'+self.acceptAttr+'" title="" ></input>';
          $(this).append($(inputStr));
        }
      })
    }
    //插入添加按钮
    var $addbtn=$(ds_Elements.el_component_UploadImage.addButton(self.config,self.acceptAttr))
    self.$el.append($addbtn);
    //数量判断，是否显示添加按钮
    if(self.filesArray.length>=self.config.number){
      $addbtn.hide();
    }
  }
  component_UploadImage.prototype.addImageRender=function(fileArray){
    var self=this;
    //添加图片渲染
    var renderImage=function(file,$image){
      var fr=new FileReader();
      fr.filename = file.name;
      fr.readAsDataURL(file);
      fr.onload=function(){
        var url=this.result;
        utils.imageCompress(url,self.config.previewQuality,self.config.previewWidth,function(url){
          $image.find('.ds-image').attr('style','background-image:url('+url+');');
          $image.addClass('show');
        })
      }
    }
    for(var i=0;i<fileArray.length;i++){
      var $image=$(ds_Elements.el_component_UploadImage.image(self.acceptAttr));
      self.$addBtn.before($image);
      var file=fileArray[i];
      renderImage(file,$image);
    }
  }
  component_UploadImage.prototype.updateImageRender=function(file,index){
    //修改图片渲染 file:当前文件，index:所在相册集中的index
    var self=this;
    var $image=self.$el.find('.ds-upload-image').eq(index);
    var $preview=$image.find('.ds-image');
    // 先清空之前的预览图
    $preview.attr('style','');
    $image.removeClass('show');
    var fr=new FileReader();
    fr.filename = file.name;
    fr.readAsDataURL(file);
    fr.onload=function(){
      var url=this.result;
      utils.imageCompress(url,self.config.previewQuality,self.config.previewWidth,function(url){
        $preview.attr('style','background-image:url('+url+');');
        $image.addClass('show');
      })
    }
  }
  component_UploadImage.prototype.getValue=function(){
    return {
      originalArr:this.savedArray,
      newArr:this.filesArray
    }
  }

  /*
   * 【Lazyload】 对象 参数可选
  */
  var component_Lazyload=function(option){
    var self = this;
    //默认配置
    self.config = utils.deepClone(ds_Config.lazyload);
    self.config = utils.configMerge(self.config, option);
    self.$loadArray = $('[' + self.config.template.type + ']:not([' + self.config.template.loaded + '])');
    self.completeCount = 0;//完成加载的个数
    self.init();
  }
  component_Lazyload.prototype.init=function(){
    var self = this;
    var offset=self.config.offset;//触发偏移值
    var trigger = function () {
      var domHeight = $(document).scrollTop();
      var winHeight = $(window).height();
      self.$loadArray.each(function(){
        var $el = $(this);
        if (typeof ($el.attr(self.config.template.loaded)) === "undefined"){
          if ($el.offset().top < domHeight + winHeight + offset) {
            self.start($el);
          }
        }
      })
    }
    trigger();
    $(document).scroll(utils.throttle(function () {
      if (self.completeCount >= self.$loadArray.length){
        return false;
      }
      trigger();
    }, 200))
  }
  component_Lazyload.prototype.start = function (element) {
    var self = this;
    var $el = element;
    var type = $el.attr(self.config.template.type);
    var src = $el.attr(self.config.template.src);
    if(self.config.isPreload){
      self.preload(src,function(){
        if (type === 'img') {
          $el.attr('src', this.src)
        } else if (type === 'bg') {
          $el.attr('style', 'background-image:url(' + this.src + ');')
        }
        $el.attr(self.config.template.loaded,'');
        self.completeCount++
        self.config.loaded.call($el);
      })
    }else {
      if (type === 'img') {
        $el.attr('src', src)
      } else if (type === 'bg') {
        $el.attr('style', 'background-image:url(' + src + ');')
      }
      $el.attr(self.config.template.loaded, '');
      self.completeCount++
      self.config.loaded.call($el);
    }
  }
  component_Lazyload.prototype.preload=function(src,callback){
    var image=new Image();
    image.src=src;
    image.onload=function(){
      callback.call(this);
    }
  }

  // DS 组件库
  var ds = (window.DS_Library = function () { })

  /* * 组件创建工具集
   * configMerge : 用于重写合并config 目的将手动设置的配置项合并到实例当中
   * @m {object} 完整的配置对象
   * @n {object} 需要重新更新的对象 */
  var utils = {
    configMerge: function (m, n) {
      var keys = Object.keys(m)
      for (var i = 0; i < keys.length; i++) {
        var currentKey = n[keys[i]]
        if (currentKey) {
          m[keys[i]] = currentKey
        }
      }
      return m
    },
    isExist: function (val) {
      //判断是否为空,多用于字符串模板拼接
      if (typeof val !== 'undefined' && val !== '') {
        return val
      }
      return false
    },
    deepClone: function (target) {
      //深拷贝
      var result;
      if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
          result = [];
          for (var i in target) {
            // 递归克隆数组中的每一项
            result.push(deepClone(target[i]))
          }
        } else if (target === null) {
          result = null;
          // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if (target.constructor === RegExp) {
          result = target;
        } else {
          result = {};
          for (var i in target) {
            result[i] = utils.deepClone(target[i]);
          }
        }
      } else {
        result = target;
      }
      return result;
    },
    uuidCreate: function () {
      // 创建唯一编号
      var s4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return 'ds' + (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
    },
    throttle: function (func, delay) {
      // 节流函数
      var run = true
      return function () {
        if (!run) {
          return false
        }
        run = false
        setTimeout(function () {
          func.apply(this, arguments)
          run = true
        }, delay || 500)
      }
    },
    debounce: function (func, delay) {
      // 防抖函数
      let timer = null;
      return function () {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(func, delay);
      }
    },
    animateEnter: function ($el, beforeCallback, afterCallback, time) {
      // 动画进入
      $('body').append($el)
      return setTimeout(function () {
        beforeCallback();
        return setTimeout(function () {
          afterCallback();
        }, time)
      }, 30)
    },
    animateLeave: function ($el, beforeCallback, afterCallback, time) {
      // 动画离开
      beforeCallback()
      return setTimeout(function () {
        $el.remove();
        afterCallback()
      }, time)
    },
    animateDisplayEnter: function (anQueue, $el, beforeCallback, afterCallback, time) {
      // 动画进入
      $el.show();
      utils.anQueueTimeoutClear(anQueue);
      return setTimeout(function () {
        beforeCallback()
        anQueue.push(setTimeout(function () {
          afterCallback()
        }, time))
      }, 30)
    },
    animateDisplayLeave: function (anQueue, $el, beforeCallback, afterCallback, time) {
      // 动画离开
      utils.anQueueTimeoutClear(anQueue);
      beforeCallback()
      anQueue.push(setTimeout(function () {
        afterCallback()
        $el.hide();
      }, time))
    },
    anQueueTimeoutClear: function (anQueue) {
      //清除动画队列
      for (var i = 0; i < anQueue.length; i++) {
        clearTimeout(anQueue[i]);
      }
      anQueue.length = 0;
    },
    navigator: {
      isFirefox: function () {
        var explorer = navigator.userAgent;
        return explorer.indexOf("Firefox") >= 0;
      },
      isChrome: function () {
        var explorer = navigator.userAgent;
        return explorer.indexOf("Chrome") >= 0;
      },
      isSafari: function () {
        var explorer = navigator.userAgent;
        return explorer.indexOf("Safari") >= 0;
      },
      isIE: function () {
        var explorer = navigator.userAgent;
        return explorer.indexOf("MSIE") >= 0;
      }
    },
    //图片压缩
      /**图片压缩
   * @param {data} 必填 base64/URL
   * @param {number} 可选 图片质量0-1，默认1
   * @param {number} 可选 图片宽度，默认图片自身宽度
   * @param {Function} 必填 回调base64URL
   * @return base64URL*/
    imageCompress:function () {
      var params = {
        url: null,
        quality: 1,
        width: null,
        callback: function () {}
      }
      if (arguments.length === 2) {
        params.url = arguments[0]
        params.callback = arguments[1]
      } else if (arguments.length === 3) {
        params.url = arguments[0]
        params.quality = arguments[1]
        params.callback = arguments[2]
      } else if (arguments.length === 4) {
        params.url = arguments[0]
        params.quality = arguments[1]
        params.width = arguments[2]
        params.callback = arguments[3]
      } else {
        throw new Error('参数不合法,请对照API')
      }
  
      var img = new Image()
      img.src = params.url
      img.onload = function () {
        var self = this
        // 默认按比例压缩
        var w = self.width,
          h = self.height,
          scale = w / h
        w = params.width || w
        h = w / scale
        //生成canvas
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        // 创建属性节点
        var anw = document.createAttribute('width')
        anw.nodeValue = w
        var anh = document.createAttribute('height')
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(self, 0, 0, w, h)
        // 图像质量
        var quality = params.quality;
        if (params.quality && params.quality <= 1 && params.quality > 0) {
          quality = params.quality
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality)
        // 回调函数返回base64的值
        params.callback(base64)
      }
    }
  }

  /* * 实例状态管理中心
   * 多种相同类型的实例相互影响，内部调用使用 */
  var ds_State = {
    standardSelect: [],
    add: function (name, self) {
      // 添加新实例到对应的状态组
      // name:键名 self:this
      ds_State[name].push(self);
    },
    remove: function (name, self) {
      //移除指定状态组中的某个实例
      var state_group = ds_State[name];
      for (var i = 0; i < state_group.length; i++) {
        if (state_group[i] === self) {
          state_group[i].splice(i, 1);
          return;
        }
      }
    }
  }

  // 将组件扩展到总库
  ds.Mask = component_Mask
  ds.Alert = component_Alert
  ds.Confirm = component_Confirm
  ds.Modal = component_Modal
  ds.Loading = component_Loading
  ds.StandardSelect = component_StandardSelect
  ds.Input = component_StandardInput
  ds.SearchInput = component_SearchInput
  ds.CodeInput = component_CodeInput
  ds.Radio = component_Radio
  ds.CheckBox = component_CheckBox
  ds.SubmitButton = component_SubmitButton
  ds.UploadImage = component_UploadImage
  ds.Lazyload = component_Lazyload
})(jQuery)
