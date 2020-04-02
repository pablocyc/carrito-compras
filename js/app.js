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

  // Al cargar el documento, mostrar el LS
  document.addEventListener('DOMContentLoaded', leerLocalStorage)
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
  guardarCursoLocalStorage(curso)
}

// Elimina el curso del carrito en el DOM
function eliminarCurso (e) {
  e.preventDefault()

  let curso, cursoID
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove()
    curso = e.target.parentElement.parentElement
    cursoID = curso.querySelector('a').getAttribute('data-id')
  }

  eliminarCursoLocalStorage(cursoID)
}

// Elimina los cursos del carrito
function vaciarCarrito () {
  // forma lenta
  //listaCursos.innerHTML = ''

  // forma rapida (recomendada)
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild)
  }
  // vaciar carrito
  vaciarLocalStorage()

  return false
}

// Almacena cursos del carrito al Local Storage
function guardarCursoLocalStorage (curso) {
  let cursos

  // toma el valor de un arreglo con datos del LS o vacio
  cursos = obtenerCursosLocalStorage()

  // el curso seleccionado se agrega al arreglo
  cursos.push(curso)

  localStorage.setItem('cursos', JSON.stringify(cursos))
}

function obtenerCursosLocalStorage () {
  let cursosLS

  // comprobamos si hay algo en LocalStorage
  if (localStorage.getItem('cursos') === null) {
    cursosLS = []
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'))
  }

  return cursosLS
}

// Imprime los cursos de LS en el carrito
function leerLocalStorage () {
  let cursosLS

  cursosLS = obtenerCursosLocalStorage()

  cursosLS.forEach( function (curso) {
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
  })
}

function eliminarCursoLocalStorage (curso) {
  let cursosLS
  // Obtenemos el arreglo del curso
  cursosLS = obtenerCursosLocalStorage()
  // Iteramos comparando el id del curso borrado con el del LS
  cursosLS.forEach( function (cursoLS, index) {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1)
    }
  })
  // Añadimos el arreglo actual al LS
  localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

// Elimina todos los cursos del LS

function vaciarLocalStorage () {
  localStorage.clear()
}