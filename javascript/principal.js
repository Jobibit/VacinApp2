// Seleciona todos os slides
const slides = document.querySelectorAll('.slide');

// Índice do slide atual
let slideAtual = 0;

// Função que exibe o slide com base no índice
function mostrarSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('ativo', i === index);
  });
}

// Evento do botão "anterior"
document.getElementById('anterior').addEventListener('click', () => {
  slideAtual = (slideAtual - 1 + slides.length) % slides.length;
  mostrarSlide(slideAtual);
});

// Evento do botão "próximo"
document.getElementById('proximo').addEventListener('click', () => {
  slideAtual = (slideAtual + 1) % slides.length;
  mostrarSlide(slideAtual);
});

// Garante que o primeiro slide apareça ao carregar a página
mostrarSlide(slideAtual);
