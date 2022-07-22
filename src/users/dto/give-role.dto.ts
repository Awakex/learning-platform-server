import { ApiProperty } from "@nestjs/swagger";

export class GiveRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Название роли" })
  readonly role: string;

  @ApiProperty({ example: "test", description: "ID пользователя" })
  readonly userId: string;
}
