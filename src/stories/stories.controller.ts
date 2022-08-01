import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { StoriesService } from "./stories.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../types/Roles";
import { RolesGuard } from "../auth/roles.guard";

import { CreateStoryDto } from "./dto/create-story.dto";
import { Story } from "../schemas/story.schema";
import { CreateSubstoryDto } from "./dto/create-substory.dto";

@ApiTags("Сюжеты")
@Controller("stories")
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @ApiOperation({ summary: "Создание сюжета" })
  @ApiResponse({ status: 200, type: Story })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post("/")
  createStory(@Body() dto: CreateStoryDto) {
    return this.storiesService.createStory(dto);
  }

  @ApiOperation({ summary: "Список сюжетов" })
  @ApiResponse({ status: 200, type: [Story] })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/")
  getStories() {
    return this.storiesService.getStories();
  }

  @ApiOperation({ summary: "Получить сюжет" })
  @ApiResponse({ status: 200, type: Story })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/:id")
  getStory(@Param("id") storyId: string) {
    return this.storiesService.getStory(storyId);
  }

  @ApiOperation({ summary: "Обновить сюжет" })
  @ApiResponse({ status: 200, type: Story })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Put("/:id")
  updateStory(@Param("id") storyId: string, @Body() dto: CreateStoryDto) {
    return this.storiesService.updateStory(storyId, dto);
  }

  @ApiOperation({ summary: "Добавить подсюжета" })
  @ApiResponse({ status: 200, type: Story })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: "substoryBlock",
    type: String,
    required: false,
  })
  @Put("/:id/substory")
  attachSubstory(
    @Param("id") storyId: string,

    @Body() dto: CreateSubstoryDto,
    @Query("substoryBlock") substoryBlockId?: string
  ) {
    return this.storiesService.attachSubstory(storyId, dto, substoryBlockId);
  }
}
