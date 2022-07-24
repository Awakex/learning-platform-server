import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @ApiProperty({ description: "Вопрос для задания", required: false })
  @Prop()
  question: string;

  @ApiProperty({ description: "Тип задания" })
  @Prop()
  type: string;

  @ApiProperty({ description: "Название изображения для вопроса" })
  @Prop()
  image: string;

  @ApiProperty({ description: "Тип ответов" })
  @Prop()
  answersType: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
