export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: moment.Moment;
    gender: Gender;
    jobCategoryId: number;
    email: string;
    phoneNumber: string;
    countryId: number;
    joinedDate: moment.Moment;
    exitedDate: moment.Moment;
}

export enum Gender {
    None = 0,
    Male = 1,
    Female = 2,
    Custom = 4,
}