import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes } from "mongoose";
import { User } from "./user.schema";
import { Item } from "./item.schema";

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {
  @ApiProperty({ description: "Владелец" })
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @ApiProperty({ description: "Инвентарь" })
  @Prop({ type: [SchemaTypes.ObjectId], ref: Item.name })
  inventory: string[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
