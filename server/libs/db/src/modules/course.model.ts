import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiProperty({ description: '课程名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '封面' })
  @prop()
  cover: string;

  @prop({ ref: 'Episode' })
  // Ref是参考，参考泛型<>中的类型
  episodes: Ref<Episode>[];
}
