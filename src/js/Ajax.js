
function  ajax(opt){
let defaults={
	type:'get' ||opt.type,
	url:'',
	data:{},
	success:function(){},
	error:function(){}
}

let obj=Object.assign({},defaults,opt);
let xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(obj.type=='get' && obj.data){
		let str='';
		for(let i in obj.data){
			str+=i+'='+obj.data[i]+"&";
		}
	xhr.open(obj.type,obj.url+"?"+str,true);
	xhr.send();
	}
	else{
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.open(obj.type,obj.url,true);
	xhr.send(obj.data);
	}


		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					obj.success(JSON.parse(xhr.responseText));
				}else{
					if(obj.error) obj.error();
				}
			}
		}


}


	function jsonp(url,callback){
	window['jsonp_callback']=function(data){
		callback(data);
	}
	let script=document.createElement("script");
		script.src=url+"&callback=jsonp_callback()"
		document.body.appendChild(script);

	}

	function getParams(str){
		let urls=decodeURI(location.search.split("?")[1]);
			urls=urls.split("&");
		let obj={};
		for(let i=0;i<urls.length;i++){
			let arr=urls[i].split("=");
			obj[arr[0]]=arr[1];
		}

		//return obj;
		return str?obj[str]:obj;
	}

function loadingAnimation(){
	let tpl=`<div class="loading">
		<div class="loading-img">
			<p class="circle circle1"></p>
			<p class="circle circle2"></p>
			<p class="circle circle3"></p>
			<p class="circle circle4"></p>
			<p class="circle circle5"></p>
			<p class="circle circle6"></p>
		</div>
	</div>`;
	let load=document.createElement("div");
			load.className='loading';
			load.innerHTML=tpl;
	this.loadingStart=function(container){
		let domParent;
		if(typeof container=='string'){
			domParent=document.querySelector(container);
		}else if(typeof container=='object'){
			domParent=container
		}else{
			domParent=document.querySelector(".container");
		}
		this.domParent=domParent;
		domParent.appendChild(load);

	}
	this.stoploading=function(){
		this.domParent.removeChild(load);
	}


}
let load=new loadingAnimation();

export { ajax,jsonp,getParams,load}

