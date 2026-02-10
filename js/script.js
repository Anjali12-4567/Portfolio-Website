const words = ["Digital Marketer", "Web Designer", "Frontend Developer", "JavaScript Lover"];
let i=0;

function type(){
  document.getElementById("typing").innerText = words[i];
  i=(i+1)%words.length;
}
setInterval(type,1500);


/* Dark Mode */

const btn = document.getElementById("mode");
btn.onclick = () =>{
  document.body.classList.toggle("light");
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