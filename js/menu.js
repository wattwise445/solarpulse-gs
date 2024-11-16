document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    const horario = document.querySelector('.horario');
    const horario_icon = document.querySelector('#relogio');
    const local_icon = document.querySelector('#local');
    const localizacao = document.querySelector('.localizacao-float');
  
    
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  
    horario_icon.addEventListener('click', function() {
      localizacao.classList.remove('active');
      local_icon.classList.remove('active');
      
      horario.classList.add('active');
      horario_icon.classList.add('active');
      
    });
  
    local_icon.addEventListener('click', function() {
      
      horario_icon.classList.remove('active');
      horario.classList.remove('active');
  
      local_icon.classList.add('active');
      localizacao.classList.add('active');
    });
  
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }); 