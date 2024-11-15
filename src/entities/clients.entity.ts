import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column('datetime', { default: () => 'NOW()' })
  created_at: string;

  @ManyToOne(() => User, (user) => user.clients, {
    cascade: true,
  })
  user: User;
}