import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Trainer } from './trainer.entity';


@Injectable()
export class TrainersService extends TypeOrmCrudService<Trainer>{
    constructor(@InjectRepository(Trainer) repo) {
        super(repo)
    }
}
