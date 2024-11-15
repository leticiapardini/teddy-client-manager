import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Client } from './clients.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  password: string;

  @Column('datetime', { default: () => 'NOW()' })
  created_at: string;
  
  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];
}