import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum users_status {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
}

export enum users_role {
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  PLATFORM_READER = "PLATFORM_READER",
  SECTOR_ADMIN = "SECTOR_ADMIN",
  SECTOR_MANAGER = "SECTOR_MANAGER",
  SECTOR_READER = "SECTOR_READER",
  TANENT_MANAGER = "TANENT_MANAGER",
  TANENT_READER = "TANENT_READER",
  TANENT_USER = "TANENT_USER",
  TANENT_CLIENT = "TANENT_CLIENT",
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120 })
  public first_name!: string;

  @Column({ type: "varchar", length: 120 })
  public last_name!: string;

  @Column({ type: "varchar", length: 120 })
  public email!: string;

  @Column({ type: "boolean", default: false })
  public email_verified!: boolean;

  @Column({ type: "varchar", length: 120 })
  public phone!: string;

  @Column({ type: "boolean", default: false })
  public phone_verified!: boolean;

  @Column({ type: "varchar", length: 120 })
  public password!: string;

  @Column({ type: "enum", enum: users_role, default: users_role.TANENT_USER })
  public role!: string;

  @Column({ type: "varchar", length: 120 })
  public avatar!: string;

  @Column({ type: "json", default: "{}" })
  public metadata!: string;

  @Column({
    type: "enum",
    enum: users_status,
    default: users_status.PENDING_APPROVAL,
  })
  public status!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  public updatedAt!: Date;
}
