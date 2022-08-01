import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SubstoryBlockType } from "../types/SubstoryBlockType";
import { SchemaTypes } from "mongoose";
import { Set } from "./set.schema";

export type SubstoryDocument = Substory & Document;

@Schema()
export class Substory {
  @ApiProperty({
    description: "Тип подсюжета",
  })
  @Prop()
  type: SubstoryBlockType;

  @ApiProperty({ description: "Контент" })
  @Prop()
  content: string;

  @ApiProperty({ description: "Иконка" })
  @Prop()
  icon: string;

  @ApiProperty({ description: "Комплект" })
  @Prop({ type: SchemaTypes.ObjectId, ref: Set.name })
  set: string;
}

export const SubstorySchema = SchemaFactory.createForClass(Substory);
