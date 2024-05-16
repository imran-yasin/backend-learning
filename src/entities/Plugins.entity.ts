import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Plugins {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: "varchar", length: 120 })
  public name!: string;

  @Column({ type: "text" })
  public description!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
