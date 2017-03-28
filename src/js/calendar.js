export class Calendar{

	constructor(opt){
		let defaults={
			month:null,
			city:'',
			callback:function(){

			}
		}
		let obj=Object.assign({},defaults,opt);
		this.obj=obj;
		this.date=new Date();
		this.years=this.date.getFullYear();
		this.months=this.date.getMonth();
		this.day=this.date.getDate();
		this.week=this.date.getDay();
		this.days=[31,28,31,30,31,30,31,31,30,31,30,31];
		this.setDate=new Date(this.years,this.months,1);
		this.totalDays=this.days[this.months];
		this.firstDay=this.setDate.getDay();
		this.calendarBox=document.querySelector(".calendar");
		console.log(this.calendarBox)
		this.container=document.querySelector(".calendar_list");
		this.currentTime=document.querySelector(".currentTime");
		this.checkoutTime=document.querySelector(".checkout");
		this.longTime=document.querySelector(".days")
		this.dateTitle=document.querySelector(".title");
		this.month=document.querySelector(".month");
		this.year=document.querySelector(".year");
		this.render();
		this.addSub();
		this.bindEvent();
		this.spans=document.querySelectorAll(".fulture");

	}


	//渲染日历
	render(years,months,day,firstDay,totalDays){
				years=years||this.years;
				months=months||this.months+1;
				day=day||this.day;
				firstDay=firstDay||this.firstDay;
				totalDays=this.days[months-1]||this.totalDays;
				firstDay=firstDay-1;
			if(months==2){
				if (((years % 4)==0) && ((years % 100)!=0) || ((years % 400)==0)){  //判断是平年还是闰年 闰年29天
					this.days[1]=29;
				}
			}

			let str='',num=0;
			for(let i=this.days[months-2]-firstDay;i<=this.days[months-2];i++){
				str+=`<span class='out'>${i}</span>`
				num++;
			}
			if(months==new Date().getMonth()+1){
				for(let j=1;j<=totalDays;j++){
				if(j==day){
				str+=`<span class='fulture selected' date='${j}'>${j}</span>`
				}
				else if(j<day){
				str+=`<span class='out' date='${j}'>${j}</span>`
				}
				else{
				str+=`<span class='fulture' date='${j}'>${j}</span>`
				}
				num++;
			}
			}else{
				for(let j=1;j<=totalDays;j++){
				if(j==1){
				str+=`<span class='fulture selected' date='${j}'>${j}</span>`
				}
				else{
				str+=`<span class='fulture' date='${j}'>${j}</span>`
				}
				num++;
			}
			}
			for(var i=1;i<42-num; i++){
			str += `<span class='out'>${i}</span>`
			}

			this.currentTime.innerHTML=(months)+"月"+day+"日";
			this.container.innerHTML=str;
			let addDate=new Date(years,months,day);
			 this.year.innerHTML=years;
			 this.month.innerHTML=months;

	}
	//	绑定
	bindEvent(){
		//日历列表添加click事件
		this.container.addEventListener("click",(e)=>{
			let target=e.target;
			let val=target.getAttribute("date");
			 if(target.classList.contains("fulture")||target.classList.contains("selected")){
			 	for(let i=0;i<this.spans.length;i++){
			 	this.spans[i].className='fulture';
			 	}
			 	 target.classList.add("selected");
				 this.currentTime.innerHTML=val;
				 let checkin=this.years+"-"+this.month.innerHTML+"-"+target.innerHTML;
				 let num=document.querySelector(".num").value;
				 let checkout=this.years+"-"+this.month.innerHTML+"-"+target.innerHTML;
				 this.obj.callback(checkin,checkout,num)
				 this.currentTime.innerHTML=this.month.innerHTML+"月"+target.innerHTML+"日";

			 }else{
			 	return false;
			 }

		},false)
		//返回到主页面
		let back=this.calendarBox.querySelector(".back");
		back.onclick=()=>{
				this.hide();
		}
		//点击完成按钮将收集的数据传到index页面
		let finished=document.querySelector(".finished");
			finished.onclick=()=>{
				let selected=document.querySelector(".selected").innerHTML,
				 num=document.querySelector(".num"),
				 month=this.month.innerHTML,
				 year=this.year.innerHTML,
				 checkin=year+"-"+month+"-"+selected,
				 newDate=new Date(year,month,selected*1+num.value*1),
				 checkout=newDate.getFullYear()+"-"+newDate.getMonth()+"-"+newDate.getDate();
				this.obj.callback(checkin,checkout,num.value);
				this.hide();
				 let urls=decodeURI(location.href).split("&")[0];
			}

		//点击+按钮进行加减
		let add=document.querySelector(".add"),
			sub=document.querySelector(".sub"),
			num=document.querySelector(".num");

			add.onclick=function(){
				console.log(num.value)
				if(num.value<7){
					num.value++;
				}
				num.value=num.value;
			}
			sub.onclick=function(){
				if(num.value>1){
					num.value--;
				}
				num.value=num.value;
			}


	}

		//点击next按钮实现月份加加减减功能
	addSub(){
		let prev=document.querySelector(".prev");
		let next=document.querySelector(".next");
		next.addEventListener("click",()=>{
		this.months++;

		this.changeDate(this.months);
		this.spans=document.querySelectorAll(".fulture");
	},false)

		prev.addEventListener("click",()=>{
		let months=new Date().getMonth()+1;
		 if(this.months>=months){
		 	this.months--;
		 }
		this.changeDate(this.months)
		this.spans=document.querySelectorAll(".fulture");
	},false)

	}

	//改变月份函数
	changeDate(months){
		let addDate=new Date(this.years,this.months,this.day),
		 month=addDate.getMonth(),
		 years=addDate.getFullYear(),
		 day=addDate.getDate(),
		 totalDays=this.days[month],
		firstDay=new Date(years,month,1).getDay();
		this.render(years,month+1,day,firstDay,totalDays);
	}
	//控制盒子的显示
	show(){
		this.calendarBox.classList.add("show");
	}
	//city page hide
	//控制盒子的隐藏
	hide(){
	this.calendarBox.classList.remove("show");
	}
}