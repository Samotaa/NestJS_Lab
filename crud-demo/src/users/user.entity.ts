import { ApiProperty } from "@nestjs/swagger";
import { userInfo } from "os";
import { Trainer } from "src/trainers/trainer.entity";
import { Column, Entity, JoinColumn, JoinTable,  OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string

    @ApiProperty()
    @Column()
    @OneToOne( () => Trainer, trainer => trainer.id)

    @JoinColumn()
    trainer: number

}