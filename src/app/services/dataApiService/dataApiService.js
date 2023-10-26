import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";

/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = 'http://localhost:8000/appdata'; // TOIDO: mover esto a .env
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

class DataApiService extends FuseUtils.EventEmitter {

  async get_demarcaciones(desde , hasta) {
    
    const response = await axios.get("demarcaciones", { params: {
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
    
    const response = await axios.get("victimas_vs_anterior", { params: {
        "year": year,
    }});
    console.log(response)

    if (response.status !== 200) {
      const message = "se produjo un fallo en la carga de capas";
      throw new Error(message);
    }
    return response.data;
  }
}

export default new DataApiService();
