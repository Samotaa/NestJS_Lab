import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from 'src/users/user.entity';
import { Trainer } from './trainer.entity';
import { TrainersService } from './trainers.service';



@Crud({
    model:{
        type: Trainer
    }
})


@ApiTags('Trainers')

@Controller('trainers')

export class TrainersController implements CrudController<Trainer> {
    constructor(public service: TrainersService){}
}
