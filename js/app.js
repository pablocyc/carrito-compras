// Variables
const carrito = document.getElementById('carrito')
const cursos = document.getElementById('lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')


// Listeners
cargarEventListeners()

function cargarEventListeners () {
  // Dispara cuando se presiona "Agregar Carrito"
  cursos.addEventListener('click', comprarCurso)

  // Cuando se elimina un curso del carrito
  carrito.addEventListener('click', eliminarCurso)

  // Al vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}


// Funciones

// Funcion que añade el curso al carrito 

function comprarCurso (e) {
  e.preventDefault()
  //Delegation para agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement
    // Enviamos el curso selecionado para leer sus datos
    leerDatosCurso(curso)
  }
}

// Lee los datos del curso
function leerDatosCurso (curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }

  insertarCarrito(infoCurso)
}

function insertarCarrito (curso) {
  const row = document.createElement('tr')
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" />
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `
  listaCursos.appendChild(row)
}

// Elimina el curso del carrito en el DOM
function eliminarCurso (e) {
  e.preventDefault()

  let curso
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove()
  }
}

// Elimina los cursos del carrito
function vaciarCarrito () {
  // forma lenta
  //listaCursos.innerHTML = ''

  // forma rapida (recomendada)
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild)
  }
  return false
}
