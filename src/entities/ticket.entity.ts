import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Showtime } from './showtime.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Showtime, showtime => showtime.tickets)
  showtime: Showtime;

  @Column()
  seat_number: string;

  @Column()
  customer_name: string;
} 