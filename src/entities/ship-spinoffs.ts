import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { BaseEntity } from './_base-entity';
// import { ShipModel } from './ship-model';

@Entity()
@ObjectType()
export class ShipSpinoff extends BaseEntity {
  /** Name */
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  /** Description */
  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  /** Model */
  // @ManyToOne(
  //   () => ShipModel,
  //   (shipModel: ShipModel) => shipModel.spinoffs,
  // )
  // model: Promise<ShipModel>;
}
