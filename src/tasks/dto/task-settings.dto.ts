import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export class TaskSettingsDto {
  @ApiProperty({ example: "1", description: "Кол-во рейтинга за задание" })
  @IsString({ message: "Должно быть строкой" })
  @Prop()
  rating: number;

  @ApiProperty({
    example: "SH1",
    description: "Идентификатор для помощи в поиске",
  })
  @IsString({ message: "Должно быть строкой" })
  @Prop()
  search: string;
}
