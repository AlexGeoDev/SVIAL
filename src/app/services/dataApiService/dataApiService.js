import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";

/**
 * Axios HTTP Request defaults
 */
//axios.defaults.baseURL = process.env.DATA_API_URL;
axios.defaults.baseURL = 'http://localhost:8000';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

class DataApiService extends FuseUtils.EventEmitter {

  async get_demarcaciones(desde , hasta) {
    
    const response = await axios.get("appdata/demarcaciones", { params: {
        "desde": desde,
        "hasta": hasta
    }});
    console.log(response)

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async get_victimasvs(year) {
    
    const response = await axios.get("appdata/victimas_vs_anterior", { params: {
        "year": year,
    }});
    console.log(response)

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async get_provincia(year) {
    
    const response = await axios.get("appdata/victimas_provincia", { params: {
        "year": year,
    }});
    console.log(response)

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async get_provinciaName() {
    
    const response = await axios.get("diccionario/provincia");
    // console.log(response)

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async get_carretera() {
    
    const response = await axios.get("tramos/carreteras_con_provincia");
    // console.log(response);

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async get_demarcacion() {
    
    const response = await axios.get("diccionario/demarcacion");
    // console.log(response)

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async get_tipoVia() {
    
    const response = await axios.get("diccionario/tipo_via");
    // console.log(response)

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async get_zonas() {
    const response = await axios.get("diccionario/zona");
    console.log('zonas: ', response)

    if (response.status !== 200) {
      const message = "Se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }

  async getTramosPorCarretera(carretera) {
    try {
      const response = await axios.get(`tramos/pks_carretera?carretera=${carretera}`);
      // console.log('TramosPorCarretera: ', response);

      if (response.status !== 200) {
        const message = "Se produjo un fallo en la carga de tramos por carretera";
        throw new Error(message);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTramosGeo(carretera, pkInicio, pkFin) {
    try {
      const response = await axios.get(`tramos/tramos_geo`, {
        params: {
          carretera,
          pk_inicio: pkInicio,
          pk_fin: pkFin
        }
      });
  
      if (response.status !== 200) {
        const message = "Se produjo un fallo en la carga de tramos geográficos";
        throw new Error(message);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPuntosAccidentes(carretera, pkInicio, pkFin, desde, hasta) {
    try {
      const response = await axios.get(`accidentes/tramo_geom`, {
        params: {
          carretera,
          pk_ini: pkInicio,
          pk_fin: pkFin,
          desde,
          hasta
        }
      });
      console.log('PuntosAccidentes: ', response);

      if (!response || !response.data ||  response.status !== 200) {
        const message = "Respuesta incorrecta al cargar puntos de accidentes";
        throw new Error(message);
      }

      return response.data;
    } catch (error) {
      console.error('Error al cargar puntos de accidentes:', error);
      throw error;
    }
  }
}

export default new DataApiService();
