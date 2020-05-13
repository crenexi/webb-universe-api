import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import BaseEntity from './_BaseEntity';
import ShipModel from './ShipModel';

@Entity()
@ObjectType()
class ShipSpinoff extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ManyToOne(() => ShipModel, (sm: ShipModel) => sm.spinoffs)
  model: Promise<ShipModel>;
}

export default ShipSpinoff;
