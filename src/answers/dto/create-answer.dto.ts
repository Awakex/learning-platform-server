import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAnswerDto {
  @ApiProperty({
    example: "Ответ на вопрос",
    description: "Контент ответа",
    required: true,
  })
  @IsString({ message: "Должно быть строкой" })
  content: string;
}
