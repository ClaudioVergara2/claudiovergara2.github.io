const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('bg-gray-900', 'text-gray-100');
    document.body.classList.add('bg-white', 'text-gray-900');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeIcon.style.color = 'white';
    document.body.classList.add('light-mode');
  } else {
    document.documentElement.classList.add('dark');
    document.body.classList.remove('bg-white', 'text-gray-900');
    document.body.classList.add('bg-gray-900', 'text-gray-100');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeIcon.style.color = 'white';
    document.body.classList.remove('light-mode');
  }
}
setTheme('dark');

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// Botón Scroll to Top
const btn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    btn.classList.remove('hidden');
  } else {
    btn.classList.add('hidden');
  }
});

btn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Manejo de errores generales
function safeJSONParse(str) {
  try {
    return { ok: true, data: JSON.parse(str) };
  } catch (err) {
    console.error('JSON parse error:', err);
    return { ok: false, error: err };
  }
}

// Establecer año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Proyectos
const projectsGrid = document.getElementById('projectsGrid');
const projectsError = document.getElementById('projectsError');
const projectsPagination = document.createElement('div');
projectsPagination.className = 'flex justify-center gap-2 mt-6';
projectsGrid.after(projectsPagination);

const PROJECTS_PER_PAGE = 6;
let currentPage = 1;

const SAMPLE_PROJECTS = [
  { id: 1, title: 'Docentes en Línea', desc: 'Desarrollo de plataforma web institucional utilizando WordPress (PHP), MySQL, HTML, CSS y JavaScript. Integración de chatbot mediante API de OpenAI, gestión de contenidos multimedia y aplicación de mejoras de accesibilidad. Configuración y ajustes en entorno de hosting.', tech: ['WordPress', 'PHP', 'API OpenAI', 'Accesibilidad','SEO', 'Google Analytics', 'Chatbot'], url: 'https://docentesenlinea.udec.cl/', img: 'resources/img/docentelinea.png' },
  { id: 2, title: 'Facd. Humanidades y Artes', desc: 'Mantenimiento y actualización de plataforma desarrollada en WordPress y MySQL. Limpieza de base de datos afectada por scripts maliciosos, optimización de consultas SQL y migración de hosting.', tech: ['Wordpress','SEO', 'Google Analytics'], url: 'http://humanidadesyarte.udec.cl/', img: 'resources/img/FacHumanidades.png' },
  { id: 3, title: 'Campus Naturaleza', desc: 'Mantenimiento de sitio web desarrollado en WordPress y MySQL. Implementación de versión multilenguaje mediante plugins especializados y ajustes en HTML, CSS y JavaScript para mejorar la experiencia de usuario.', tech: ['Wordpress', 'SEO', 'Google Analytics'], url: 'https://campusnaturaleza.udec.cl/', img: 'resources/img/CampusNaturaleza.jpeg' },
  { id: 5, title: 'LIB (Laboratorio de Invasiones Biológicas)', desc: 'Migración de hosting y configuración. Corrección de errores en frontend y backend (PHP, MySQL, HTML, CSS, JavaScript). Optimización de diseño responsive y fortalecimiento de seguridad en base de datos.', tech: ['WordPress'], img: 'resources/img/lib.jpg', url: 'https://lib.udec.cl/' },
  { id: 5, title: 'ATE CFRD UdeC', desc: 'Programé una nueva página web para la venta de cursos para profesores proporcionados por ATE CFRD UDEC, mediante Wordpress + Woocomerce conectado con Moodle.', tech: ['WordPress', 'Woocomerce', 'Moodle'], img: 'resources/img/ATE.jpg'},
  { id: 6, title: 'KGB Logistic', desc: 'Optimización de rendimiento y mejoras funcionales del sitio web corporativo. Implementación de nueva sección orientada a la visualización y organización de certificaciones empresariales.', tech: ['WordPress'], url: 'https://www.kgblogistic.com/', img: 'resources/img/KGB.png' },
  { id: 7, title: 'IHPE LTDA', desc: 'Liderazgo de equipo de 4 integrantes en el desarrollo de sitio web corporativo con tienda en línea utilizando WordPress y WooCommerce. Coordinación de tareas, personalización de diseño, integración de plataforma de comercio electrónico y optimización de rendimiento del sitio.', tech: ['WordPress','Woocomerce', 'Scrum'], url: 'http://ihpeltda.cl/', img: 'resources/img/IHPE LTDA.jpg'},
  { id: 8, title: 'ConceUncover', desc: 'En el proyecto de título ConceUncover, me encargué de implementar mejoras estéticas en los popups del sitio web, ajustando la paleta de colores, los bordes y deshabilitando la opción de cierre manual para dirigir adecuadamente la interacción del usuario.', tech: ['Laravel','PHP','CSS','JavaScript'], url: 'https://github.com/MarTofuz/ConceUncover', img: 'resources/img/repositorio.png' },
  { id: 9, title: 'CoffeeTime', desc: 'Mejoras en interfaz de usuario utilizando HTML, CSS y JavaScript. Optimización de componentes emergentes (popups), ajustes visuales y mejoras en flujo de interacción del usuario.', tech: ['Laravel','PHP','CSS','JavaScript'], url: 'https://github.com/Jossszz/CoffeeTime', img: 'resources/img/repositorio.png'},
];

function renderProjectCard(p) {
  const div = document.createElement('div');
  div.className = 'p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded transform transition-transform duration-300 hover:scale-105 hover:shadow-lg';

  const isGitHub = p.url && p.url.includes('github.com');
  const linkText = isGitHub ? 'Ver repositorio →' : 'Ver proyecto →';

  const projectLink = p.url ? `<div class="mt-3">
      <a href="${p.url}" target="_blank" class="text-indigo-400 text-sm">${linkText}</a>
    </div>` : '';

  div.innerHTML = `
    <img src="${p.img}" alt="${escapeAttr(p.title)}" class="w-full h-40 object-cover rounded mb-3">
    <h3 class="font-semibold">${p.title}</h3>
    <p class="text-sm text-gray-300 mt-2">${p.desc}</p>
    <div class="mt-3 flex gap-2 flex-wrap text-xs">
      ${p.tech.map(t => `<span class="px-2 py-1 rounded bg-gray-700">${t}</span>`).join('')}
    </div>
    ${projectLink}
  `;
  return div;
}

function escapeHtml(s){
  if (s == null) return '';
  return String(s).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
}
function escapeAttr(s){ return escapeHtml(s); }

function fetchProjects(simulateError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) return reject(new Error('Error al cargar los proyectos'));
      resolve(SAMPLE_PROJECTS);
    }, 400);
  });
}

async function loadProjects({simulateError=false} = {}){
  projectsError.classList.add('hidden');
  projectsGrid.innerHTML = '<p class="text-gray-400">Cargando proyectos...</p>';
  try {
    const data = await fetchProjects(simulateError);
    renderProjectsPage(data, currentPage);
    renderPagination(data);
  } catch (err) {
    console.error('No se pudo cargar los proyectos:', err);
    projectsGrid.innerHTML = '';
    projectsError.textContent = 'Error al cargar los proyectos. Intenta recargar.';
    projectsError.classList.remove('hidden');
  }
}

// Paginación
function renderProjectsPage(data, page) {
  projectsGrid.innerHTML = '';
  const start = (page - 1) * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  const pageItems = data.slice(start, end);
  pageItems.forEach(p => projectsGrid.appendChild(renderProjectCard(p)));
}

function renderPagination(data) {
  const totalPages = Math.ceil(data.length / PROJECTS_PER_PAGE);
  const ul = document.createElement('ul');
  ul.className = 'flex justify-center gap-2 mt-6';
  const prev = document.createElement('li');
  const prevButton = document.createElement('button');
  prevButton.innerHTML = '<i class="fa-solid fa-chevron-left mr-1"></i>';
  prevButton.className =
    'px-3 py-1 border rounded transition-all duration-200 ' +
    (currentPage === 1
      ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-600'
      : 'hover:bg-indigo-600 hover:text-white text-gray-800 bg-white');
  prev.appendChild(prevButton);

  if (currentPage > 1) {
    prevButton.addEventListener('click', () => {
      currentPage--;
      renderProjectsPage(data, currentPage);
      renderPagination(data);
    });
  }

  ul.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    pageBtn.className =
      'px-3 py-1 border rounded transition-all duration-200 ' +
      (i === currentPage
        ? 'bg-indigo-600 text-white font-semibold'
        : 'hover:bg-indigo-500 hover:text-white text-gray-800 bg-white');
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      renderProjectsPage(data, currentPage);
      renderPagination(data);
    });
    li.appendChild(pageBtn);
    ul.appendChild(li);
  }

  const next = document.createElement('li');
  const nextButton = document.createElement('button');
  nextButton.innerHTML = '<i class="fa-solid fa-chevron-right ml-1"></i>';
  nextButton.className =
    'px-3 py-1 border rounded transition-all duration-200 ' +
    (currentPage === totalPages
      ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-600'
      : 'hover:bg-indigo-600 hover:text-white text-gray-800 bg-white');
  next.appendChild(nextButton);

  if (currentPage < totalPages) {
    nextButton.addEventListener('click', () => {
      currentPage++;
      renderProjectsPage(data, currentPage);
      renderPagination(data);
    });
  }

  ul.appendChild(next);

  projectsPagination.innerHTML = '';
  projectsPagination.appendChild(ul);
}

loadProjects();

// Accesibilidad
document.addEventListener('keyup', (e) => { if (e.key === 'Tab') document.body.classList.add('kbd'); });

function copiarEmail() {
  const email = document.getElementById("email").innerText;
  navigator.clipboard.writeText(email).then(() => {
    const msg = document.getElementById("copyMsg");
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 2000);
  });
}

const socialLinks = document.querySelectorAll('.img-social a');

function updateSocialLinks(theme) {
  socialLinks.forEach(link => {
    if (theme === 'light') {
      link.style.backgroundColor = '#000';
      link.style.color = 'white';
      link.style.borderColor = '#000';
    } else {
      link.style.backgroundColor = 'transparent';
      link.style.color = '#D1D5DB';
      link.style.borderColor = '#6B7280';
    }
  });
}