/*
  script.js - Comportamento global do site
  - Intercepta cliques em links internas para mostrar a animação de transição
  - Botão .btn-start: mostra a transição e redireciona para cadastro.html
  Observação: este script trata apenas de UX/rota; não altera dados no servidor.
*/

// Botão principal de início que apresenta transição para a página de cadastro
const btnStart = document.querySelector(".btn-start");
if (btnStart) {
    btnStart.addEventListener("click", e => {
        e.preventDefault();
        const transition = document.getElementById("pageTransitionLogo");
        transition.classList.remove("hide");
        setTimeout(() => {
            window.location.href = "cadastro.html";
        }, 1600);
    });
}

// Intercepta links internos (mesmo domínio) que não apontam para o mesmo path
// para tocar a animação de transição antes de navegar.
const links = document.querySelectorAll("a[href]");

links.forEach(link => {
    const url = new URL(link.href, window.location.href);
    const isSameOrigin = url.origin === window.location.origin;
    const isSamePage = url.pathname === window.location.pathname;

    if (isSameOrigin && !isSamePage && !url.hash) {
        link.addEventListener("click", e => {
            e.preventDefault();
            const transition = document.getElementById("pageTransitionLogo");
            transition.classList.remove("hide");

            // Espera 1.6 segundos para trocar de página (tempo da animação)
            setTimeout(() => {
                window.location.href = link.href;
            }, 1600);
        });
    }
});
