import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from './showtime.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  duration: number; // in minutes

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number; // 9.0, 9.5

  @Column()
  release_year: number;

  @OneToMany(() => Showtime, showtime => showtime.movie)
  showtimes: Showtime[];
} 