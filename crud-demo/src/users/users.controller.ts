import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Crud({
    model: {
        type: User
    }
})

@ApiTags('Users')
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}
}
