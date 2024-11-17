import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Clients } from './clients.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @OneToMany(() => Clients, (client) => client.user)
  clients: Clients[]
}