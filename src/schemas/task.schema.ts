import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { TaskSettings } from "./task-settings.schema";

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

  @ApiProperty({ description: "Тип ответов" })
  @Prop({ type: SchemaTypes.ObjectId, ref: "TaskSettings" })
  settings: TaskSettings;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
