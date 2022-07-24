import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AnswersService } from "./answers.service";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../../types/Roles";
import { RolesGuard } from "../auth/roles.guard";
import { Answer } from "../schemas/answer.schema";
import { CreateAnswerDto } from "./dto/create-answer.dto";

@ApiTags("Ответы")
@Controller("answers")
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @ApiOperation({ summary: "Создание ответа" })
  @ApiResponse({ status: 200, type: Answer })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post("/:questionId/create")
  createTask(
    @Param("questionId") questionId: string,
    @Body() dto: CreateAnswerDto
  ) {
    return this.answersService.createAnswer(questionId, dto);
  }
}
