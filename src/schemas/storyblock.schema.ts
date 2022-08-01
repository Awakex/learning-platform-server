import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SubstoryBlockType } from "../types/SubstoryBlockType";
import { SchemaTypes } from "mongoose";
import { Substory } from "./substory.schema";

export type SubstoryBlockDocument = SubstoryBlock & Document;

@Schema()
export class SubstoryBlock {
  @ApiProperty({ description: "Контент" })
  @Prop({ type: [SchemaTypes.ObjectId], ref: Substory.name })
  substory: string[];
}

export const SubstoryBlockSchema = SchemaFactory.createForClass(SubstoryBlock);
