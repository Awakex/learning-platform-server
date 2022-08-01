import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SubstoryBlockType } from "../types/SubstoryBlockType";

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
}

export const SubstorySchema = SchemaFactory.createForClass(Substory);
