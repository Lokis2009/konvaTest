export class AppSettings {

  public API_server: string;
  public login: string;
  private host: string = location.host;
  public GoogelKey =  'AIzaSyDoJ57NW0Tg450T2C8Cojy2i0Ru0trl6uQ';

  constructor() {
    this.API_server = this.setApiServer();
    this.login = this.setLoginServer();
  }

  private setLoginServer() {

    switch (this.host) {
      case 'localhost:4200': return 'http://35.156.65.44:3001/';
      case '35.156.65.44': return 'http://35.156.65.44:3001/';
      case '18.195.63.26': return 'https://18.195.63.26/';
      // case 'admin.defigohome.com': return 'https://admin.defigohome.com/'
      default: return 'http://35.156.65.44:3001/';

    }
  }
  private setApiServer() {
    switch (this.host) {
      case 'localhost:4200': return 'http://35.156.65.44:3001/api/';
      case '35.156.65.44': return 'http://35.156.65.44:3001/api/';
      case '18.195.63.26': return 'https://18.195.63.26/api/';
      default: return 'http://35.156.65.44:3001/api/';
    }
  }
}
