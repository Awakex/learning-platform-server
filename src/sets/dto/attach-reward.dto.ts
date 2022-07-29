import { ApiProperty } from "@nestjs/swagger";
import { Prop } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

export class AttachRewardDto {
  @ApiProperty({ description: "Награда" })
  @Prop()
  reward: { item: string; dropRate: number };
}
