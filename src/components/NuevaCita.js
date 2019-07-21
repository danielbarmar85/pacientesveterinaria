import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const stateInicial = {
  cita: {
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  },
  error: false
}

class NuevaCita extends Component {
  state = { ...stateInicial }

  // Cuando el usuario cambia los inputs.
  handleChange = e => {
    // onsole.log(e.target.name + ': ' + e.target.value);

    // Colocar lo que le usuario escribe en el state.
    this.setState({
      cita : {
        ...this.state.cita,
        [e.target.name] : e.target.value
      }
    })
  }

  // Cuando el usuario envia el formulario.
  handleSubmit = e => {
    e.preventDefault();

    // Extraer los valores del state.
    const { mascota, propietario, fecha, hora, sintomas } = this.state.cita

    // Validar que todos los campos esten rellenos.
    if(mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === ''){
      this.setState({
        error: true
      });

      // Detener la ejecucion.
      return;
    }

    // Generar objeto con los datos
    const nuevaCita = {...this.state.cita};
    nuevaCita.id = uuid();

    // Agregar la cita al state de APP.
    this.props.crearNuevaCita(nuevaCita)

    // Colocar en el state el state inicial.
    this.setState({
      ...stateInicial
    })
  }

  render() {
    // Extraer valor delk state.
    const { error } = this.state;

    return (
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">
            LLena el formulario para crear una nueva cita.
          </h2>

          { error ? <div className="alert alert-danger mt-2 mb-5 text-center"> Todos los campos son obligatorios</div> : null }

          <form
            onSubmit={this.handleSubmit}
          >
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Mascota
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  id="mascota"
                  type="text"
                  className="form-control"
                  placeholder="Nombre mascota"
                  name="mascota"
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Dueño
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  id="propietario"
                  type="text"
                  className="form-control"
                  placeholder="Nombre Dueño mascota"
                  name="propietario"
                  onChange={this.handleChange}
                  value={this.state.cita.propietario}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Fecha
              </label>
              <div className="col-sm-8 col-lg-4">
                <input
                  id="fecha"
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}
                />
              </div>
              <label className="col-sm-4 col-lg-2 col-form-label">
                Hora
              </label>
              <div className="col-sm-8 col-lg-4">
                <input
                  id="hora"
                  type="time"
                  className="form-control"
                  name="hora"
                  onChange={this.handleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Síntomas
              </label>
              <div className="col-sm-8 col-lg-10">
                <textarea
                  id="sintomas"
                  className="form-control"
                  name="sintomas"
                  placeholder="Describe los síntomas"
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}
                ></textarea>
              </div>
            </div>

            <input
              type="submit"
              className="py-3 mt-2 btn btn-success btn-block"
              value="Agregar Nueva Cita"
            />

          </form>
        </div>
      </div>
    );
  };
};

NuevaCita.propTypes = {
  crearNuevaCita : PropTypes.func.isRequired
}

export default NuevaCita;