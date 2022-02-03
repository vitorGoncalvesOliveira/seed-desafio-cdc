import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { IsDate, Length, Min } from 'class-validator';

import { Category } from '../../categories/categoty.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  titulo: string;

  @Column()
  sumario: string;

  @Column()
  @Length(1, 500)
  resume: string;

  @Column()
  @Min(20)
  preco: number;

  @Column({ unique: true })
  isbn: string;

  @Column()
  @Min(100)
  page: number;

  @IsDate()
  @Column()
  data_publicacao: Date;

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
