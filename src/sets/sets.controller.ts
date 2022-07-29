import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { SetsService } from "./sets.service";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../types/Roles";
import { RolesGuard } from "../auth/roles.guard";
import { Set } from "../schemas/set.schema";
import { CreateSetDto } from "./dto/create-set.dto";
import { AttachRewardDto } from "./dto/attach-reward.dto";

@ApiTags("Комплекты")
@Controller("sets")
export class SetsController {
  constructor(private setsService: SetsService) {}

  @ApiOperation({ summary: "Создание комплекта" })
  @ApiResponse({ status: 200, type: Set })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post("/create")
  createSet(@Body() dto: CreateSetDto) {
    return this.setsService.createSet(dto);
  }

  @ApiOperation({ summary: "Получить все комплекты" })
  @ApiResponse({ status: 200, type: Set })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/")
  getSets() {
    return this.setsService.getSets();
  }

  @ApiOperation({ summary: "Получить комплект по ID" })
  @ApiResponse({ status: 200, type: Set })
  @Role(Roles.USER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/:id")
  getSet(@Param("id") setId: string) {
    return this.setsService.getSetById(setId);
  }

  @ApiOperation({ summary: "Обновить комплект по ID" })
  @ApiResponse({ status: 200, type: Set })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Put("/:id")
  updateSet(@Param("id") setId: string, @Body() dto: CreateSetDto) {
    return this.setsService.updateSetById(setId, dto);
  }

  @ApiOperation({ summary: "Прикрепить награды" })
  @ApiResponse({ status: 200, type: Set })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Put("/:id/attach-reward")
  attachRewardToSet(
    @Param("id") setId: string,
    @Body() dto: { item: string; dropRate: number }
  ) {
    return this.setsService.attachRewardToSet(setId, dto);
  }
}
