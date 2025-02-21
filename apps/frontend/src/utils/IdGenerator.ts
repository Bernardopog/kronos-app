export default class IdGenerator {
  private _id: string;

  constructor(length: number = 4) {
    if (length < 4) {
      length = 4;
    }
    const values =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let acc = "";
    for (let i = 0; i < length; i++) {
      acc += values[Math.floor(Math.random() * 62)];
    }
    this._id = acc;
  }

  public get id() {
    return this._id;
  }
}
