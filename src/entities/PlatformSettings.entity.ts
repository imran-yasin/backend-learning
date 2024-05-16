import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from "typeorm";

@Entity()
export class PlatformSettings {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: "varchar", length: 120 })
  public open_ai_token: string;

  @CreateDateColumn()
  public createdAt!: Date;
}
