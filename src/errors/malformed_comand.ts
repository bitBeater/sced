export class MalformedComand extends Error {
  constructor(comand: string) {
    super('Malformed Comand' + comand);
  }
}
