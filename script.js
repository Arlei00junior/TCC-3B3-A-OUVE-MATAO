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

            // Espera 1.5 segundos para trocar de página
            setTimeout(() => {
                window.location.href = link.href;
            }, 1600);
        });
    }
});
