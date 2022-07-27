import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { Task } from "./task.schema";

export type SetsDocument = Sets & Document;

@Schema()
export class Sets {
  @ApiProperty({ description: "Задания" })
  @Prop({ type: [SchemaTypes.ObjectId], ref: Task.name })
  tasks: string[];

  @Prop({ type: String, required: true })
  title: string;
}

export const SetsSchema = SchemaFactory.createForClass(Sets);
