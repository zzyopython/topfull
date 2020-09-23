import { Controller } from '@nestjs/common';
import { User } from 'libs/db/modules/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  // 在当前的控制器中，使用@InjectModel的方式注入模型User，(User为模型类)
  constructor(@InjectModel(User) private readonly model) {}
}
