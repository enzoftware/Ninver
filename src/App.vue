<template>
  <div id="app">
    <div class="container">
      <h1>{{msg}}</h1>
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input v-model="email" type="email" class="form-control" id="inputEmail4" placeholder="empresa@email.com">
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input v-model="password" type="password" class="form-control" id="inputPassword4" placeholder="xxxxxxxxx">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-8">
            <label for="inputRazonSocial">Razon social</label>
            <input v-model="razonSocial" type="text" class="form-control" id="inputRazonSocial" placeholder="Crehana">
          </div>
          <div class="form-group col-md-4">
            <label for="inputTipoEmpresa">Tipo de empresa</label>
            <select v-model="tipoEmpresa" id="inputTipoEmpresa" class="form-control">
              <option>Tecnologia</option>
              <option>Educacion</option>
              <option>Salud</option>
              <option>Medio Ambiente</option>
              <option>Finanzas</option>
              <option>Otros</option>
            </select>
        
          </div>
        </div>
        <div class="form-group">
          <label for="inputRUC">RUC</label>
          <input v-model="ruc" type="text" class="form-control" id="inputRUC" placeholder="1234567890">
        </div>
        <div class="form-group">
          <label for="inputAddress">Direccion</label>
          <input v-model="direccion" type="text" class="form-control" id="inputAddress" placeholder="Av. Primavera 2305, 501">
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">Ciudad</label>
            <input v-model="ciudad" type="text" class="form-control" id="inputCity" placeholder="Lima">
          </div>
          <div class="form-group col-md-3">
            <label for="inputContacto">Numero de contacto</label>
            <input v-model="numeroContacto" type="text" class="form-control" id="inputContacto" placeholder="999999999">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputMonto">Monto (S/.)</label>
            <input v-model="monto" type="number" class="form-control" id="inputMonto" placeholder="120">
          </div>
          <div class="form-group col-md-4">
            <label for="inputInteres">Interes(%)</label>
            <input v-model="interes" type="text" class="form-control" id="inputInteres" placeholder="10.3">
          </div>
          <div class="form-group col-md-4">
            <label for="inputCuotas">Cuotas (mensuales)</label>
            <input v-model="numeroCuotas" type="text" class="form-control" id="inputCuotas" placeholder="100">
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck">
            <label class="form-check-label" for="gridCheck">
              Acepto los terminos y condiciones
            </label>
          </div>
        </div>
        <button @click="EnviarDatos()" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script>

import {proyectsRef} from './firebase'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Ninver',
      email: '',
      password: '',
      razonSocial: '',
      tipoEmpresa: '',
      ruc: '',
      direccion: '',
      ciudad: '',
      numeroContacto: '',
      monto : '',
      interes: '',
      numeroCuotas: ''
    }
  },
  methods:{
    EnviarDatos(){
      proyectsRef.push({
        correo: this.email,
        contrasena: this.password,
        razonSocial: this.razonSocial,
        tipoEmpresa: this.tipoEmpresa,
        RUC: this.ruc,
        direcccion: this.direccion,
        ciudad: this.ciudad,
        numeroContacto: this.numeroContacto,
        monto: this.monto,
        interes: this.interes,
        numeroCuotas: this.numeroCuotas
      });
    }
  }
}
</script>

<style>

</style>
