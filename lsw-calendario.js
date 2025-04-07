Vue.component("LswCalendario", {
  template: $template,
  props: {
    modo: {
      type: String,
      default: () => "datetime" // can be: date, time, datetime
    },
    valorInicial: {
      type: [String, Date],
      default: () => new Date()
    },
    alCambiarValor: {
      type: Function,
      default: () => { }
    },
  },
  data() {
    try {
      this.$trace("lsw-calendario.data");
      const hoy = new Date();
      return {
        es_carga_inicial: true,
        valor_inicial_adaptado: this.adaptar_valor_inicial(this.valorInicial),
        es_solo_fecha: this.modo === "date",
        es_solo_hora: this.modo === "time",
        es_fecha_y_hora: this.modo === "datetime",
        fecha_seleccionada: undefined,
        celdas_del_mes_actual: undefined,
        marcadores_del_mes: {},
        hoy: hoy,
        dia_actual: hoy.getDate(),
        mes_actual: hoy.getMonth(),
        anio_actual: hoy.getFullYear(),
        /*
        hora_seleccionada: "0",
        minuto_seleccionado: "0",
        segundo_seleccionado: "0",
        milisegundo_seleccionado: "0",
        //*/
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  methods: {
    getValue() {
      this.$trace("lsw-calendario.methods.getValue");
      return this.fecha_seleccionada;
    },
    adaptar_valor_inicial(valor) {
      this.$trace("lsw-calendario.methods.adaptar_valor_inicial");
      if (typeof valor === "string") {
        try {
          const resultado = LswTimer.utils.getDateFromMomentoText(valor);
          console.log("FECHA ENTRADA:", resultado);
          return resultado;
        } catch (error) {
          console.error("Error parseando valor inicial de lsw-calendario:", error);
        }
      }
      return valor || new Date();
    },
    agregar_digito_de_hora(indice) {
      this.$trace("lsw-calendario.methods.agregar_digito_de_hora");
      const value = this.obtener_digito_de_hora(indice);
      const isInMaximum = ([3, 5].indexOf(indice) !== -1) ? value === 5 : ([1].indexOf(indice) !== -1) ? value === 2 : value === 9;
      if (!isInMaximum) {
        this.establecer_digito_de_hora(indice, value + 1);
      }
    },
    quitar_digito_de_hora(indice) {
      this.$trace("lsw-calendario.methods.quitar_digito_de_hora");
      const value = this.obtener_digito_de_hora(indice);
      const isInMinimum = value === 0;
      if (!isInMinimum) {
        this.establecer_digito_de_hora(indice, value - 1);
      }
    },
    obtener_digito_de_hora(indice, fecha = this.fecha_seleccionada) {
      this.$trace("lsw-calendario.methods.obtener_digito_de_hora");
      if (indice === 1) {
        return parseInt(this.espaciar_izquierda(fecha.getHours(), 2)[0]);
      } else if (indice === 2) {
        return parseInt(this.espaciar_izquierda(fecha.getHours(), 2)[1]);
      } else if (indice === 3) {
        return parseInt(this.espaciar_izquierda(fecha.getMinutes(), 2)[0]);
      } else if (indice === 4) {
        return parseInt(this.espaciar_izquierda(fecha.getMinutes(), 2)[1]);
      } else if (indice === 5) {
        return parseInt(this.espaciar_izquierda(fecha.getSeconds(), 2)[0]);
      } else if (indice === 6) {
        return parseInt(this.espaciar_izquierda(fecha.getSeconds(), 2)[1]);
      } else {
        throw new Error("No se reconoció el índice del dígito: " + indice);
      }
    },
    cambiar_posicion_en_texto(texto, posicion, valor) {
      this.$trace("lsw-calendario.methods.cambiar_posicion_en_texto");
      const arr = ("" + texto).split("");
      arr[posicion] = valor;
      return arr.join("");
    },
    establecer_digito_de_hora(indice, valor) {
      this.$trace("lsw-calendario.methods.establecer_digito_de_hora");
      console.log(indice, valor);
      const fecha_clonada = new Date(this.fecha_seleccionada);
      if (indice === 1) {
        let horas = this.espaciar_izquierda(this.fecha_seleccionada.getHours(), 2);
        horas = this.cambiar_posicion_en_texto(horas, 0, valor);
        const horasInt = parseInt(horas);
        if(horasInt > 23) return;
        fecha_clonada.setHours(horasInt);
      } else if (indice === 2) {
        let horas = this.espaciar_izquierda(this.fecha_seleccionada.getHours(), 2);
        horas = this.cambiar_posicion_en_texto(horas, 1, valor);
        const horasInt = parseInt(horas);
        if(horasInt > 23) return;
        fecha_clonada.setHours(horasInt);
      } else if (indice === 3) {
        let minutos = this.espaciar_izquierda(this.fecha_seleccionada.getMinutes(), 2);
        minutos = this.cambiar_posicion_en_texto(minutos, 0, valor);
        const minutosInt = parseInt(minutos);
        if(minutosInt > 59) return;
        fecha_clonada.setMinutes(minutosInt);
      } else if (indice === 4) {
        let minutos = this.espaciar_izquierda(this.fecha_seleccionada.getMinutes(), 2);
        minutos = this.cambiar_posicion_en_texto(minutos, 1, valor);
        const minutosInt = parseInt(minutos);
        if(minutosInt > 59) return;
        fecha_clonada.setMinutes(minutosInt);
      } else if (indice === 5) {
        // @OK
      } else if (indice === 6) {
        // @OK
      } else {
        throw new Error("No se reconoció el índice del dígito: " + indice);
      }
      console.log(fecha_clonada);
      this.fecha_seleccionada = fecha_clonada;
      this.actualizar_fecha_seleccionada(true);
    },
    ir_a_mes_anterior() {
      this.$trace("lsw-calendario.methods.ir_a_mes_anterior");
      try {
        const nueva_fecha = new Date(this.fecha_seleccionada);
        this.fecha_seleccionada = new Date(nueva_fecha.getFullYear(), nueva_fecha.getMonth()-1, 1);
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    ir_a_mes_siguiente() {
      this.$trace("lsw-calendario.methods.ir_a_mes_siguiente");
      try {
        const nueva_fecha = new Date(this.fecha_seleccionada);
        this.fecha_seleccionada = new Date(nueva_fecha.getFullYear(), nueva_fecha.getMonth()+1, 1);
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    seleccionar_dia(dia) {
      this.$trace("lsw-calendario.methods.seleccionar_dia");
      try {
        this.fecha_seleccionada = dia;
        this.actualizar_fecha_seleccionada(true);
      } catch (error) {
        console.log(error);
        throw error;
      }

    },
    espaciar_izquierda(texto,
      longitud,
      relleno = "0") {
      this.$trace("lsw-calendario.methods.espaciar_izquierda");
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
      this.$trace("lsw-calendario.methods.obtener_fecha_formateada");
      try {
        if (!(fecha instanceof Date)) {
          console.log(fecha);
          throw new Error("Required parameter «fecha» to be a Date on «LswCalendario.methods.obtener_fecha_formateada»");
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

    },
    actualizar_calendario(nuevo_valor = this.fecha_seleccionada) {
      this.$trace("lsw-calendario.methods.actualizar_calendario");
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
        let dia_final_del_mes = undefined;
        Logica_anterior: {
          dia_final_del_mes = new Date(nuevo_valor);
          dia_final_del_mes.setMonth(dia_final_del_mes.getMonth() + 1);
          dia_final_del_mes.setDate(1);
          dia_final_del_mes.setDate(dia_final_del_mes.getDate() - 1);
        }
        Logica_chatgpt: {
          dia_final_del_mes = new Date(nuevo_valor.getFullYear(), nuevo_valor.getMonth() + 1, 0);
        }
        const numero_final_de_mes = dia_final_del_mes.getDate();
        let fila_actual = celdas_vacias_anteriores;
        for (let index = 1; index <= numero_final_de_mes; index++) {
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
        this.propagar_cambio();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    actualizar_fecha_seleccionada(con_propagacion = true, fecha_seleccionada = this.fecha_seleccionada) {
      this.$trace("lsw-calendario.methods.actualizar_fecha_seleccionada");
      if (con_propagacion) {
        const clon_fecha = new Date(fecha_seleccionada);
        this.fecha_seleccionada = clon_fecha;
      }
    },
    propagar_cambio() {
      this.$trace("lsw-calendario.methods.propagar_cambio");
      if (typeof this.alCambiarValor === "function") {
        this.alCambiarValor(this.fecha_seleccionada, this);
      }
    },
    obtener_expresion_de_hora(fecha = this.fecha_seleccionada) {
      let hours = fecha.getHours();
      let minutes = fecha.getMinutes();
      let seconds = fecha.getSeconds();
      hours = this.espaciar_izquierda(hours, 2, "0");
      minutes = this.espaciar_izquierda(minutes, 2, "0");
      seconds = this.espaciar_izquierda(seconds, 2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    establecer_marcadores_del_mes(marcadores_del_mes) {
      this.marcadores_del_mes = marcadores_del_mes;
    }
  },
  watch: {
    fecha_seleccionada(nuevo_valor) {
      this.$trace("lsw-calendario.watch.fecha_seleccionada");
      this.actualizar_calendario(nuevo_valor);
    },
  },
  mounted() {
    this.$trace("lsw-calendario.mounted");
    try {
      this.fecha_seleccionada = this.valor_inicial_adaptado;
      this.es_carga_inicial = false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
});