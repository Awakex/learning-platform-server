import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { ItemRarity } from "../types/ItemRarity";
import { ItemType } from "../types/ItemType";

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @ApiProperty({ example: "Золотая ручка", description: "Название предмета" })
  @Prop()
  name: string;

  @ApiProperty({ example: "1", description: "Редкость предмета" })
  @Prop()
  rarity: ItemRarity;

  @ApiProperty({ example: "1", description: "Тип предмета" })
  @Prop()
  type: ItemType;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
