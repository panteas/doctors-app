export class User {
  uid: string;
  fullName: string;
  email: string;
  conditions?: string[];
  avatar?: string;
  role: string;
  appointments?: [];

  getRawData(): any {
    return {
      uid: this.uid,
      fullName: this.fullName,
      email: this.email,
      conditions: this.conditions,
      avatar: this.avatar,
      role: this.role,
    };
  }
}
