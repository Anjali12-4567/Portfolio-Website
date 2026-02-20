const words = ["Digital Marketer", "Web Designer", "Frontend Developer", "JavaScript Lover"];
let i=0;

function type(){
  const el = document.getElementById("typing");
  if(!el) return;
  el.innerText = words[i];
  i=(i+1)%words.length;
}

// Only start typing effect if the target exists on the page
if(document.getElementById("typing")){
  type();
  setInterval(type,1500);
}


/* Dark Mode */

const btn = document.getElementById("mode");
if(btn){
  btn.onclick = () =>{
    document.body.classList.toggle("light");
  }
}

// Expandable skill cards and touch feedback
document.addEventListener('DOMContentLoaded', ()=>{
  const cards = document.querySelectorAll('.cards .card');
  if(cards.length){
    cards.forEach(card=>{
      // Start with content collapsed
      card.classList.add('collapsed');

      // toggle collapsed state on click
      card.addEventListener('click', (e)=>{
        const tag = e.target.closest('a');
        if(tag) return;
        card.classList.toggle('collapsed');
      });

      // pressed class for touch and mouse interactions
      const addPressed = ()=> card.classList.add('pressed');
      const removePressed = ()=> card.classList.remove('pressed');

      card.addEventListener('touchstart', addPressed, {passive:true});
      card.addEventListener('touchend', removePressed);
      card.addEventListener('touchcancel', removePressed);

      card.addEventListener('mousedown', addPressed);
      document.addEventListener('mouseup', removePressed);
    });
  }
});

/* Colorful cursor follower and element glow */
(function(){
  const follower = document.createElement('div');
  follower.id = 'cursor-follower';
  document.body.appendChild(follower);

  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  let posX = mouseX, posY = mouseY;
  const ease = 0.18;

  // five light/pastel colors (exclude dark and white)
  const cardColors = ['#c7f9ff', '#e9d5ff', '#ffedd5', '#d1fae5', '#fee2e2'];

  // default CSS variable for cursor ring color
  follower.style.setProperty('--cursor-color', 'rgba(56,189,248,0.18)');

  function hexToRgba(hex, a){
    if(!hex) return `rgba(56,189,248,${a})`;
    const h = hex.replace('#','');
    const bigint = parseInt(h,16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  // update position smoothly
  function animate(){
    posX += (mouseX - posX) * ease;
    posY += (mouseY - posY) * ease;
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', (e)=>{
    mouseX = e.clientX; mouseY = e.clientY;
  });

  // detect element under cursor and change color/size
  let lastEl = null;
  document.addEventListener('mouseover', (e)=>{
    const el = e.target;
    handleHoverEnter(el);
  }, true);

  document.addEventListener('mouseout', (e)=>{
    const el = e.target;
    handleHoverLeave(el);
  }, true);

  function handleHoverEnter(el){
    if(!el) return;
    // if hovering over card or badge or link/button
    const card = el.closest('.cards .card');
    const badge = el.closest('.badge');
    const link = el.closest('a, button, .btn');

    if(card){
      const cards = Array.from(document.querySelectorAll('.cards .card'));
      const idx = cards.indexOf(card);
      const color = cardColors[idx % cardColors.length] || '#38bdf8';
      const glow = hexToRgba(color, 0.22);
      // subtle fill + set variable for ring/shadow
      follower.style.background = hexToRgba(color, 0.14);
      follower.style.setProperty('--cursor-color', hexToRgba(color, 0.22));
      follower.classList.add('cursor--large');
      card.style.setProperty('--glow-color', glow);
      lastEl = card;
      return;
    }

    if(badge){
      const cs = getComputedStyle(badge);
      const color = cs.color || '#9be7ff';
      follower.style.background = color;
      follower.style.setProperty('--cursor-color', color);
      follower.classList.add('cursor--large');
      badge.style.setProperty('--glow-color', color);
      lastEl = badge;
      return;
    }

    if(link){
      const cs = getComputedStyle(link);
      const color = cs.color || '#ffffff';
      follower.style.background = color;
      follower.style.setProperty('--cursor-color', color);
      follower.classList.add('cursor--large');
      lastEl = link;
      return;
    }

    // default small accent
    follower.style.background = 'rgba(56,189,248,0.14)';
    follower.style.setProperty('--cursor-color', 'rgba(56,189,248,0.22)');
    follower.classList.remove('cursor--large');
    lastEl = null;
  }

  function handleHoverLeave(el){
    // If leaving the last focused element, reset
    if(!lastEl) return;
    if(el === lastEl || (el && el.contains && el.contains(lastEl))){
      follower.style.background = 'rgba(56,189,248,0.14)';
      follower.style.setProperty('--cursor-color', 'rgba(56,189,248,0.22)');
      follower.classList.remove('cursor--large');
      if(lastEl.style) lastEl.style.removeProperty('--glow-color');
      lastEl = null;
    }
  }

})();