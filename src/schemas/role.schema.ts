import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type RolesDocument = Role & Document;

@Schema()
export class Role {
  @ApiProperty({ example: "ADMIN", description: "Значение роли" })
  @Prop({ unique: true, required: true })
  value: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
