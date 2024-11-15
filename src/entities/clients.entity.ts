import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  wage: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @ManyToOne(() => User, (user) => user.clients, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;
}