document.addEventListener('wheel',e=>e.ctrlKey&&e.preventDefault(),{passive:!1});
document.addEventListener('keydown',e=>(e.ctrlKey&&(e.key==='+'||e.key==='-'||e.key==='0'))&&e.preventDefault());
document.addEventListener('touchstart',e=>e.touches.length>1&&e.preventDefault(),{passive:!1});
document.addEventListener('touchmove',e=>e.touches.length>1&&e.preventDefault(),{passive:!1});
document.addEventListener('gesturestart',e=>e.preventDefault());
document.addEventListener('gesturechange',e=>e.preventDefault());
document.addEventListener('gestureend',e=>e.preventDefault());

let lastTouchEnd=0;
document.addEventListener('touchend',e=>{
	const now=Date.now();
	if(now-lastTouchEnd<=300){
		e.preventDefault();
	}
	lastTouchEnd=now;
});

document.addEventListener('dblclick',e=>e.preventDefault());

const meta=document.createElement('meta');
meta.name='viewport';
meta.content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no';
document.head.appendChild(meta);

document.body.style.cssText+=`
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select:none;
	-webkit-touch-callout:none;
	-webkit-tap-highlight-color:transparent;
	overscroll-behavior:none;
	touch-action:pan-y;
`;

const T=['liquid','light','glass','gradien','dark','neon','ocean','curve','matrix','pulse'],B=document.getElementById('b'),D=document.body;
let C=localStorage.theme||'liquid';
let TC=parseInt(localStorage.themeCount)||0;
let TT=parseInt(localStorage.themeTime)||0;
D.className=C;
B.textContent=C.toUpperCase();

function checkCooldown(){
	const now=Date.now();
	if(now-TT>=120000){
		TC=0;
		TT=now;
		localStorage.themeCount=TC;
		localStorage.themeTime=TT;
	}
	return TC>=5;
}

function pauseLiquid(){
	const container=document.querySelector('.login_form_container');
	const form=document.querySelector('.login_form');
	if(container)container.classList.add('liquid-paused');
	if(form)form.classList.add('liquid-paused');
}

function resumeLiquid(){
	const container=document.querySelector('.login_form_container');
	const form=document.querySelector('.login_form');
	if(container)container.classList.remove('liquid-paused');
	if(form)form.classList.remove('liquid-paused');
}

function clearAllPause(){
	const container=document.querySelector('.login_form_container');
	const form=document.querySelector('.login_form');
	if(container)container.classList.remove('liquid-paused');
	if(form)form.classList.remove('liquid-paused');
}

B.onclick=()=>{
	if(checkCooldown())return;
	if(D.classList.contains('liquid')){
		pauseLiquid();
	}
	C=T[(T.indexOf(C)+1)%T.length];
	D.className=C;
	B.textContent=C.toUpperCase();
	localStorage.theme=C;
	TC++;
	if(TC===1)TT=Date.now();
	localStorage.themeCount=TC;
	localStorage.themeTime=TT;
	if(C==='liquid'){
		setTimeout(resumeLiquid,500);
	}else{
		clearAllPause();
	}
};

if(C==='liquid'){
	setTimeout(()=>{
		resumeLiquid();
	},1000);
}

function toHijri(date) {
	const gYear = date.getFullYear();
	const gMonth = date.getMonth() + 1;
	const gDay = date.getDate();
	
	let a = Math.floor((14 - gMonth) / 12);
	let y = gYear + 4800 - a;
	let m = gMonth + 12 * a - 3;
	
	let jdn = gDay + Math.floor((153 * m + 2) / 5) + 365 * y + 
			Math.floor(y / 4) - Math.floor(y / 100) + 
			Math.floor(y / 400) - 32045;
	
	let l = jdn - 1948440 + 10632;
	let n = Math.floor((l - 1) / 10631);
	l = l - 10631 * n + 354;
	
	let j = (Math.floor((10985 - l) / 5316)) * 
			(Math.floor((50 * l) / 17719)) + 
			(Math.floor(l / 5670)) * 
			(Math.floor((43 * l) / 15238));
	
	l = l - (Math.floor((30 - j) / 15)) * 
		(Math.floor((17719 * j) / 50)) - 
		(Math.floor(j / 16)) * 
		(Math.floor((15238 * j) / 43)) + 29;
	
	let hijriMonth = Math.floor((24 * l) / 709);
	let hijriDay = l - Math.floor((709 * hijriMonth) / 24);
	let hijriYear = 30 * n + j - 30;
	
	return {year: hijriYear,month: hijriMonth,day: hijriDay};
}

const hijriMonths = ['Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir','Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Syaban','Ramadan', 'Syawal', 'Dzulqadah', 'Dzulhijjah'];

const U=()=>{
	const N=new Date();
	const tEl=document.getElementById('t');
	const dEl=document.getElementById('d');
	const isHijri = Math.floor(N.getTime() / 60000) % 2;
	
	if(tEl)tEl.textContent=N.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
	
	if(dEl){
		if(isHijri){
			const h = toHijri(N);
			const weekday = N.toLocaleDateString('id-ID',{weekday:'long'});
			dEl.textContent = `${weekday}, ${h.day} ${hijriMonths[h.month - 1]} ${h.year} H`;
		} else {
			dEl.textContent=N.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'short',year:'numeric'});
		}
	}
};

U();
setInterval(U,1000);

const A=document.getElementById('a');
if(A){
	setTimeout(()=>{
		A.classList.add('fade-out');
		setTimeout(()=>A.remove(),300)
	},3000)
}