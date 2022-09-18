const input = document.querySelector('input')
const boxInit = document.querySelector('.boxInit')
const semaforoGame = document.querySelector('.container.game')
const people = document.querySelector('.people')
const certo = document.querySelector('#certo')
const errado = document.querySelector('#errado')
const boxInputs = document.querySelector('.boxInputs')
const replay = boxInputs.querySelector('.replay')
const cena = document.querySelector('.bg')


let timePassed = 1
let timerInterval = null;

let PlayAudio = elemento =>{
  elemento.pause()
  elemento.currentTime = 0;
  elemento.play()
}

let PlayStop = (elemento, situacao) =>{
  if(situacao === 'stop'){
    elemento.textContent = 'front_hand'
    elemento.classList.remove('play')
    elemento.classList.add('stop')
  }else{
    elemento.textContent = 'play_arrow'
    elemento.classList.remove('stop')
    elemento.classList.add('play')
  }
}

let Playgame = color =>{
  for (let span of semaforoGame.querySelectorAll('span')) {
    (span.className).includes(color) ? span.classList.add('active') : span.classList.remove('active')
  }
  document.querySelector('.cor').classList.remove('red')
  document.querySelector('.cor').classList.remove('green')
  document.querySelector('.cor').classList.remove('yellow')
  document.querySelector('.cor').classList.add(color)

  if(color === 'green'){
    people.style.display = 'none';
  }else{
    people.removeAttribute('style')
  }

  timePassed = 1
  timerInterval = null;
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    if(timePassed === 7){
      if( color === 'red'){
        document.querySelector('body').matches('.stop') ? PlayAudio(certo) : PlayAudio(errado)
      }
      if(color === 'green'){
        document.querySelector('body').matches('.stop') ? PlayAudio(errado) : PlayAudio(certo)
      };
    }
    if(timePassed === 10){
      document.querySelector('body').classList.add('stop')
      clearInterval(timerInterval)
    }
  }, 400);
}

input.addEventListener('change',()=>{
  boxInputs.querySelector('label').querySelector('span').textContent.includes('play_arrow') ? PlayStop(boxInputs.querySelector('label').querySelector('span'), 'stop') : PlayStop(boxInputs.querySelector('label').querySelector('span'), 'play')
  document.querySelector('body').classList.toggle('stop')
})

for (let span of boxInit.querySelectorAll('span')) {
  span.addEventListener('click',()=>{
    boxInit.style.display = 'none';
    Playgame(span.className.replace('luces-circulo ',''))
    PlayStop(boxInputs.querySelector('label').querySelector('span'), 'stop')
    document.querySelector('body').classList.remove('stop')
  })
}

replay.addEventListener('click',()=>{
  clearInterval(timerInterval)

  for (let span of cena.querySelectorAll('span')) {
    span.style.animation = "none";
    setTimeout(function() {
      span.style.animation = "";
   }, 100);
  }
  document.querySelector('body').classList.add('stop')
  boxInit.removeAttribute('style')
})