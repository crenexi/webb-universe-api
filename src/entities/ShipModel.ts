import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import BaseEntity from './_BaseEntity';
import ShipSpecs from './ShipSpecs';
// import ShipIdentity from './ShipIdentity';
// import ShipSpinoff from './ShipSpinoff';

// Quick note about ship entities:
// ShipIdentity: a ship's central name (ex. Avenger)
// ShipModel: an elemental ship design (ex. Avenger Titan)
// ShipSpecs: the specifications of a model (1-1 relation to ShipModel)
// ShipSpinoff: a style-related variant (ex. Avenger Titan Renegade)
// Ship: an actual ship entry (owned by a society member)

@Entity()
@ObjectType()
class ShipModel extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Field()
  @Column({ default: false })
  isFlightReady: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  specsId: string;

  @Field(() => ShipSpecs)
  @OneToOne(() => ShipSpecs)
  @JoinColumn()
  specs: ShipSpecs;

  // @Field(() => ShipIdentity)
  // @ManyToOne(() => ShipIdentity, (si: ShipIdentity) => si.models)
  // identity: Promise<ShipIdentity>;

  // @Field(() => [ShipSpinoff])
  // @OneToMany(
  //   () => ShipSpinoff,
  //   (ss: ShipSpinoff) => ss.model,
  //   { eager: true, nullable: true },
  // )
  // spinoffs: Promise<ShipSpinoff[]>;
}


export default ShipModel;
