import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { Controller, Get } from '@nestjs/common';
import { Course } from 'libs/db/modules/course.model';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  option() {
    return {
      title: '课程管理',
      column: [
        { prop: 'name', label: '课程名称' },
        { prop: 'cover', label: '课程封面图' },
      ],
    };
  }
}
