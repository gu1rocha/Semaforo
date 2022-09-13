const input = document.querySelector('input')

let color = {
  1: 'green',
  2: 'yellow',
  3: 'red'
}

input.addEventListener('change',()=>{
  document.querySelector('body').classList.toggle('stop')
})

let atualizarAlet = () => Math.floor(Math.random() * (3) + 1);

document.querySelector('.cor').classList.add(color[atualizarAlet()])
