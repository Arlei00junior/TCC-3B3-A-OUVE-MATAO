// acessibilidade.js
let leituraAtiva = false;
let sintetizador = window.speechSynthesis;
let ultimaFala = null;

const btn = document.getElementById("btnAcessibilidade");

// Função para falar texto
function falar(texto) {
  if (!leituraAtiva || !texto.trim()) return;

  // Interrompe se já estiver lendo
  if (sintetizador.speaking) sintetizador.cancel();

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1;
  fala.volume = 1;

  ultimaFala = fala;
  sintetizador.speak(fala);
}

// Ativa/desativa modo de leitura interativa
btn.addEventListener("click", () => {
  leituraAtiva = !leituraAtiva;
  btn.classList.toggle("ativo");

  if (leituraAtiva) {
  } else {
    sintetizador.cancel();
   
  }
});

// Evento para mouse e toque
function ativarLeitura(evento) {
  if (!leituraAtiva) return;
  const elemento = evento.target;

  // Ignora o botão de acessibilidade
  if (elemento.id === "btnAcessibilidade") return;

  // Pega o texto do elemento (sem HTML)
  let texto = elemento.innerText || elemento.alt || elemento.title;
  if (texto) {
    falar(texto);
  }
}

// Eventos globais
document.addEventListener("mouseover", ativarLeitura);
document.addEventListener("touchstart", ativarLeitura);
