class TokenService {
  static tokenKey = 'token';

  setToken(token) {
    localStorage.setItem(TokenService.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(TokenService.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(TokenService.tokenKey);
  }
}

export default new TokenService();
