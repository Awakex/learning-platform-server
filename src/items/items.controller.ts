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
import { ItemsService } from "./items.service";
import { Item } from "../schemas/item.schema";
import { ItemDto } from "./dto/item.dto";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../types/Roles";
import { RolesGuard } from "../auth/roles.guard";

@ApiTags("Предметы")
@Controller("items")
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({ summary: "Создание предмета" })
  @ApiResponse({ status: 200, type: Item })
  @Role(Roles.OWNER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post("/")
  createItem(@Body() dto: ItemDto) {
    return this.itemsService.createItem(dto);
  }

  @ApiOperation({ summary: "Все предметы" })
  @ApiResponse({ status: 200, type: [Item] })
  @Role(Roles.OWNER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/")
  getItems() {
    return this.itemsService.getItems();
  }

  @ApiOperation({ summary: "Получить предмет" })
  @ApiResponse({ status: 200, type: Item })
  @Role(Roles.OWNER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/:id")
  getItem(@Param("id") itemId: string) {
    return this.itemsService.getItem(itemId);
  }

  @ApiOperation({ summary: "Редактировать предмет" })
  @ApiResponse({ status: 200, type: Item })
  @Role(Roles.OWNER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Put("/:id")
  editItem(@Param("id") itemId: string, @Body() dto: ItemDto) {
    return this.itemsService.editItem(itemId, dto);
  }
}
