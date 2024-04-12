export class TenantResponse{
    id?: number;
    personalCode = '';
    name = '';
    surname = '';
    dateOfBirth: Date = new Date();
    phone = '';
    email = '';
    action = '';
    apartmentId?: number;
}