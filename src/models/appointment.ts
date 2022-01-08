export class Appointment {
  userUid: string;
  doctorUid: string;
  startTime: Date;
  endTime: Date;

  getRawData(): any {
    return {
      startTime: this.startTime.toString(),
      endTime: this.endTime.toString(),
      userUid: this.userUid,
      doctorUid: this.doctorUid,
    };
  }
}
