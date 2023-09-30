/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */

/*
Simple singleton pattern to store the function to retrieve the JWT secret.
*/
export class JwtStore {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static _instance: JwtStore;

  private _jwtFunc!: () => Promise<string>;

  public static getJwtStore(): JwtStore {
    if (!this._instance) this._instance = new JwtStore();

    return this._instance;
  }

  public setJwtFunc(jwtFunc: () => Promise<string>): void {
    this._jwtFunc = jwtFunc;
  }

  public async getJwt(): Promise<string> {
    return this._jwtFunc();
  }
}
