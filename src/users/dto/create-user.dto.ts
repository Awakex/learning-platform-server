import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Nickname", description: "Никнейм пользователя" })
  @IsString({ message: "Должно быть строкой" })
  nickname: string;

  @ApiProperty({ example: "18", description: "Возраст пользователя" })
  age: number;

  @ApiProperty({ example: "firstName", description: "Имя пользователя" })
  firstName: string;

  @ApiProperty({ example: "lastName", description: "Фамилия пользователя" })
  lastName: string;

  @ApiProperty({ example: "test@gmail.com", description: "Почта пользователя" })
  @IsEmail({}, { message: "Некорректный email" })
  email: string;

  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не меньше 4 и не больше 16 символов" })
  password: string;
}
