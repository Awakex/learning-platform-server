import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export class CreateTaskDto {
  @ApiProperty({ example: "ClassicTask", description: "Тип задания" })
  @IsString({ message: "Должно быть строкой" })
  type: "ClassicTask" | "OrderTask";

  @ApiProperty({ description: "Вопрос для задания", required: false })
  @Prop()
  question: string;
}
