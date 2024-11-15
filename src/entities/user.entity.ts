import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Clients } from './clients.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  password: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @OneToMany(() => Clients, (client) => client.user)
  clients: Clients[];
}