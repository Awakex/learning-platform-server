import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStoryDto {
  @ApiProperty({
    example: "Приключение для 1 класса",
    description: "Название сюжета",
  })
  @IsString({ message: "Должно быть строкой" })
  name: string;
}
