import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsString } from 'class-validator';
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsDefined({ always: true })
  @IsString({ always: true})
  username: string;

  @Column()
  @IsDefined({ always: true })
  @IsString({ always: true})
  @Exclude()
  password: string;
}