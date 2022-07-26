import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { Task } from "./task.schema";

export type CorrectAnswerDocument = CorrectAnswer & Document;

@Schema()
export class CorrectAnswer {
  @ApiProperty({ description: "Массив ответов", required: true })
  @Prop()
  answers: string;

  @ApiProperty({
    description: "К какому вопросу привязаны ответы",
    required: true,
  })
  @Prop({ type: SchemaTypes.ObjectId, ref: Task.name })
  questionId: string;
}

export const CorrectAnswerSchema = SchemaFactory.createForClass(CorrectAnswer);
