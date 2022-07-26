import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "./role.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: "Nickname", description: "Никнейм пользователя" })
  @Prop()
  nickname: string;

  @ApiProperty({ example: "18", description: "Возраст пользователя" })
  @Prop()
  age: number;

  @ApiProperty({ example: "test@gmail.com", description: "Почта пользователя" })
  @Prop()
  email: string;

  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  @Prop()
  password: string;

  @ApiProperty({ example: "firstName", description: "Имя пользователя" })
  @Prop()
  firstName: string;

  @ApiProperty({ example: "lastName", description: "Фамилия пользователя" })
  @Prop()
  lastName: string;

  @Prop()
  rating: number;

  @Prop({ type: Role, ref: "Role" })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
