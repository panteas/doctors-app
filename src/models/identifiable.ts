export interface Identifiable {
  uid: string;
}

export class Factory {
  create<T>(type: new (input: any) => T, input: any): T {
    return new type(input);
  }
}
