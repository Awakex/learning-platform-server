import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RolesService } from "./roles.service";
import { Role } from "../schemas/role.schema";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: "Получение всех ролей" })
  @ApiResponse({ status: 200, type: [Role] })
  @Get("/")
  getRoles() {
    return this.rolesService.getRoles();
  }

  @ApiOperation({ summary: "Инициализация ролей" })
  @ApiResponse({ status: 200, type: [Role] })
  @Post("/initial")
  initialRoles() {
    return this.rolesService.initialRoles();
  }

  @ApiOperation({ summary: "Получить роль по названию" })
  @ApiResponse({ status: 200, type: Role })
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
