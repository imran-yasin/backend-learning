import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum TanentStatus {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
}

@Entity()
export class Tanents {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "varchar", length: 120 })
  public username: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "boolean", default: false })
  public hosting_tenant: boolean;

  @Column({ type: "uuid", nullable: true })
  public hosting_tenant_id: string;

  @Column({ type: "text" })
  public basic_prompt: string;

  @Column({ type: "uuid", nullable: true })
  public sector_id: string;

  @Column({ type: "jsonb", default: () => "'{}'" })
  public properties: object;

  @Column({
    type: "enum",
    enum: TanentStatus,
    default: TanentStatus.PENDING_APPROVAL,
  })
  status: TanentStatus;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
