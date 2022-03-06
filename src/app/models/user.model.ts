export interface AuthData {
  accessToken: string;
  user: {
    username: string;
    email: string;
    id: number;
  };
}

export class User {
  constructor(
    public username:string,
    public email: string,
    public id: number,
    private _token: string,
    private _tokenEx: Date
  ) {}

  get token() {
    if (!this._tokenEx || new Date() > this._tokenEx) {
      return null;
    }
    return this._token;
  }
}
