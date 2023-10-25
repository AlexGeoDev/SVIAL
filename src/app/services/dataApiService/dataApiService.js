import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";

/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = 'http://localhost:8000/appdata'; // TOIDO: mover esto a .env
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

class DataApiService extends FuseUtils.EventEmitter {

  async get_demarcaciones(req) {

    
    const response = await axios.get("demarcaciones", { params: {
        "desde": "2021-01-01",
        "hasta": "2022-12-31"
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
