/*
  script/toast.js
  --------------------------------------------------
  Fornece a função global `showToast(message, type)` para exibir mensagens
  visuais estilizadas no canto superior direito da página.

  - ensureContainer(): garante que exista um container #toasts-container no DOM
  - showToast(message, type): cria um elemento .toast, aplica classe '`error`' quando necessário
    e remove automaticamente após 4 segundos

  Observação de segurança/compatibilidade:
  - Em navegadores muito antigos, faz fallback para alert().
  - A função não altera dados do servidor; apenas manipula o DOM para feedback ao usuário.
*/
(function () {
  function ensureContainer() {
    let c = document.getElementById('toasts-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toasts-container';
      document.body.appendChild(c);
    }
    return c;
  }

  // showToast: API pública usada por outras páginas
  window.showToast = function (message, type = 'success') {
    try {
      const container = ensureContainer();
      const toast = document.createElement('div');
      // Aplica classe .error quando necessário
      toast.className = 'toast' + (type === 'error' ? ' error' : '');
      toast.textContent = message;
      container.appendChild(toast);
      // Remove após 4s para não poluir o DOM
      setTimeout(() => {
        try { container.removeChild(toast); } catch (_) {}
      }, 4000);
    } catch (err) {
      // Fallback para navegadores muito antigos
      try { alert(message); } catch (_) { console.error(message); }
    }
  };
})();
