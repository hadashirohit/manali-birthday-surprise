const music=document.getElementById("birthdayMusic");
const musicBtn=document.getElementById("musicBtn");
const startBtn=document.getElementById("startBtn");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const noMessage=document.getElementById("noMessage");
const envelope=document.getElementById("envelope");
const openLetterBtn=document.getElementById("openLetterBtn");
const letter=document.getElementById("letter");
const finalBtn=document.getElementById("finalBtn");
const replayBtn=document.getElementById("replayBtn");

new Swiper(".mySwiper",{effect:"coverflow",grabCursor:true,centeredSlides:true,slidesPerView:1,coverflowEffect:{rotate:5,stretch:0,depth:100,modifier:2,slideShadows:true},pagination:{el:".swiper-pagination",clickable:true},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});

function showScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
 document.getElementById(id).classList.remove("hidden");
 window.scrollTo({top:0,behavior:"smooth"});
}

startBtn.addEventListener("click",()=>{
 music.play().then(()=>musicBtn.textContent="🔊").catch(()=>musicBtn.textContent="🔇");
 showScreen("birthdayScreen");
});

document.querySelectorAll(".next-btn").forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.next)));

musicBtn.addEventListener("click",()=>{
 if(music.paused){music.play();musicBtn.textContent="🔊"}else{music.pause();musicBtn.textContent="🔇"}
});

let noClicks=0;
const noMessages=["Are you sure? 👀","Think again 😂","That button doesn't look very convincing...","Wrong answer 🙈","Try catching me! 😂","You can't escape the YES ❤️","Okay okay... just press YES already 😌"];

function moveNoButton(){
 noClicks++;
 noMessage.textContent=noMessages[Math.min(noClicks-1,noMessages.length-1)];
 const padding=30;
 const maxX=window.innerWidth-noBtn.offsetWidth-padding;
 const maxY=window.innerHeight-noBtn.offsetHeight-padding;
 noBtn.style.position="fixed";
 noBtn.style.left=Math.max(padding,Math.random()*maxX)+"px";
 noBtn.style.top=Math.max(padding,Math.random()*maxY)+"px";
 noBtn.style.zIndex="999";
}
noBtn.addEventListener("mouseenter",moveNoButton);
noBtn.addEventListener("touchstart",e=>{e.preventDefault();moveNoButton()});
noBtn.addEventListener("click",e=>{e.preventDefault();moveNoButton()});

yesBtn.addEventListener("click",()=>{
 createConfetti();createHeartExplosion();
 setTimeout(()=>showScreen("yesScreen"),700);
});

openLetterBtn.addEventListener("click",()=>{
 envelope.classList.add("open");
 setTimeout(()=>{letter.classList.remove("hidden");openLetterBtn.classList.add("hidden");finalBtn.classList.remove("hidden")},900);
});

finalBtn.addEventListener("click",()=>{createConfetti();createHeartExplosion();showScreen("finalScreen")});
replayBtn.addEventListener("click",()=>location.reload());

function createConfetti(){
 const container=document.getElementById("confetti-container");
 for(let i=0;i<100;i++){
  const piece=document.createElement("div");
  piece.classList.add("confetti");
  piece.style.left=Math.random()*100+"vw";
  piece.style.animationDuration=(Math.random()*3+2)+"s";
  piece.style.animationDelay=Math.random()*.8+"s";
  piece.style.background=getRandomColor();
  container.appendChild(piece);
  setTimeout(()=>piece.remove(),6000);
 }
}
function createHeartExplosion(){
 const emojis=["❤️","💗","💖","💕","✨","💓"];
 for(let i=0;i<30;i++){
  const heart=document.createElement("div");
  heart.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  heart.style.position="fixed";heart.style.left="50%";heart.style.top="50%";
  heart.style.fontSize=(Math.random()*20+15)+"px";heart.style.zIndex="1000";heart.style.pointerEvents="none";
  document.body.appendChild(heart);
  const angle=Math.random()*Math.PI*2, distance=Math.random()*250+100;
  const x=Math.cos(angle)*distance,y=Math.sin(angle)*distance;
  heart.animate([{transform:"translate(-50%,-50%) scale(0)",opacity:1},{transform:`translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(1.5)`,opacity:0}],{duration:1500,easing:"cubic-bezier(.17,.67,.83,.67)"});
  setTimeout(()=>heart.remove(),1600);
 }
}
function getRandomColor(){
 const colors=["#ff6b9d","#d56cff","#ffd166","#ff8fab","#a8dadc","#cdb4db"];
 return colors[Math.floor(Math.random()*colors.length)];
}
function createFloatingHeart(){
 const container=document.querySelector(".floating-hearts");
 const heart=document.createElement("div");
 heart.classList.add("floating-heart");
 heart.textContent=Math.random()>.5?"♡":"♥";
 heart.style.left=Math.random()*100+"%";
 heart.style.fontSize=(Math.random()*18+10)+"px";
 heart.style.animationDuration=(Math.random()*8+7)+"s";
 heart.style.color=getRandomColor();
 container.appendChild(heart);
 setTimeout(()=>heart.remove(),15000);
}
setInterval(createFloatingHeart,700);
