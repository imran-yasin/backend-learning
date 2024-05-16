import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

enum SectorsStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity()
export class Sector {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: "varchar", length: 120 })
  public name!: string;

  @Column({ type: "text" })
  public description!: string;

  @Column()
  public base_prompt!: string;

  @Column({
    type: "enum",
    enum: SectorsStatus,
    default: SectorsStatus.INACTIVE,
  })
  public sectors_status!: SectorsStatus;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
