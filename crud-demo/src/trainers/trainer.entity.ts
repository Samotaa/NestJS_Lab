import { ApiHeader, ApiProduces } from "@nestjs/swagger";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";


@Entity()
export class Trainer {
    
    @PrimaryGeneratedColumn()
    id: number;
    

    @ApiProperty()
    @Column()
    firstName: string

    @ApiProperty()  
    @Column()
    lastName: string


    @OneToOne( () => User, user => user.trainer)
    users: User
}