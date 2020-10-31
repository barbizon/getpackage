import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('couriers')
export class CourierEntity {
  @ObjectIdColumn() id: ObjectID;
  @Column() userId: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column() phoneNumber: string;
  @Column() vehicleType: string;

  constructor(courier?: Partial<CourierEntity>) {
    Object.assign(this, courier);
  }
}