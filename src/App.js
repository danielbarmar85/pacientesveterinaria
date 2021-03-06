import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';
class App extends Component {
  state = {
    citas: []
  }

  // Cuando la aplicación carga.
  componentDidMount() {
    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas : JSON.parse(citasLS)
      })
    }
  }

  // Cuando eliminamos o agregamos una nueva cita.
  componentDidUpdate() {
    localStorage.setItem(
      'citas', JSON.stringify(this.state.citas)
    );
  }


  //CrearCita
  crearNuevaCita = datos => {
    // Copiar el state actual.
    const citas = [...this.state.citas, datos];

    // Agregar el nuevo state.
    this.setState({
      citas : citas
    })
  }

  // Eliminar Cita del state.
  eliminarCita = id => {
    // Copia del state.
    const citasActuales = [...this.state.citas];

    // Utilizar filter para quitar un elemento del array
    const citas = citasActuales.filter(cita => cita.id !== id)

    // Actualizar el state.
    this.setState({
      citas : citas
    })

  }

  render() {
    return (
      <div className="container">
        <Header titulo='Administrador Pacientes Veterinaria'/>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas={this.state.citas}
              eliminarCita = {this.eliminarCita}
            />
          </div>
        </div>
      </div>
    );
  };
};

export default App;
