import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { Task } from "./task.schema";

export type TaskSettingsDocument = TaskSettings & Document;

@Schema()
export class TaskSettings {
  @ApiProperty({
    description: "К какому вопросу привязаны настройки",
    required: true,
  })
  @Prop({ type: SchemaTypes.ObjectId, ref: "Task" })
  questionId: string;

  @ApiProperty({
    description: "Награда за решение (РЕЙТИНГ/ЗВЕЗДЫ)",
    required: true,
  })
  @Prop({ type: Number, required: true })
  rating: number;

  @ApiProperty({
    description: "Идентификатор для поиска",
  })
  @Prop()
  search: string;
}

export const TaskSettingsSchema = SchemaFactory.createForClass(TaskSettings);
