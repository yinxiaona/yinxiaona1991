import { ajax,jsonp} from './Ajax';
import {Swiper} from './swiper';
import {City} from './cites.js';
import {Calendar} from './calendar.js';
let banner=document.querySelector(".banner ul");
ajax({
	type:'get',
	url:'../../src/js/data/banner.json',
	success:function(data){
		render(data);
	new Swiper(".banner",{
		autoplay:2000,
		loop:true,
	})

	}

	})
//渲染banner
function render(data){
let str='';
for(let i in data){
	str+=`<li class='swiper-slide'> <img src="${data[i].url}" ></li>`;
}
banner.innerHTML=str;

}

//获取数据传递给city进行渲染页面

let promise=new Promise(function(resolve,reject){
	ajax({
	type:'get',
	url:'../../src/js/data/cities.json',
	success:function(datas){
		resolve(datas);
	}
	})
})


let curCity=document.querySelector(".curCity");
let liveArea=document.querySelector(".liveArea");
let currentData=document.querySelector(".currentData");
let checkout=document.querySelector(".checkout");
let days=document.querySelector(".days");
 promise.then((datas)=>{
 	let City_module= new City({
 	 	data:datas,
 	 	callback:function(val){
 	 		curCity.innerHTML=val;
 	 	}
 	 })
 //点击入住地时
liveArea.addEventListener("click",()=>{
	City_module.show();
},false)
 })

 //设置入住日期
 let date=new Date(),
 	cYear=date.getFullYear(),
 	cMonth=date.getMonth()+1,
 	cDay=date.getDate(),
 	cHour=date.getHours();
 	if(cHour>18){
 		let newDate=new Date(cYear,cMonth,(cDay+1)),
 			cYear=newDate.getFullYear(),
 			cMonth=newDate.getMonth()+1,
 			cDay=newDate.getDate();

 	}

currentData.innerHTML=cYear+"-"+cMonth+"-"+cDay;
//设置离店日期
let Ldate=new Date(cYear,cMonth,(cDay+2)),
	oYear=Ldate.getFullYear(),
	oMonth= Ldate.getMonth(),
 	oDay=Ldate.getDate();
 	checkout.innerHTML="("+oYear+"-"+oMonth+"-"+oDay+")";

days.innerHTML=oDay-cDay+"晚";


//calendar section

//点击入住时间跳转到calendar页面
let calendar=new Calendar({
	month:1,
    city:curCity.innerHTML,
	callback:function(checkin,checkout,num){
		document.querySelector(".currentData").innerHTML=checkin;
		document.querySelector(".checkout").innerHTML="("+checkout+")";
		document.querySelector(".days").innerHTML=num+"晚";
	}
})
let selectTtime=document.querySelectorAll(".selectTtime");
Array.from(selectTtime).forEach((val,index)=>{
	selectTtime[index].onclick=()=>{
			calendar.show();

	}
})


//location 定位


document.querySelector(".ps").onclick=function(){
  location.href='map.html';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
        var coords = position.coords;
    var latlng = new google.maps.LatLng(
        // 维度
        coords.latitude,
        // 精度
        coords.longitude
    );
    var myOptions = {
        // 地图放大倍数
        zoom: 12,
        // 地图中心设为指定坐标点
        center: latlng,
        // 地图类型
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // 创建地图并输出到页面
    var myMap = new google.maps.Map(
        document.getElementById("map"),myOptions
    );
    // 创建标记
    var marker = new google.maps.Marker({
        // 标注指定的经纬度坐标点
        position: latlng,
        // 指定用于标注的地图
        map: myMap
    });
    //创建标注窗口
    var infowindow = new google.maps.InfoWindow({
        content:"您在这里<br/>纬度："+
            coords.latitude+
            "<br/>经度："+coords.longitude
    });
    //打开标注窗口
    infowindow.open(myMap,marker);

    }, function(error){
      console.log(error)
      switch(error.code) {
        case error.TIMEOUT:
            console.log("A timeout occured! Please try again!");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('We can\'t detect your location. Sorry!');
            break;
        case error.PERMISSION_DENIED:
            console.log('Please allow geolocation access for this to work.');
            break;
        case error.UNKNOWN_ERROR:
            console.log('An unknown error occured!');
            break;
    }

    //跨域请求
    jsonp("http://apis.map.qq.com/ws/location/v1/ip?ip=169.254.207.187&output=jsonp&key=QZFBZ-2F7AD-FRI4M-PDHF5-KU2W6-D3F7J",function(data){

  var searchService,map,markers = [];
var init = function() {
    var center = new qq.maps.LatLng(39.936273,116.44004334),
    map = new qq.maps.Map(document.getElementById('mapholder'),{
        center: center,
        zoom: 13
    });
    //设置圆形
    new qq.maps.Circle({
        center:new qq.maps.LatLng(39.936273,116.44004334),
        radius: 2000,
        map: map
    });
    var latlngBounds = new qq.maps.LatLngBounds();
    //调用Poi检索类
    searchService = new qq.maps.SearchService({
        complete : function(results){
            var pois = results.detail.pois;
            for(var i = 0,l = pois.length;i < l; i++){
                var poi = pois[i];
                latlngBounds.extend(poi.latLng);
                var marker = new qq.maps.Marker({
                    map:map,
                    position: poi.latLng
                });

                marker.setTitle(i+1);

                markers.push(marker);
            }
            map.fitBounds(latlngBounds);
        }
    });
}

//调用poi类信接口
function searchKeyword() {
    var keyword = document.getElementById("keyword").value;
    region = new qq.maps.LatLng(39.936273,116.44004334);

    searchService.setPageCapacity(5);
    searchService.searchNearBy(keyword, region, 2000);//根据中心点坐标、半径和关键字进行周边检索。
}





    })

    },{
        // 指示浏览器获取高精度的位置，默认为false
        enableHighAcuracy: true,
        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        timeout: 1000,
        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        maximumAge: 3000
    });
}

else{
    alert("Your browser does not support Geolocation!");
}




  }





  //筛选hotel page

      // let hotel=

  //点击搜索酒店按钮出现酒店列表页

  let search=document.querySelector("#search");


    search.onclick=()=>{
    // hotel_module.wrapShow();
    location.href="hotel.html?curCity="+curCity.innerHTML+"&checkin="+currentData.innerHTML+"&checkout="+checkout.innerHTML;

  }









