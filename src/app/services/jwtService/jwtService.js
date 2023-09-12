import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            const accesssToken= this.getAccessToken();
            if (accesssToken && !this.isAuthTokenValid(accesssToken)){
              this.emit('onAutoLogout', 'La sesión ha expirado');
            } else if (accessToken) {
              this.emit('onAutoLogout', 'Token de acceso no  válido');
            }
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(accessToken)) {
      this.setSession(accessToken);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'accessToken expired');
    }
  };

    signInWithEmailAndPassword = (username, password) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            username,
            password,
          })
          
          .then((response) => {
            if (response.data) {
              const decoded = jwtDecode(response.data);
              this.setSession(response.data);
              resolve({
                id: decoded.id,
                role: decoded.isAdmin ? 'admin' : 'user',
                data: {
                  displayName: decoded.name,
                  email: decoded.mail,
                },
              });
            } else {
              reject(new Error('Respuesta del servidor no válida'));
            }
          })
          .catch((e) => {
            reject(new Error(e.response.data.message));
          })
      });
    };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      const decoded = jwtDecode(accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      axios
        .get(`/user/${decoded.id}`)
        .then((response) => {
          if (response.data) {
            this.setSession(accessToken);
            resolve({
              uuid: decoded.id,
              role: decoded.isAdmin ? 'admin' : 'user',
              data: {
                displayName: decoded.name,
                email: decoded.mail,
              }
            });
          } else {
            this.logout();
            reject(new Error('El login no proporcionó los datos del usuario.'));
          }
        })
        .catch(() => {
          this.logout();
          reject(new Error('Token no válido.'));
        });
    });
  };

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('svial_access_token', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('svial_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (accessToken) => {
    if (!accessToken) {
      return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('svial_access_token');
  };
}

const instance = new JwtService();

export default instance;
