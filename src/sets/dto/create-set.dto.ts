import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSetDto {
  @ApiProperty({
    example: "Комплект для приключений",
    description: "Название комплекта",
  })
  @IsString({ message: "Должно быть строкой" })
  title: string;

  @ApiProperty({
    example: ["test", "question"],
    description: "ID Заданий",
  })
  tasks: string[];
}
