// Export the class
export class User {
    // Generate a constructor
    constructor(
      public _id: string = '',
      public names: string = '',
      public lastName: string = '',
      public age: number = 0,
      public email: string = '',
      public pass: string = '',
      public role: string = '',
      public address: string = '',
      public phoneNumber: string = '',
      public getToken: boolean = false
    ) {}
  }
  