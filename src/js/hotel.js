import { ajax,jsonp,getParams,load} from './Ajax';
import {Calendar} from './calendar.js';
import { Detail } from './detail.js';
console.log(Detail)
//加载动画
   load.loadingStart(".search-hotel");
  //获取数据传递给hotel进行渲染页面

 	//获取页面元素
	let hotel=document.querySelector(".search-hotel");
	let hotel_list=hotel.querySelector(".hotel_list");
	let itemWrap=hotel.querySelector(".content");
	let ps=itemWrap.querySelectorAll("p");
	let filter_items=hotel.querySelector(".filter_items");
	let content=hotel.querySelectorAll(".content div");
	let layer=filter_items.querySelector(".layer");
	let back=hotel.querySelector(".back");
	let checkin=hotel.querySelectorAll(".title_info span")[0];
	let checkout=hotel.querySelectorAll(".title_info span")[1];
	let modify=hotel.querySelector(".modify");
	let navs=hotel.querySelectorAll(".hotel_bottom li");


//渲染页面
	let dataList;
  let promise=new Promise((resolve,reject)=>{
  	ajax({
  		url:'../../src/js/data/hotel.json',
  		success:function(data){
  			resolve(data)

  		}
  	})
  })



  function renderDom(type,image,name,price,stars,addr,distance,district,id,rank){
  	if(type=='string'){
  			return `<dl class="list_item" hotel_id='${id}' rank="${stars}" region='${district}' price='${price}' distance='${distance}' ranks='${rank}' name='${name}' img="${image}" address='${addr}' >
			<dt><img src="${image}" alt=""></dt>
			<dd>
				<h2>${name}</h2>
				<p class="score"><span>4.7分</span><span>￥${price}<sub>起</sub></span></p>
				<p>${stars}级<span class="icon iconfont icon-wifi"></span><span class="park icon iconfont icon-p"></span></p>
				<address><span class='address'>${addr}</span><span class='distance'>${distance/1000}km</span></address>
			</dd>
		</dl>`;
  	}else if(type='dom'){
  		let newDl=document.createElement("dl");
  		newDl.className='list_item';
  		newDl.setAttribute('hotel_id',id);
  		newDl.setAttribute('rank',stars);
  		newDl.setAttribute('name',name);
  		newDl.setAttribute('img',image);
  		newDl.setAttribute('region',district);
  		newDl.setAttribute('price',price);
  		newDl.setAttribute('distance',distance);
  		newDl.setAttribute('address',addr);
  		newDl.setAttribute('ranks',rank);
  		  let str=`<dt><img src="${image}" alt=""></dt>
			<dd>
				<h2>${name}</h2>
				<p class="score"><span>4.7分</span><span>￥${price}<sub>起</sub></span></p>
				<p>${stars}级<span class="icon iconfont icon-wifi"></span><span class="park icon iconfont icon-p"></span></p>
				<address><span class='address'>${addr}</span><span class='distance'>${distance/1000}km</span></address>
			</dd>
		`;
		newDl.innerHTML=str;
		return newDl;
  	}


  }


  promise.then((data)=>{
  		dataList=data;
		let  str=data.data.map((val,index)=>{
				return renderDom('string',val.image,val.name,val.price,val.stars,val.addr,val.distance,val.district,val.hotel_id,val.rank,val.hotel_introduction)
		})

		load.stoploading('.search-hotel');

		hotel_list.innerHTML=str.join("");
		hotel_h=hotel_list.offsetHeight;

  })

 	let hotel_h=0;
 	let titleH=document.querySelector(".title_info").offsetHeight;
 	document.querySelector(".content_list").onscroll=scroll;

		function scroll(){
	 		if(hotel_h-(this.scrollTop+212)<300){
	 			 this.scrollTop=0;
	 			  	ajax({
		  			url:'../../src/js/data/hotel.json',
		  			success:function(data){
		  			let  str=data.data.map((val,index)=>{
						return renderDom('dom',val.image,val.name,val.price,val.stars,val.addr,val.distance,val.district,val.hotel_id,val.rank)
						})

		  				for(let j=0;j<str.length;j++){
		  					hotel_list.appendChild(str[j])
		  				}

		  				hotel_h=document.querySelector(".hotel_list").offsetHeight;
		  				document.querySelector(".content_list").onscroll=scroll;
		  				checkhotel();
  					}
  			})

	 		}

	 		}

//点击事件显示隐藏遮罩层
	let item=hotel.querySelectorAll(".hotel_bottom li ");
	let line=hotel.querySelector(".active");
	//重置nav 里li的样式
		function resetAll(target){
			if(target.classList.contains("on"))return;
			for(let i=0;i<item.length;i++){
					item[i].classList.remove("on");
			}
		}


	Array.from(item).forEach((val,index)=>{
		item[index].onclick=()=>{
			resetAll(item[index]);
			if(!item[index].classList.contains("on")){
			item[index].classList.add("on");
			filter_items.classList.add("show");
				}else{
			item[index].classList.remove("on");
			filter_items.classList.remove("show");
			}
			Array.from(content).forEach((val,ind)=>{
				content[ind].style.display='none';
			})
				content[index].style.display='block';

			let w=4*index*25+"%";
			line.style.transform='translate3d('+w+',0,0)';
		}
	},false)

//点击遮罩层 移除
		layer.onclick=()=>{
			filter_items.classList.remove("show");
			for(let i=0;i<navs.length;i++){
				navs[i].classList.remove("on");
			}
		}


//实现复选框的选择 筛选

		function removeChecked(){
			for(var i=0;i<ps.length;i++){
				ps[i].classList.remove("checked");
			}
		}


		itemWrap.addEventListener("click",(e)=>{
			let target=e.target;
			if(target.tagName=='SPAN'){
				target=target.parentNode;
			}

			if(target.parentNode.classList.contains("sorts")||target.parentNode.classList.contains("price")){
				let childs=target.parentNode.children;
				for(let i=0;i<childs.length;i++){
				childs[i].className='';
				childs[i].querySelectorAll("span")[1].className='icon iconfont icon-checkbox';
				}
				if(target.tagName=='P'&&!target.classList.contains("checked")){
					target.className='checked';
					target.querySelectorAll("span")[1].className='icon iconfont icon-checkbox-copy';
				}
				let types=target.getAttribute("data-sort");
				//排序
				if(target.parentNode.classList.contains("sorts")){
					sorts(types);
				}


			}else{
				if(target.tagName=='P'&& !target.classList.contains("checked")){
			target.className='checked';
			target.querySelectorAll("span")[1].className='icon iconfont icon-checkbox-copy';
			}else{

			target.classList.remove("checked");
			target.querySelectorAll("span")[1].className='icon iconfont icon-checkbox';
			}

			}
			//筛选数据
			filterdata(collect());

			//按照价格筛选数据




			},false)
		//排序函数
		function sorts(type){
			let dls=Array.from(document.querySelectorAll(".hotel_list dl"));
		dls=dls.sort(function(a,b){
				return a.getAttribute(type)-b.getAttribute(type)
				})
		for(let j=0;j<dls.length;j++){
						hotel_list.appendChild(dls[j]);
				}

			}



		//收集信息
		function collect(){
			let filter_item={
				rank:[],
				region:[],
				price:[]
			}
			let rank=document.querySelector(".rank").querySelectorAll("p.checked");
			let region=document.querySelector(".region").querySelectorAll("p.checked");
			let price=document.querySelector(".price").querySelector("p.checked");

			if(price){
				filter_item.price.push(price.getAttribute("data-price").split('-'));

			}
			for(let i=0;i<rank.length;i++){
				filter_item.rank.push(rank[i].getAttribute("data-rank"))
			}
			//收集区域信息
			for(let i=0;i<region.length;i++){
			 filter_item.region.push(region[i].getAttribute("data-region"))
			}

			for(let j in filter_item){
				if(filter_item[j].length==0){
					delete filter_item[j];
				}
			}
			return filter_item;
			}

	//筛选数据
		function filterdata(obj){

			let dls=document.querySelectorAll("dl");
			for(let j=0;j<dls.length;j++){
				dls[j].classList.remove("none");
			}
			for(let i=0;i<dls.length;i++){
				for(let k in obj){
				if(obj[k].indexOf(dls[i].getAttribute(k))==-1){
					dls[i].classList.add("none")
				}
				if(k=='price'){
				if(Number(dls[i].getAttribute("price"))>=Number(obj[k][0][0]) && Number(dls[i].getAttribute("price"))<=Number(obj[k][0][1]))
					{
						dls[i].classList.remove("none");
					}
				}


			}
			}


		}



	//通过价格筛选数据

	/*function filterprice(){
	let dls=document.querySelectorAll("dl");
	let price=document.querySelector(".price").querySelector("p.checked");
	if(!price)return;
	let arr=price.getAttribute("data-price").split("-");
	console.log(arr[0] +" "+arr[1])

	for(let j=0;j<dls.length;j++){
				dls[j].classList.add("none");
			}

	for(let i=0;i<dls.length;i++){
		if(dls[i].getAttribute("price")>=arr[0] && dls[i].getAttribute("price")<=arr[1]){
			dls[i].classList.remove("none");
		}
	}

	}*/



		//点击回退按钮跳转回主页
		back.onclick=()=>{
			location.href='index.html';
		}

		//设置入住时间和离店时间
		let date=new Date(),
			today=date.getMonth()+1+"-"+date.getDate(),
			newDate=new Date(date.getFullYear(),date.getMonth(),date.getDate()+1),
			tomorrow=newDate.getMonth()+1+"-"+newDate.getDate();

		if(location.search){
		let checkinDate=getParams("checkin")
		checkin.innerHTML='入住 '+checkinDate.slice(5,checkinDate.length).replace("-",'月');
		let checkouts=getParams("checkout").slice(1);
			checkouts=checkouts.slice(0,-1)
		checkout.innerHTML='离店 '+checkouts.slice(5,checkouts.length).replace("-",'月');
		}else{
			checkin.innerHTML='入住 '+today+'日';
			checkout.innerHTML='离店 '+tomorrow+'日';
		}


	//点击修改进入日历page
	let calendar=new Calendar({
		callback:function(checkin,checkout){
		document.querySelector(".currentData").innerHTML='入住'+checkin.slice(5,checkin.length).replace("-",'月');
		document.querySelector(".checkout").innerHTML='离店'+checkout.slice(5,checkout.length).replace("-",'月');
	}
	})

		modify.onclick=()=>{
			calendar.show();
		}

	//单击list列表进入到酒店详情页
	let dls=null;
	let hotel_detail=document.querySelector(".hotel_detail");
	function checkhotel(){
	setTimeout(()=>{
	dls=hotel_list.querySelectorAll(".list_item");
	Array.from(dls).forEach((val,index)=>{
		val.onclick=()=>{
			let id=val.getAttribute("hotel_id");
				hotel_detail.classList.add("show");
				new Detail({
					id:id
				})
		}
	})
	})
	}

checkhotel();

//设置订单详情页的时间

