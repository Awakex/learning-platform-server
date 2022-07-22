import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "test@gmail.com", description: "Почта пользователя" })
  email: string;

  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  password: string;
}
