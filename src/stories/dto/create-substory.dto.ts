import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { SubstoryBlockType } from "../../types/SubstoryBlockType";

export class CreateSubstoryDto {
  @ApiProperty({
    description: "Тип подсюжета",
  })
  @IsString({ message: "Должно быть строкой" })
  type: SubstoryBlockType;

  @ApiProperty({
    description: "Контент",
  })
  @IsString({ message: "Должно быть строкой" })
  content: string;
}
