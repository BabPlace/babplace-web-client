export type ErorrData = { message: string };

export class Errors extends Error {
  status: number;
  data: ErorrData;

  constructor(message: string, status: number, data: ErorrData) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'Errors';
  }
}
