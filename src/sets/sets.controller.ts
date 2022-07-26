import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { SetsService } from "./sets.service";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../../types/Roles";
import { RolesGuard } from "../auth/roles.guard";
import { Sets } from "../schemas/sets.schema";
import { CreateSetDto } from "./dto/create-set.dto";

@ApiTags("Комплекты")
@Controller("sets")
export class SetsController {
  constructor(private setsService: SetsService) {}

  @ApiOperation({ summary: "Создание комплекта" })
  @ApiResponse({ status: 200, type: Sets })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post("/create")
  createSet(@Body() dto: CreateSetDto) {
    return this.setsService.createSet(dto);
  }

  @ApiOperation({ summary: "Получить все комплекты" })
  @ApiResponse({ status: 200, type: Sets })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/")
  getSets() {
    return this.setsService.getSets();
  }
}
