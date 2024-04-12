export class Tenant{
    id?: number;
    personalCode = '';
    name = '';
    surname = '';
    dateOfBirth: Date = new Date();
    phone = '';
    email = '';
    apartmentId?: number;
}