document.addEventListener('wheel',e=>e.ctrlKey&&e.preventDefault(),{passive:!1});
document.addEventListener('keydown',e=>(e.ctrlKey&&(e.key==='+'||e.key==='-'||e.key==='0'))&&e.preventDefault());

const T=['dark','light','neon','pulse','dual','glass'],B=document.getElementById('b'),D=document.body;
let C=localStorage.theme||'dark';
D.className=C;
B.textContent=C.toUpperCase();
B.onclick=()=>{
	C=T[(T.indexOf(C)+1)%6];
	D.className=C;
	B.textContent=C.toUpperCase();
	localStorage.theme=C
};

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
