import React, { useState, useEffect } from 'react';
import Formulario from './componente/ Formulario';
import ListadoImagene from './componente/ListadoImagen';


function App() {
  
  
  //state
  const [ busqueda, guardarBusqueda ] = useState('');
  const [imagenes, guardarImagenes]= useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas] = useState(5);
  
  useEffect (() => {
    const consultarAPI = async () => { 
      if(busqueda === '') return ;
      const imagenesPorPaginas = 30;
      const key ='15266656-36554dbc504a8fff044ea5a8a';
      const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPaginas}`;
      
      const respuesta = await fetch(url);
      
      const resultado = await respuesta.json();
      
      guardarImagenes(resultado.hits);
      
      // calcular total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPaginas );
      guardarTotalPaginas(calcularTotalPaginas);
      
      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    consultarAPI();
    
  },[busqueda, paginaactual])
  
  // definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    
    if(nuevaPaginaActual === 0 ) return;
    
    guardarPaginaActual(nuevaPaginaActual);
  }
  
  // definir pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    
    if(nuevaPaginaActual > totalpaginas ) return;
    
    guardarPaginaActual(nuevaPaginaActual);
  }
  
  
  return (
    <div className="container">
    <div className="jumbotron">
    <p className="lead text-center">Buscador de Imagenes</p>
    
    </div>
    <Formulario
    guardarBusqueda={guardarBusqueda}
    />
    <div className="row justify-center">
    <ListadoImagene
    imagenes={imagenes}
    />
    
    { (paginaactual === 1) ? null : (
      <button 
      type="button"
      className="btn btn-outline-danger mr-1"
      onClick={paginaAnterior}
      >&laquo; Anterior </button>
      ) }
      
      { (paginaactual === totalpaginas) ? null : (
        <button 
        type="button"
        className="btn btn-outline-danger"
        onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
        ) }
        
        </div>
        </div>
        
        
        );
      }
      
      export default App;
      