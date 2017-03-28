/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function ajax(opt) {
	var defaults = {
		type: 'get' || opt.type,
		url: '',
		data: {},
		success: function success() {},
		error: function error() {}
	};

	var obj = Object.assign({}, defaults, opt);
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if (obj.type == 'get' && obj.data) {
		var str = '';
		for (var i in obj.data) {
			str += i + '=' + obj.data[i] + "&";
		}
		xhr.open(obj.type, obj.url + "?" + str, true);
		xhr.send();
	} else {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.open(obj.type, obj.url, true);
		xhr.send(obj.data);
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				obj.success(JSON.parse(xhr.responseText));
			} else {
				if (obj.error) obj.error();
			}
		}
	};
}

function jsonp(url, callback) {
	window['jsonp_callback'] = function (data) {
		callback(data);
	};
	var script = document.createElement("script");
	script.src = url + "&callback=jsonp_callback()";
	document.body.appendChild(script);
}

function getParams(str) {
	var urls = decodeURI(location.search.split("?")[1]);
	urls = urls.split("&");
	var obj = {};
	for (var i = 0; i < urls.length; i++) {
		var arr = urls[i].split("=");
		obj[arr[0]] = arr[1];
	}

	//return obj;
	return str ? obj[str] : obj;
}

function loadingAnimation() {
	var tpl = '<div class="loading">\n\t\t<div class="loading-img">\n\t\t\t<p class="circle circle1"></p>\n\t\t\t<p class="circle circle2"></p>\n\t\t\t<p class="circle circle3"></p>\n\t\t\t<p class="circle circle4"></p>\n\t\t\t<p class="circle circle5"></p>\n\t\t\t<p class="circle circle6"></p>\n\t\t</div>\n\t</div>';
	var load = document.createElement("div");
	load.className = 'loading';
	load.innerHTML = tpl;
	this.loadingStart = function (container) {
		var domParent = void 0;
		if (typeof container == 'string') {
			domParent = document.querySelector(container);
		} else if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) == 'object') {
			domParent = container;
		} else {
			domParent = document.querySelector(".container");
		}
		this.domParent = domParent;
		domParent.appendChild(load);
	};
	this.stoploading = function () {
		this.domParent.removeChild(load);
	};
}
var load = new loadingAnimation();

exports.ajax = ajax;
exports.jsonp = jsonp;
exports.getParams = getParams;
exports.load = load;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calendar = exports.Calendar = function () {
	function Calendar(opt) {
		_classCallCheck(this, Calendar);

		var defaults = {
			month: null,
			city: '',
			callback: function callback() {}
		};
		var obj = Object.assign({}, defaults, opt);
		this.obj = obj;
		this.date = new Date();
		this.years = this.date.getFullYear();
		this.months = this.date.getMonth();
		this.day = this.date.getDate();
		this.week = this.date.getDay();
		this.days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		this.setDate = new Date(this.years, this.months, 1);
		this.totalDays = this.days[this.months];
		this.firstDay = this.setDate.getDay();
		this.calendarBox = document.querySelector(".calendar");
		console.log(this.calendarBox);
		this.container = document.querySelector(".calendar_list");
		this.currentTime = document.querySelector(".currentTime");
		this.checkoutTime = document.querySelector(".checkout");
		this.longTime = document.querySelector(".days");
		this.dateTitle = document.querySelector(".title");
		this.month = document.querySelector(".month");
		this.year = document.querySelector(".year");
		this.render();
		this.addSub();
		this.bindEvent();
		this.spans = document.querySelectorAll(".fulture");
	}

	//渲染日历


	_createClass(Calendar, [{
		key: "render",
		value: function render(years, months, day, firstDay, totalDays) {
			years = years || this.years;
			months = months || this.months + 1;
			day = day || this.day;
			firstDay = firstDay || this.firstDay;
			totalDays = this.days[months - 1] || this.totalDays;
			firstDay = firstDay - 1;
			if (months == 2) {
				if (years % 4 == 0 && years % 100 != 0 || years % 400 == 0) {
					//判断是平年还是闰年 闰年29天
					this.days[1] = 29;
				}
			}

			var str = '',
			    num = 0;
			for (var _i = this.days[months - 2] - firstDay; _i <= this.days[months - 2]; _i++) {
				str += "<span class='out'>" + _i + "</span>";
				num++;
			}
			if (months == new Date().getMonth() + 1) {
				for (var j = 1; j <= totalDays; j++) {
					if (j == day) {
						str += "<span class='fulture selected' date='" + j + "'>" + j + "</span>";
					} else if (j < day) {
						str += "<span class='out' date='" + j + "'>" + j + "</span>";
					} else {
						str += "<span class='fulture' date='" + j + "'>" + j + "</span>";
					}
					num++;
				}
			} else {
				for (var _j = 1; _j <= totalDays; _j++) {
					if (_j == 1) {
						str += "<span class='fulture selected' date='" + _j + "'>" + _j + "</span>";
					} else {
						str += "<span class='fulture' date='" + _j + "'>" + _j + "</span>";
					}
					num++;
				}
			}
			for (var i = 1; i < 42 - num; i++) {
				str += "<span class='out'>" + i + "</span>";
			}

			this.currentTime.innerHTML = months + "月" + day + "日";
			this.container.innerHTML = str;
			var addDate = new Date(years, months, day);
			this.year.innerHTML = years;
			this.month.innerHTML = months;
		}
		//	绑定

	}, {
		key: "bindEvent",
		value: function bindEvent() {
			var _this = this;

			//日历列表添加click事件
			this.container.addEventListener("click", function (e) {
				var target = e.target;
				var val = target.getAttribute("date");
				if (target.classList.contains("fulture") || target.classList.contains("selected")) {
					for (var i = 0; i < _this.spans.length; i++) {
						_this.spans[i].className = 'fulture';
					}
					target.classList.add("selected");
					_this.currentTime.innerHTML = val;
					var checkin = _this.years + "-" + _this.month.innerHTML + "-" + target.innerHTML;
					var _num = document.querySelector(".num").value;
					var checkout = _this.years + "-" + _this.month.innerHTML + "-" + target.innerHTML;
					_this.obj.callback(checkin, checkout, _num);
					_this.currentTime.innerHTML = _this.month.innerHTML + "月" + target.innerHTML + "日";
				} else {
					return false;
				}
			}, false);
			//返回到主页面
			var back = this.calendarBox.querySelector(".back");
			back.onclick = function () {
				_this.hide();
			};
			//点击完成按钮将收集的数据传到index页面
			var finished = document.querySelector(".finished");
			finished.onclick = function () {
				var selected = document.querySelector(".selected").innerHTML,
				    num = document.querySelector(".num"),
				    month = _this.month.innerHTML,
				    year = _this.year.innerHTML,
				    checkin = year + "-" + month + "-" + selected,
				    newDate = new Date(year, month, selected * 1 + num.value * 1),
				    checkout = newDate.getFullYear() + "-" + newDate.getMonth() + "-" + newDate.getDate();
				_this.obj.callback(checkin, checkout, num.value);
				_this.hide();
				var urls = decodeURI(location.href).split("&")[0];
			};

			//点击+按钮进行加减
			var add = document.querySelector(".add"),
			    sub = document.querySelector(".sub"),
			    num = document.querySelector(".num");

			add.onclick = function () {
				console.log(num.value);
				if (num.value < 7) {
					num.value++;
				}
				num.value = num.value;
			};
			sub.onclick = function () {
				if (num.value > 1) {
					num.value--;
				}
				num.value = num.value;
			};
		}

		//点击next按钮实现月份加加减减功能

	}, {
		key: "addSub",
		value: function addSub() {
			var _this2 = this;

			var prev = document.querySelector(".prev");
			var next = document.querySelector(".next");
			next.addEventListener("click", function () {
				_this2.months++;

				_this2.changeDate(_this2.months);
				_this2.spans = document.querySelectorAll(".fulture");
			}, false);

			prev.addEventListener("click", function () {
				var months = new Date().getMonth() + 1;
				if (_this2.months >= months) {
					_this2.months--;
				}
				_this2.changeDate(_this2.months);
				_this2.spans = document.querySelectorAll(".fulture");
			}, false);
		}

		//改变月份函数

	}, {
		key: "changeDate",
		value: function changeDate(months) {
			var addDate = new Date(this.years, this.months, this.day),
			    month = addDate.getMonth(),
			    years = addDate.getFullYear(),
			    day = addDate.getDate(),
			    totalDays = this.days[month],
			    firstDay = new Date(years, month, 1).getDay();
			this.render(years, month + 1, day, firstDay, totalDays);
		}
		//控制盒子的显示

	}, {
		key: "show",
		value: function show() {
			this.calendarBox.classList.add("show");
		}
		//city page hide
		//控制盒子的隐藏

	}, {
		key: "hide",
		value: function hide() {
			this.calendarBox.classList.remove("show");
		}
	}]);

	return Calendar;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Detail = undefined;

var _Ajax = __webpack_require__(0);

var _calendar = __webpack_require__(1);

//实现tab切换

function Detail(opt) {
	var defaults = {
		id: ''
	};

	var detailobj = Object.assign({}, defaults, opt);
	var hotel_detail = document.querySelector(".hotel_detail");
	var list = document.querySelectorAll(".tab_list li");
	var tabContent = document.querySelector(".hotel_detail .content");
	var banner = document.querySelector(".banner");
	var detailback = document.querySelector(".hotel_detail .back");
	var mainBody = document.querySelector(".main_body");
	var detailcheckin = document.querySelector(".hotel_detail .currentData");
	var detailcheckout = document.querySelector(".hotel_detail .checkout");
	var detailmodify = document.querySelector(".hotel_detail .modify");
	var book_area = document.querySelector(".book_area");
	var orderback = document.querySelector(".order .back");
	var checkImg = document.querySelector(".checkImg");
	var imgLayer = document.querySelector(".img_layer");
	var layerImg = document.querySelector(".img_layer .layer");
	//查看图集按钮

	checkImg.onclick = function () {
		imgLayer.classList.add("show");
	};
	layerImg.onclick = function () {
		imgLayer.classList.remove("show");
	};

	/*
 //渲染banner
 ajax({
 	type:'get',
 	url:'../../src/js/data/banner.json',
 	success:function(data){
 	let str='';
 	for(let i in data){
 	str+=`<li class='swiper-slide'> <img src="${data[i].url}" ></li>`;
 	}
 	scroll.innerHTML=str;
 
 	}
 
 	})*/
	//touch 滑动图片


	var box = document.querySelector(".imgs"),
	    scroll = document.querySelector(".img_layer .imgs ul"),
	    lis = scroll.querySelectorAll("li");
	var startX = 0,
	    endX = 0,
	    oldX = 0,
	    clientW = document.documentElement.clientWidth;

	box.addEventListener("touchstart", function (e) {
		var event = e || window.event;
		var touch = event.touches[0];
		startX = touch.pageX;
		endX = touch.pageX;
		oldX = parseInt(scroll.style['-webkit-transform'].substring(12));
		if (!oldX) {
			oldX = 0;
		}
	}, false);
	box.addEventListener("touchmove", function (e) {
		var event = e || window.event;
		var touch = event.touches[0];
		endX = touch.pageX;
		move(oldX - (endX - startX));
	}, false);
	box.addEventListener("touchend", function (e) {
		var child = scroll.querySelector(".on"),
		    index = getIndex(child);
		if (endX - startX > 80) {
			index--;
			index = index <= 0 ? 0 : index;
		} else if (endX - startX < -80) {
			index++;
			index = index >= lis.length - 1 ? lis.length - 1 : index;
		}
		go(index);
	}, false);

	function go(index) {
		scroll.style['-webkit-transition'] = 'all 0.3s ease-in';
		scroll.style['-webkit-transform'] = 'translateX(-' + index * clientW + 'px)';
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = '';
		}
		lis[index].className = 'on';
	}

	function move(x) {
		scroll.style['-webkit-transition'] = '';
		scroll.style['-webkit-transform'] = 'translateX(-' + x + 'px)';
	}

	function getIndex(child) {
		var index = 0;
		var parents = child.parentNode,
		    childList = parents.querySelectorAll("li");
		for (var i = 0; i < childList.length; i++) {
			if (childList[i] == child) {
				index = i;
			}
		}
		return index;
	}

	//订单页面
	var order = document.querySelector(".order");

	//点击back返回hotel页面

	detailback.onclick = function () {
		hotel_detail.classList.remove("show");
	};

	//tab切换

	var _loop = function _loop(j) {
		list[j].onclick = function () {
			for (var k = 0; k < list.length; k++) {
				list[k].className = '';
			}
			list[j].className = 'on';
			tabContent.style.transform = 'translateX(-' + j * 50 + '%)';
		};
	};

	for (var j = 0; j < list.length; j++) {
		_loop(j);
	}

	//渲染选中的酒店
	function render() {
		var promise = new Promise(function (resolve, reject) {
			(0, _Ajax.ajax)({
				url: '../../src/js/data/hotel.json',
				success: function success(data) {
					resolve(data);
				}
			});
		});
		promise.then(function (data) {
			var str = '';
			console.log(tabContent);
			data.data.forEach(function (val, index) {
				if (val.hotel_id == detailobj.id) {
					banner.innerHTML = '<img src="' + val.image + '" alt="">';
					str += '<div class="base_info">\n\t\t\t\t\t\t\t<h4>' + val.name + '</h4>\n\t\t\t\t\t\t\t<p><span class="icon iconfont icon-star"></span><span>\u661F\u7EA7:' + val.stars + '\u7EA7\u9152\u5E97</span></p>\n\t\t\t\t\t\t\t<p class=\'tels\'><span class="icon iconfont icon-tel"></span><span class=\'tel\'>\u7535\u8BDD:02087393338</span></p>\n\t\t\t\t\t\t\t<p><span class="icon iconfont icon-address"></span><span>\u5730\u5740:' + val.addr + '</span></p>\n\t\t\t\t</div>\n\t\t\t\t<div class="hotel_info">\n\t\t\t\t\t\t' + val.hotel_introduction + '\n\t\t\t\t</div>';
					tabContent.innerHTML = str;
				}
			});

			//点击电话出现电话层
			var tel_page = document.querySelector(".tel_page");
			var tel_masker = document.querySelector(".tel_page .tel_masker");
			var cancel = document.querySelector(".tel_page .cancel");
			var tels = document.querySelector(".tels");
			tels.onclick = function () {
				tel_page.classList.add("show");
			};
			cancel.onclick = function () {
				tel_page.classList.remove("show");
			};
			tel_masker.onclick = function () {
				tel_page.classList.remove("show");
			};
		});
	}
	render();

	//点击展开剩余添加数据

	mainBody.addEventListener("click", function (e) {
		var target = e.target;
		var targetParent = target.previousSibling.previousSibling;

		if (target.classList.contains("surplus") && targetParent.classList.contains("show")) {
			targetParent.classList.remove("show");
			target.innerText = '展开剩余全部';
		} else if (target.classList.contains("surplus") && !targetParent.classList.contains("show")) {
			targetParent.classList.add("show");
			target.innerText = '收起';
		}
	}, false);

	detailcheckin.innerHTML = '入住 ' + (new Date().getMonth() + 1) + "月" + new Date().getDate();
	detailcheckout.innerHTML = '离店 ' + (new Date().getMonth() + 1) + "月" + (new Date().getDate() + 1);

	//点击修改按钮修改日期
	detailmodify.onclick = function () {
		new _calendar.Calendar({
			callback: function callback(checkin, checkout) {
				document.querySelector(".hotel_detail .currentData").innerHTML = '入住' + checkin.slice(5, checkin.length).replace("-", '月');
				document.querySelector(".hotel_detail .checkout").innerHTML = '离店' + checkout.slice(5, checkout.length).replace("-", '月');
			}
		}).show();
	};

	//点击预订的时候显示订单页面
	var dd = document.querySelector(".info_page dl .assure_area");
	book_area.addEventListener("click", function (e) {
		var target = e.target || e.srcElement;
		var str = '';
		if (target.classList.contains("reserve")) {
			layer.classList.add("show");
		}
	}, false);

	//酒店详情遮罩介绍
	var layer = document.querySelector(".masker_layer");
	var close = document.querySelector(".masker_layer .close");
	var orderlayer = document.querySelector(".order");
	var btn = document.querySelector(".btn");
	var oback = document.querySelector(".order .back");
	var book = order.querySelector(".book");
	var online = document.querySelector(".online");
	var onlineback = document.querySelector(".online .back");
	close.onclick = function () {
		layer.classList.remove("show");
	};
	layer.onclick = function () {
		layer.classList.remove("show");
	};
	btn.onclick = function () {
		orderlayer.classList.add("show");
		layer.classList.remove("show");
	};
	oback.onclick = function () {
		orderlayer.classList.remove("show");
	};
	online.onclick = function () {

		online.classList.remove("show");
	};
	console.log(document.querySelector(".order .ordercheckin"));
	document.querySelector(".order .ordercheckin").innerHTML = document.querySelector(".hotel_detail .currentData").innerHTML;
	document.querySelector(".order .ordercheckout").innerHTML = document.querySelector(".hotel_detail .checkout").innerHTML;

	//单击立即预订按钮跳转到担保交易页面
	//获取担保页面
	var assure = document.querySelector(".assure");
	var assureback = assure.querySelector(".back");
	var assurebook = assure.querySelector(".book");
	var collect_info = assure.querySelector(".collect_info");
	book.onclick = function () {

		assure.classList.add("show");
	};

	assureback.onclick = function () {
		assure.classList.remove("show");
	};
	assurebook.onclick = function () {
		location.href = 'order_finished.html';
	};

	//删除输入的数据
	collect_info.addEventListener("click", function (e) {
		var target = e.target;
		if (target.classList.contains("icon-close")) {
			var input = target.previousSibling.children[0];
			input.value = '';
		} else {
			e.stopPropagation();
			return false;
		}
	}, false);
}

exports.Detail = Detail;

/***/ })
/******/ ]);