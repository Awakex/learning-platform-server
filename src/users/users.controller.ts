import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../../types/Roles";
import { RolesGuard } from "../auth/roles.guard";
import { GiveRoleDto } from "./dto/give-role.dto";
import { User } from "src/schemas/user.schema";
import { ValidationPipe } from "src/pipes/validation.pipe";

@ApiTags("Пользователи")
@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Получение пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Role(Roles.MODERATOR)
  @UseGuards(RolesGuard)
  @Get("/")
  getUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Получение пользователя по ID" })
  @ApiResponse({ status: 200, type: User })
  @Get("/:id")
  getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Post("/")
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Выдать роль" })
  @ApiResponse({ status: 200 })
  @Role(Roles.OWNER)
  @UseGuards(RolesGuard)
  @Post("/role")
  giveRole(@Body() dto: GiveRoleDto) {
    return this.usersService.giveRole(dto);
  }
}