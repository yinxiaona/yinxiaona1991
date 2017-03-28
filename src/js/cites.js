export class City{
	constructor(opt){
		const defaults={
			data:[]
		}

		const obj=Object.assign({},defaults,opt);
		this.obj=obj;
		this.cities=document.querySelector(".more .letter"); //获取字母列表
		this.cityList=document.querySelector(".city-list");
		this.alpha=document.querySelectorAll(".letter span");
		this.curtitle=document.querySelectorAll(".cur-title"); //获取字母标题列表
		this.mainbody=document.querySelector(".main-body"); //获取content内容
		this.wrap=document.querySelector(".city");
		this.back=document.querySelector(".back"); //返回顶部按钮
		this.moreLetter=document.querySelector(".more");
		this.render(obj.data); //渲染页面
		this.colH=document.querySelectorAll("[alpha]"); //获取元素的高度
		this.liveArea=document.querySelector(".liveArea")//获取入住地
		this.curCity=this.wrap.querySelector(".curCity"); //获取存放当前城市
		this.main=this.wrap.querySelector(".main-body");
		this.collectHeight();
		this.bindEvent();
		this.scroll();
		this.backto();
	}




	render(citylist){
			let str='',strs='';
		citylist.forEach((item,index)=>{
			str+=`<span class='char' alpha='${item.alpha}'>${item.alpha}</span>`;
			strs+=`<p class="cur-title colH" alpha='${item.alpha}'>${item.alpha}</p>
				<ol>
				${
					(item.data).map((val,index)=>{
						return `<li>${val[0]}</li>`;
					}).join("")
				}</ol>`

		})
		this.cities.innerHTML=str;
		this.cityList.innerHTML=strs;
	}



 	//收集高度
	collectHeight(){
		let collectH={};
		let colH=this.colH;
		Array.from(colH).forEach((val,index)=>{
			collectH[val.getAttribute("alpha")]=val.offsetTop;
		})
		this.collectH=collectH;
	}

	//绑定事件
	bindEvent(){
		// console.log(this)
		let collectH=this.collectH,
			 wrap=this.wrap;
		wrap.addEventListener("click",(e)=>{
			let target=e.target;
			if(target.tagName=='LI'&& !target.classList.contains("currentCity")){
			this.obj.callback(target.innerHTML);
			this.curCity.innerHTML=target.innerHTML;
			this.hide();
			}
			else if(target.tagName=='SPAN'){
			let target=e.target;
			let top = collectH[target.getAttribute("alpha")];
				this.main.scrollTop=top;
				}
			if(target.classList.contains("left")){
				this.hide();
			}

		},false)

	}

	//出现返回顶部标签
	scroll(){
		let back=this.back;
		let main=this.main;
		let h=document.documentElement.clientHeight;
		 main.onscroll=function(){
			let top=main.scrollTop;
			if(top>h){
				back.style.display='block';
				back.style.top=(h-200)+"px";
			}else{
				back.style.display='none';
			}
		}
	}

//返回顶部
	backto(){
		let back=this.back;
		let wrap=this.wrap;
		let main=this.main;
		back.onclick=function(){
			main.scrollTop=0;
			back.style.display='none';
		}
	}

//cityy page show

show(){
	this.wrap.classList.add("show");
	this.main.scrollTop=0;
}

//city page hide

hide(){
this.wrap.classList.remove("show");
}



}