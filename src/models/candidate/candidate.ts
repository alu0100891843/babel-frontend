export class Candidate {
  name: string;
  surname: string;
  seniority: string;
  experience: number;
  availability: boolean;

  private constructor(
    name: string,
    surname: string,
    seniority: string,
    experience: number,
    availability: boolean
  ) {
    this.name = name;
    this.surname = surname;
    this.seniority = seniority;
    this.experience = experience;
    this.availability = availability;
  }

  static create(
    name: string,
    surname: string,
    seniority: string,
    experience: number,
    availability: boolean
  ): Candidate {
    return new Candidate(name, surname, seniority, experience, availability);
  }

  static createFromJson(json: any): Candidate {
    return new Candidate(
      json.name,
      json.surname,
      json.seniority,
      json.experience,
      json.availability
    );
  }
}
