import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { SubstoryBlock } from "./storyblock.schema";

export type StoryDocument = Story & Document;

@Schema()
export class Story {
  @ApiProperty({
    example: "Приключение для 1 класса",
    description: "Название сюжета",
  })
  @Prop()
  name: string;

  @ApiProperty({ description: "Подсюжеты" })
  @Prop({ type: [SchemaTypes.ObjectId], ref: SubstoryBlock.name })
  storyMap: string[];
}

export const StorySchema = SchemaFactory.createForClass(Story);
