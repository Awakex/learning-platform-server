import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Prop } from "@nestjs/mongoose";
import { ItemRarity } from "../../types/ItemRarity";
import { ItemType } from "../../types/ItemType";

export class ItemDto {
  @ApiProperty({ example: "Золотая ручка", description: "Название предмета" })
  @IsString({ message: "Должно быть строкой" })
  name: string;

  @ApiProperty({ example: 1, description: "Редкость предмета" })
  @Prop()
  rarity: ItemRarity;

  @ApiProperty({ example: 1, description: "Тип предмета" })
  @Prop()
  type: ItemType;
}
