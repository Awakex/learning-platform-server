import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { Task } from "./task.schema";
import { Item } from "./item.schema";

export type SetsDocument = Set & Document;

@Schema()
export class Set {
  @ApiProperty({ description: "Задания" })
  @Prop({ type: [SchemaTypes.ObjectId], ref: Task.name })
  tasks: string[];

  @ApiProperty({ description: "Название" })
  @Prop({ type: String, required: true })
  title: string;

  @ApiProperty({ description: "Награды" })
  @Prop({
    type: [
      {
        item: { type: SchemaTypes.ObjectId, ref: Item.name },
        dropRate: { type: Number },
      },
    ],
  })
  rewards: { item: string; dropRate: number }[];
}

export const SetSchema = SchemaFactory.createForClass(Set);
