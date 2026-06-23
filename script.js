(function(){
  function loadScript(url, callback){
    var s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onload = callback;
    document.head.appendChild(s);
  }

  // Carrega Bootstrap bundle (talvez já esteja em CDN)
  loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js', function(){
    // Bootstrap carregado (opcional)
  });

  // Comportamentos quando DOM pronto
  document.addEventListener('DOMContentLoaded', function(){
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var href = a.getAttribute('href');
        if(href.length > 1 && href.startsWith('#')){
          var target = document.querySelector(href);
          if(target){
            e.preventDefault();
            target.scrollIntoView({behavior:'smooth', block:'start'});
            target.setAttribute('tabindex','-1');
            target.focus();
          }
        }
      });
    });

    // Navegação por teclado: Left/Right entre nav links; Up/Down entre seções
    var navLinks = Array.from(document.querySelectorAll('.navbar .nav-link'));
    var sections = ['sobre','produtos','vantagens','contato'];
    var focusedIndex = -1;

    function focusNav(i){
      if(navLinks.length===0) return;
      i = Math.max(0, Math.min(i, navLinks.length-1));
      focusedIndex = i;
      navLinks[i].focus();
    }

    document.addEventListener('keydown', function(e){
      if(e.key === 'ArrowRight'){
        e.preventDefault();
        var idx = focusedIndex === -1 ? navLinks.indexOf(document.activeElement) : focusedIndex;
        focusNav((idx === -1 ? 0 : idx+1) % navLinks.length);
      }
      if(e.key === 'ArrowLeft'){
        e.preventDefault();
        var idx = focusedIndex === -1 ? navLinks.indexOf(document.activeElement) : focusedIndex;
        var next = (idx === -1 ? 0 : (idx-1+navLinks.length)%navLinks.length);
        focusNav(next);
      }
      if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
        var activeSection = document.activeElement.closest && document.activeElement.closest('section') ? document.activeElement.closest('section').id : '';
        var si = sections.indexOf(activeSection);
        if(e.key === 'ArrowDown') si = si === -1 ? 0 : Math.min(si+1, sections.length-1);
        else si = si === -1 ? 0 : Math.max(si-1, 0);
        var target = document.getElementById(sections[si]);
        if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); target.setAttribute('tabindex','-1'); target.focus(); }
      }
    });

    // reset focusedIndex on blur
    navLinks.forEach(function(link,i){ link.addEventListener('focus', function(){ focusedIndex=i; }); link.addEventListener('blur', function(){ focusedIndex=-1; }); });

    // expose helper to show messages
    window.showMessage = function(text, timeout){
      var el = document.getElementById('mensagem');
      if(!el) return;
      el.textContent = text;
      if(timeout) setTimeout(function(){ el.textContent=''; }, timeout);
    };
  });
})();
