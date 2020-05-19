import { Diff } from 'utility-types';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { BaseEntity } from './_base-entity';
import { ShipSpecs } from './ship-specs';
// import ShipIdentity from './ShipIdentity';
// import ShipSpinoff from './ShipSpinoff';

// Quick note about ship entities:
// ShipIdentity: a ship's central name (ex. Avenger)
// ShipModel: an elemental ship design (ex. Avenger Titan)
// ShipSpecs: the specifications of a model (1-1 relation to ShipModel)
// ShipSpinoff: a style-related variant (ex. Avenger Titan Renegade)
// Ship: an actual ship entry (owned by a society member)

// Snake-cased column names
const columnNamesMap = {
  isFlightReady: 'is_flight_ready',
  specsId: 'specs_id',
};

@Entity()
@ObjectType()
export class ShipModel extends BaseEntity {
  /** Name */
  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  /** Description */
  @Field()
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  /** Is flight ready */
  @Field()
  @Column({ default: false })
  isFlightReady: boolean;

  @Column({ nullable: true })
  specsId: string;

  /** Specs */
  @Field(() => ShipSpecs)
  @OneToOne(() => ShipSpecs)
  @JoinColumn()
  specs: Diff<ShipSpecs, BaseEntity>;

  // @Column({ nullable: true })
  // profileId: number;

  // @OneToOne(() => Profile)
  // @JoinColumn()
  // profile: Profile;

  // @Field(() => ShipIdentity)
  // @ManyToOne(() => ShipIdentity, (si: ShipIdentity) => si.models)
  // identity: Promise<ShipIdentity>;

  // @Field(() => [ShipSpinoff])
  // @OneToMany(
  //   () => ShipSpinoff,
  //   (ss: ShipSpinoff) => ss.model,
  //   { nullable: true },
  // )
  // spinoffs: Promise<ShipSpinoff[]>;
}
