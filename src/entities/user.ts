import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { BaseEntity } from './_base-entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  /** Password */
  @Column()
  password: string;

  /** Handle */
  @Field()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  handle?: string;

  /** Email */
  @Field()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  email?: string;

  /** Signature */
  @Field()
  @Column({ type: 'varchar', length: 75, nullable: true })
  signature?: string;

  /** Archival notice */
  @Field()
  @Column({ name: 'archival_notice', nullable: true })
  archivalNotice?: string;

  /** Is suspended */
  @Field()
  @Column({ name: 'is_suspended', default: false })
  isSuspended: boolean;

  /** Suspension Notice */
  @Field()
  @Column({ name: 'suspension_notice', nullable: true })
  suspensionNotice?: string;
}
