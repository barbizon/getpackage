import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn() id: ObjectID;
  @Column() username: string;
  @Column() passwordHash: string;

  isSender: boolean;
  isCourier: boolean;

  constructor(user?: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}