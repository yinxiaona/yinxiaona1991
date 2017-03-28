import {ajax,getParams} from './Ajax.js';
import {Calendar} from './calendar.js';

//实现tab切换

function Detail(opt){
let defaults={
 id:''
}

let detailobj=Object.assign({},defaults,opt);
let hotel_detail=document.querySelector(".hotel_detail");
let list=document.querySelectorAll(".tab_list li");
let tabContent=document.querySelector(".hotel_detail .content");
let banner=document.querySelector(".banner");
let detailback=document.querySelector(".hotel_detail .back");
let mainBody=document.querySelector(".main_body");
let detailcheckin=document.querySelector(".hotel_detail .currentData");
let detailcheckout=document.querySelector(".hotel_detail .checkout");
let detailmodify=document.querySelector(".hotel_detail .modify");
let book_area=document.querySelector(".book_area");
let orderback=document.querySelector(".order .back");
let checkImg=document.querySelector(".checkImg");
let imgLayer=document.querySelector(".img_layer");
let layerImg=document.querySelector(".img_layer .layer");
//查看图集按钮

checkImg.onclick=()=>{
imgLayer.classList.add("show");
}
layerImg.onclick=()=>{
	imgLayer.classList.remove("show");
}

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



	let box=document.querySelector(".imgs"),
		scroll=document.querySelector(".img_layer .imgs ul"),
		lis=scroll.querySelectorAll("li");
		let startX=0,endX=0, oldX=0,
		clientW=document.documentElement.clientWidth;

		box.addEventListener("touchstart",function(e){
			let event=e||window.event;
			let touch=event.touches[0];
			startX=touch.pageX;
			endX=touch.pageX;
			oldX=parseInt(scroll.style['-webkit-transform'].substring(12));
			if(!oldX){
				oldX=0;
			}

		},false)
		box.addEventListener("touchmove",function(e){
			let event=e||window.event;
			let touch=event.touches[0];
			endX=touch.pageX;
			move(oldX-(endX-startX));

		},false)
		box.addEventListener("touchend",function(e){
			let child=scroll.querySelector(".on"),
			index=getIndex(child);
			if(endX-startX>80){
				index--;
				index=index<=0?0:index;
			}
			else if(endX-startX<-80){
				index++;
				index=index>=lis.length-1?lis.length-1:index;
			}
			go(index);
		},false);

		function go(index){
			scroll.style['-webkit-transition']='all 0.3s ease-in';
			scroll.style['-webkit-transform']='translateX(-'+index*clientW+'px)';
			for(var i=0;i<lis.length;i++){
				lis[i].className='';
			}
			lis[index].className='on';
		}

		function move(x){
		scroll.style['-webkit-transition']='';
		scroll.style['-webkit-transform']='translateX(-'+x+'px)';
		}

		function getIndex(child){
			var index=0;
			let parents=child.parentNode,
				childList=parents.querySelectorAll("li");
				for(var i=0;i<childList.length;i++){
					if(childList[i]==child){
						index=i;
					}
				}
				return index;
		}



//订单页面
let order=document.querySelector(".order");

		//点击back返回hotel页面

		detailback.onclick=()=>{
			hotel_detail.classList.remove("show");
		}


	//tab切换
	for(let j=0;j<list.length;j++){
		list[j].onclick=()=>{
			for(let k=0;k<list.length;k++){
				list[k].className='';
			}
			list[j].className='on';
			tabContent.style.transform='translateX(-'+j*50+'%)';
		}
	}

	//渲染选中的酒店
	function render(){
	  let promise=new Promise((resolve,reject)=>{
	  	ajax({
	  		url:'../../src/js/data/hotel.json',
	  		success:function(data){
	  			resolve(data)

	  		}
	  	})
  	})
	  promise.then((data)=>{
	  		let str='';
	  		console.log(tabContent)
	  	data.data.forEach((val,index)=>{
	  		if(val.hotel_id==detailobj.id){
	  		banner.innerHTML=`<img src="${val.image}" alt="">`;
			str+=`<div class="base_info">
							<h4>${val.name}</h4>
							<p><span class="icon iconfont icon-star"></span><span>星级:${val.stars}级酒店</span></p>
							<p class='tels'><span class="icon iconfont icon-tel"></span><span class='tel'>电话:02087393338</span></p>
							<p><span class="icon iconfont icon-address"></span><span>地址:${val.addr}</span></p>
				</div>
				<div class="hotel_info">
						${val.hotel_introduction}
				</div>`
			tabContent.innerHTML=str;
	  		}
	  	})

	  	//点击电话出现电话层
	  	let tel_page=document.querySelector(".tel_page");
	  	let tel_masker=document.querySelector(".tel_page .tel_masker")
	  	let cancel=document.querySelector(".tel_page .cancel");
	  	let tels=document.querySelector(".tels");
	 	tels.onclick=()=>{
	 	 	tel_page.classList.add("show");
	 	}
	  	cancel.onclick=()=>{
	  	tel_page.classList.remove("show");
	  	}
	  	tel_masker.onclick=()=>{
	  		tel_page.classList.remove("show");
	  	}
	  })
	}
render();

//点击展开剩余添加数据

mainBody.addEventListener("click",(e)=>{
	let target=e.target;
	let targetParent=target.previousSibling.previousSibling;

	if(target.classList.contains("surplus")&&(targetParent.classList.contains("show"))){
		targetParent.classList.remove("show");
		target.innerText='展开剩余全部';
	}else if(target.classList.contains("surplus")&&(!targetParent.classList.contains("show"))){
		targetParent.classList.add("show");
		target.innerText='收起';
	}
},false)

detailcheckin.innerHTML='入住 '+(new Date().getMonth()+1)+"月"+new Date().getDate();
detailcheckout.innerHTML='离店 '+(new Date().getMonth()+1)+"月"+(new Date().getDate()+1);



//点击修改按钮修改日期
detailmodify.onclick=()=>{
	new Calendar({
		callback:function(checkin,checkout){
		document.querySelector(".hotel_detail .currentData").innerHTML='入住'+checkin.slice(5,checkin.length).replace("-",'月');
		document.querySelector(".hotel_detail .checkout").innerHTML='离店'+checkout.slice(5,checkout.length).replace("-",'月');

	}
	}).show();
}


//点击预订的时候显示订单页面
let dd=document.querySelector(".info_page dl .assure_area");
book_area.addEventListener("click",(e)=>{
	let target=e.target||e.srcElement;
	let str='';
	if(target.classList.contains("reserve")){
		layer.classList.add("show");

	}


},false)


//酒店详情遮罩介绍
let layer=document.querySelector(".masker_layer");
let close=document.querySelector(".masker_layer .close");
let orderlayer=document.querySelector(".order");
let btn=document.querySelector(".btn");
let oback=document.querySelector(".order .back");
let book=order.querySelector(".book");
let online=document.querySelector(".online");
let onlineback=document.querySelector(".online .back");
close.onclick=()=>{
	layer.classList.remove("show");
}
layer.onclick=()=>{
layer.classList.remove("show");
}
btn.onclick=function(){
	orderlayer.classList.add("show");
	layer.classList.remove("show");

}
oback.onclick=function(){
	orderlayer.classList.remove("show");
}
online.onclick=function(){

	online.classList.remove("show");
}
console.log(document.querySelector(".order .ordercheckin"));
document.querySelector(".order .ordercheckin").innerHTML=document.querySelector(".hotel_detail .currentData").innerHTML;
document.querySelector(".order .ordercheckout").innerHTML=document.querySelector(".hotel_detail .checkout").innerHTML;

//单击立即预订按钮跳转到担保交易页面
//获取担保页面
let assure=document.querySelector(".assure");
let assureback=assure.querySelector(".back");
let assurebook=assure.querySelector(".book");
let collect_info=assure.querySelector(".collect_info");
book.onclick=()=>{

	assure.classList.add("show");
}

assureback.onclick=()=>{
	assure.classList.remove("show");
}
assurebook.onclick=()=>{
	location.href='order_finished.html';
}

//删除输入的数据
collect_info.addEventListener("click",(e)=>{
	let target=e.target;
	if(target.classList.contains("icon-close")){
	let input=target.previousSibling.children[0];
		input.value='';
	}else{
		e.stopPropagation();
		return false;
	}
},false)

}

export { Detail  }
