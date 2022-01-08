export interface Doctor {
  uid: string;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  startingPrice?: number;
  city?: string;
  specialisation?: string;
  appointments?: [];

  // getRawData(): any {
  //   return {
  //     fullName: this.fullName,
  //     uid: this.uid,
  //     email: this.email,
  //     avatar: this.avatar,
  //     role: this.role,
  //     startingPrice: this.startingPrice,
  //     city: this.city,
  //     specialisation: this.specialisation,
  //   };
  // }
}
