import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('deliveries')
export class DeliveryEntity {
  @ObjectIdColumn() id: ObjectID;
  @Column() sender: string;
  @Column() courier: string;
  @Column() packageSize: { width: number, height: number }; 
  @Column() cost: number;
  @Column() description: string;
  @Column() deliveryDate: string;
  @Column() createdDate: string;
  
  constructor(delivery?: Partial<DeliveryEntity>) {
    Object.assign(this, delivery);
  }
} 