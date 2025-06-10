export class RqCreateCandidate {
  name: string;
  surname: string;
  excelFile: File;

  constructor(name: string, surname: string, excelFile: File) {
    this.name = name;
    this.surname = surname;
    this.excelFile = excelFile;
  }

  static create(name: string, surname: string, excelFile: File): RqCreateCandidate {
    return new RqCreateCandidate(name, surname, excelFile);
  }
}
