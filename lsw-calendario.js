Vue.component("LswCalendario", {
  template: $template,
  props: {
    soloFecha: {
      type: Boolean,
      default: false
    },
    alCambiarValor: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    try {
      return {
        fecha_seleccionada: undefined,
        celdas_del_mes_actual: undefined,
        hora_seleccionada: "0",
        minuto_seleccionado: "0",
        segundo_seleccionado: "0",
        milisegundo_seleccionado: "0"
      };
    } catch (error) {
      console.log(error);
      throw error;
    }

  },
  methods: {
    getValue() {
      return this.fecha_seleccionada;
    },
    ir_a_mes_anterior() {
      try {
        const nueva_fecha = new Date(this.fecha_seleccionada);
        nueva_fecha.setMonth(nueva_fecha.getMonth() - 1);
        this.fecha_seleccionada = nueva_fecha;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    ir_a_mes_siguiente() {
      try {
        const nueva_fecha = new Date(this.fecha_seleccionada);
        nueva_fecha.setMonth(nueva_fecha.getMonth() + 1);
        this.fecha_seleccionada = nueva_fecha;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    agregar_hora() {
      try {
        let hora = parseInt(this.hora_seleccionada);
        hora += 1;
        this.hora_seleccionada = hora;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    agregar_minuto() {
      try {
        let minuto = parseInt(this.minuto_seleccionado);
        minuto += 1;
        this.minuto_seleccionado = minuto;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    agregar_segundo() {
      try {
        let segundo = parseInt(this.segundo_seleccionado);
        segundo += 1;
        this.segundo_seleccionado = segundo;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    quitar_hora() {
      try {
        let hora = parseInt(this.hora_seleccionada);
        hora -= 1;
        this.hora_seleccionada = hora;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    quitar_minuto() {
      try {
        let minuto = parseInt(this.minuto_seleccionado);
        minuto -= 1;
        this.minuto_seleccionado = minuto;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    quitar_segundo() {
      try {
        let segundo = parseInt(this.segundo_seleccionado);
        segundo -= 1;
        this.segundo_seleccionado = segundo;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    seleccionar_dia(dia) {
      try {
        this.fecha_seleccionada = dia;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    espaciar_izquierda(texto,
      longitud,
      relleno = "0") {
      try {
        let salida = "" + texto;
        while (salida.length < longitud) {
          salida = relleno + salida;
        }
        return salida;
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    obtener_fecha_formateada(fecha) {
      try {
        if (typeof fecha === 'undefined') {
          return;
        }
        let formato = "";
        formato += (() => {
          try {
            if (fecha.getDay() === 0) {
              return "Domingo";
            }
            if (fecha.getDay() === 1) {
              return "Lunes";
            }
            if (fecha.getDay() === 2) {
              return "Martes";
            }
            if (fecha.getDay() === 3) {
              return "Miércoles";
            }
            if (fecha.getDay() === 4) {
              return "Jueves";
            }
            if (fecha.getDay() === 5) {
              return "Viernes";
            }
            if (fecha.getDay() === 6) {
              return "Sábado";
            }
          } catch (error) {
            console.log(error);
            throw error;
          }
        })();
        formato += ", ";
        formato += fecha.getDate();
        formato += " de ";
        formato += (() => {
          try {
            if (fecha.getMonth() === 0) {
              return "Enero";
            }
            if (fecha.getMonth() === 1) {
              return "Febrero";
            }
            if (fecha.getMonth() === 2) {
              return "Marzo";
            }
            if (fecha.getMonth() === 3) {
              return "Abril";
            }
            if (fecha.getMonth() === 4) {
              return "Mayo";
            }
            if (fecha.getMonth() === 5) {
              return "Junio";
            }
            if (fecha.getMonth() === 6) {
              return "Julio";
            }
            if (fecha.getMonth() === 7) {
              return "Agosto";
            }
            if (fecha.getMonth() === 8) {
              return "Septiembre";
            }
            if (fecha.getMonth() === 9) {
              return "Octubre";
            }
            if (fecha.getMonth() === 10) {
              return "Noviembre";
            }
            if (fecha.getMonth() === 11) {
              return "Diciembre";
            }
          } catch (error) {
            console.log(error);
            throw error;
          }
        })();
        formato += " de ";
        formato += fecha.getFullYear();
        return formato;
      } catch (error) {
        console.log(error);
        throw error;
      }

    }
  },
  watch: {
    fecha_seleccionada(nuevo_valor) {
      try {
        const dias = [];
        const dia_1_del_mes = new Date(nuevo_valor);
        dia_1_del_mes.setDate(1);
        dia_1_del_mes.setHours(0);
        dia_1_del_mes.setMinutes(0);
        dia_1_del_mes.setSeconds(0);
        dia_1_del_mes.setMilliseconds(0);
        const dias_antes_de_entrar_en_el_mes = (() => {
          try {
            const dia_de_semana = dia_1_del_mes.getDay();
            if (dia_de_semana === 0) {
              return 6;
            }
            if (dia_de_semana === 1) {
              return 0;
            }
            if (dia_de_semana === 2) {
              return 1;
            }
            if (dia_de_semana === 3) {
              return 2;
            }
            if (dia_de_semana === 4) {
              return 3;
            }
            if (dia_de_semana === 5) {
              return 4;
            }
            if (dia_de_semana === 6) {
              return 5;
            }
          } catch (error) {
            console.log(error);
            throw error;
          }
        })();
        const celdas_vacias_anteriores = new Array(dias_antes_de_entrar_en_el_mes);
        const dia_final_del_mes = new Date(nuevo_valor);
        dia_final_del_mes.setMonth(dia_final_del_mes.getMonth() + 1);
        dia_final_del_mes.setDate(1);
        dia_final_del_mes.setDate(dia_final_del_mes.getDate() - 1);
        const numero_final_de_mes = dia_final_del_mes.getDate();
        let fila_actual = celdas_vacias_anteriores;
        for (let index = 1; index < numero_final_de_mes + 1; index++) {
          const nueva_fecha = new Date(dia_1_del_mes);
          nueva_fecha.setDate(index);
          fila_actual.push(nueva_fecha);
          if (nueva_fecha.getDay() === 0) {
            dias.push(fila_actual);
            fila_actual = [];
          }
        }
        if (fila_actual.length) {
          dias.push(fila_actual);
        }
        this.celdas_del_mes_actual = dias;
        if(typeof this.alCambiarValor === "function") {
          this.alCambiarValor(nuevo_valor, this);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }

    }
  },
  mounted() {
    try {
      this.fecha_seleccionada = new Date();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
});