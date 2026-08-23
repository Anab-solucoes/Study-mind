// ElektraStudy v2 — busca client-side + acessórios de navegação.

document.addEventListener('DOMContentLoaded', function () {
  var bibBtn = document.querySelector('.bib-toggle');
  if (bibBtn) {
    bibBtn.addEventListener('click', function () {
      var bib = document.querySelector('.bibliography');
      var open = bib.classList.toggle('open');
      bibBtn.textContent = open ? 'Ocultar bibliografia' : 'Ver bibliografia';
    });
  }

  // Se a página carregar com um #âncora (vindo do índice ou de um link
  // direto), garante que o <details> correspondente abra, mesmo em
  // navegadores sem suporte nativo a isso.
  function openTargetFromHash() {
    if (!location.hash) return;
    var target = document.querySelector(location.hash);
    if (target && target.tagName === 'DETAILS') {
      target.open = true;
      setTimeout(function () { target.scrollIntoView({ block: 'start' }); }, 50);
    }
  }
  openTargetFromHash();
  window.addEventListener('hashchange', openTargetFromHash);

  // Clicar num item do índice sempre abre o material e fecha os outros,
  // pra manter a leitura em foco (evita abrir tudo ao mesmo tempo).
  document.querySelectorAll('.toc-list a').forEach(function (link) {
    link.addEventListener('click', function () {
      var id = link.getAttribute('href').replace('#', '');
      var target = document.getElementById(id);
      if (!target) return;
      document.querySelectorAll('.material[open]').forEach(function (d) {
        if (d !== target) d.open = false;
      });
      target.open = true;
    });
  });

  var input = document.getElementById('search-input');
  if (!input) return;

  var materials = Array.prototype.slice.call(document.querySelectorAll('.material'));
  var tocItems = Array.prototype.slice.call(document.querySelectorAll('.toc-list li'));
  var countEl = document.getElementById('search-count');
  var total = materials.length;

  // guarda o estado original de aberto/fechado pra restaurar quando a busca for limpa
  var originalOpen = materials.map(function (m) { return m.open; });

  function normalize(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function runFilter() {
    var q = normalize(input.value.trim());
    var visible = 0;
    materials.forEach(function (m, i) {
      var haystack = normalize(m.getAttribute('data-search') || m.textContent);
      var match = q === '' || haystack.indexOf(q) !== -1;
      m.style.display = match ? '' : 'none';
      if (tocItems[i]) tocItems[i].style.display = match ? '' : 'none';
      if (match) visible++;
      if (q === '') {
        m.open = originalOpen[i];
      } else if (match) {
        m.open = true; // abre automaticamente os resultados da busca
      }
    });
    if (countEl) {
      countEl.textContent = q === ''
        ? total + ' materiais nesta matéria'
        : visible + ' de ' + total + ' materiais correspondem a "' + input.value.trim() + '"';
    }
  }

  input.addEventListener('input', runFilter);
  runFilter();
});
