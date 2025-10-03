/* Descarga de CV
document.getElementById('downloadCV').addEventListener('click', () => {
  try {
    const fileUrl = '#';
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'CurriculumVitae.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.error('Error al descargar CV:', err);
    alert('No se pudo descargar el CV.');
  }
});*/

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

const SAMPLE_PROJECTS = [
  { id: 1, title: 'Docentes en Línea', desc: 'Trabajé en el desarrollo de un nuevo sitio web para los docentes, incorporando sus respectivos contenidos, como imágenes, información y enlaces. Además, configuré un chatbot basado en el motor de OpenAI y realicé la implementación de accesibilidad para garantizar una experiencia inclusiva para todos los usuarios', tech: ['WordPress', 'PHP', 'API OpenAI', 'Accesibilidad','SEO', 'Google Analytics'], url: 'https://docentesenlinea.udec.cl/', img: 'resources/img/docentelinea.png' },
  { id: 2, title: 'Facd. Humanidades y Artes', desc: 'Realice la actualización, mantenimiento del sitio web y limpieza de la base de datos de script malicioso. Además de migrar a otro hosting.', tech: ['Wordpress','SEO', 'Google Analytics'], url: 'http://humanidadesyarte.udec.cl/', img: 'resources/img/FacHumanidades.png' },
  { id: 3, title: 'Campus Naturaleza', desc: 'Realice la actualización y mantenimiento del sitio web el cual estaba desarrollado en wordpress. Además de implementar la traducción al idioma inglés.', tech: ['Wordpress', 'SEO', 'Google Analytics'], url: 'https://campusnaturaleza.udec.cl/', img: 'resources/img/CampusNaturaleza.jpeg' },
  { id: 4, title: 'ATE CFRD UdeC [En producción]', desc: 'Nueva pagina web de venta de cursos para profesores proporcionados por ATE CFRD UDEC, mediante Wordpress + Woocomerce conectado con Moodle.', tech: ['WordPress', 'Woocomerce', 'Moodle'], img: 'resources/img/ATE.jpg'},
  { id: 5, title: 'KGB Logistic', desc: 'Participé en el equipo de desarrollo de KGB, contribuyendo a la optimización del rendimiento y mejoras funcionales de su sitio web.', tech: ['WordPress'], url: 'https://www.kgblogistic.com/', img: 'resources/img/KGB.png' },
  { id: 6, title: 'ConceUncover', desc: 'En el proyecto de título ConceUncover, me encargué de implementar mejoras estéticas en los popups del sitio web, ajustando la paleta de colores, los bordes y deshabilitando la opción de cierre manual para dirigir adecuadamente la interacción del usuario.', tech: ['Laravel','PHP','CSS','JavaScript'], url: 'https://github.com/MarTofuz/ConceUncover', img: 'resources/img/repositorio.png' },
  { id: 7, title: 'IHPE LTDA', desc: 'Desarrollé un sitio web para la pyme IHPE LTDA, el cual le permite realizar ventas de productos de aseo y limpieza destinados al hogar en colaboración con un equipo de trabajo compuesto por cuatro integrantes, asumiendo los roles de Jefe de Proyecto y Desarrollador. Como líder del proyecto, coordiné las actividades del equipo, asigné responsabilidades y garantizé que el desarrollo siguiera los objetivos establecidos. Utilizamos WordPress y Woocommerce para crear un sitio web funcional y atractivo. Trabajando en conjunto con el equipo, llevamos a cabo la personalización del diseño, la integración de la plataforma de comercio electrónico, y la optimización del rendimiento del sitio.', tech: ['WordPress','Woocomerce', 'Scrum'], url: 'http://ihpeltda.cl/', img: 'resources/img/IHPE LTDA.jpg'},
  { id: 8, title: 'CoffeeTime', desc: 'Es un proyecto colaborativo desarrollado en Laravel, que permite a los usuarios registrarse e iniciar sesión para gestionar productos. Toda la información se almacena en una base de datos.', tech: ['Laravel','PHP','CSS','JavaScript'], url: 'https://github.com/Jossszz/CoffeeTime', img: 'resources/img/repositorio.png'},
];

function renderProjectCard(p) {
  const div = document.createElement('div');
  div.className = 'p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded transform transition-transform duration-300 hover:scale-105 hover:shadow-lg';

  const projectLink = p.url ? `<div class="mt-3">
      <a href="${p.url}" target="_blank" class="text-indigo-400 text-sm">Ver proyecto →</a>
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
      if (simulateError) return reject(new Error('Error simulado al obtener proyectos'));
      resolve(SAMPLE_PROJECTS);
    }, 600);
  });
}

async function loadProjects({simulateError=false} = {}){
  projectsError.classList.add('hidden');
  projectsGrid.innerHTML = '<p class="text-gray-400">Cargando proyectos...</p>';
  try {
    const data = await fetchProjects(simulateError);
    projectsGrid.innerHTML = '';
    data.forEach(p => projectsGrid.appendChild(renderProjectCard(p)));
  } catch (err) {
    console.error('No se pudo cargar proyectos:', err);
    projectsGrid.innerHTML = '';
    projectsError.textContent = 'No se pudieron cargar los proyectos. Intenta recargar.';
    projectsError.classList.remove('hidden');
  }
}

loadProjects();
document.getElementById('loadMoreProjects').addEventListener('click', () => loadProjects({simulateError:false}));

// Accesibilidad
document.addEventListener('keyup', (e) => { if (e.key === 'Tab') document.body.classList.add('kbd'); });