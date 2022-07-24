import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { Task } from "./task.schema";

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @ApiProperty({ description: "Контент ответа", required: true })
  @Prop()
  content: string;

  @ApiProperty({
    description: "К какому вопросу привязан этот ответ",
    required: true,
  })
  @Prop({ type: SchemaTypes.ObjectId, ref: Task.name })
  questionId: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
