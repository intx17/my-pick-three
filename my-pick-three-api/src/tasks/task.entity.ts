import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsDefined, IsString } from 'class-validator'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsDefined({ always: true })
  @IsString({ always: true})
  name: string;
}