const carta = document.querySelectorAll('.carta');

var primeiraCarta, segundaCarta;
var virouCarta = false;
var bloqueio = false;
var score = document.getElementById('score');

window.onload = function () {
  var minute = 0; 
  var sec = 0;
  timer = setInterval(function () {
    document.getElementById("time").innerHTML = "0" + minute + ":0" + sec; //00:00 "0"->0<-":0"->0<- 
    if (sec > 9){
      document.getElementById("time").innerHTML = "0" + minute + ":" + sec; //00:10 "0"->0<-":"->10<- 
    }
    if (sec == 60) {
      minute++; //minute + 1
      sec = 0; //reset the 'sec' value.
      document.getElementById("time").innerHTML = "0" + minute + ":0" + sec; //01:00 "0"->1<-":0"->0<- 
    }
    if (minute > 9) {
      document.getElementById("time").innerHTML = minute + ":0" + sec; //10:00 ->10<-":0"->0<- 
    }
    if (minute > 9 && sec > 9) {
      document.getElementById("time").innerHTML = minute + ":" + sec; //10:10 ->10<-":"->10<-
    }
    sec++;  //sec + 1
  }, 1000);  //1000ms = 1s
};

function virarCarta() {
  if (bloqueio) return;

  this.classList.add('flip');
  if(!virouCarta) {
    virouCarta = true;
    primeiraCarta = this;
    primeiraCarta.style.pointerEvents = "none";
    return;
  }

  segundaCarta = this;
  virouCarta = false;
  checarIguais();
}

function checarIguais() {
  if (primeiraCarta.dataset.framework === segundaCarta.dataset.framework) {
      
    disabilitarCarta();
  
    score.value = parseInt(score.value) + 1;

    if (score.value == 6){
      clearInterval(timer);
      alert("Parabéns! Você conseguiu achar todas as cartas! :D Seu Score foi de: " + score.value + " Seu tempo foi: " + document.getElementById("time").innerHTML);
      return false;
    }
    return;
  }
  
  primeiraCarta.style.pointerEvents = "all";
  voltarCartas();
}

function disabilitarCarta() {
  primeiraCarta.removeEventListener('click', virarCarta);
  segundaCarta.removeEventListener('click', virarCarta);
}

function voltarCartas() {
  bloqueio = true;
  setTimeout(() => {
    primeiraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');
    bloqueio = false;
  }, 1000)
}

(function embaralhar(){
  var grupo = $(".game");
  //A sintaxe jQuery ' $() ' é feita sob medida para selecionar elementos HTML e executar alguma ação no (s) elemento (s).
  var divs = grupo.children();
  //O método children() retorna todos os filhos diretos do elemento selecionado.

  while (divs.length) {
    grupo.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    //O método append() insere o conteúdo especificado no final dos elementos selecionados.
    //O método splice() adiciona / remove itens de / para um array e retorna o (s) item (ns) removido (s).
    //O método floor() arredonda um número PARA BAIXO para o inteiro mais próximo e retorna o resultado.
    //O método random() retorna um número aleatório entre 0 (inclusivo) e 1 (exclusivo).
  }
})();

function reload() {
  let confirmAction = confirm("Deseja reininciar o jogo?");
  if (confirmAction) {
    document.location.reload(true);
  }
}

carta.forEach( carta => carta.addEventListener('click', virarCarta));