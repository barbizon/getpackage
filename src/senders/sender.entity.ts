import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('senders')
export class SenderEntity {
  @ObjectIdColumn() id: ObjectID;
  @Column() userId: string;
  @Column() companyName: string;

  constructor(sender?: Partial<SenderEntity>) {
    Object.assign(this, sender);
  }
}