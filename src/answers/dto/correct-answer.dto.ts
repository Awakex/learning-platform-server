import { ApiProperty } from "@nestjs/swagger";

export class CorrectAnswerDto {
  @ApiProperty({
    example: "['213', '425']",
    description: "Ответы(массив)",
    required: true,
  })
  answers: string;
}
