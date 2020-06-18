export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: Gender;
    jobCategoryId: number;
    email: string;
    phoneNumber: string;
    countryId: number;
    joinedDate: Date;
    exitedDate: Date;
}

export enum Gender {
    None = 0,
    Male = 1,
    Female = 2,
    Custom = 4,
}