import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AnswersService } from "./answers.service";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../types/Roles";
import { RolesGuard } from "../auth/roles.guard";
import { Answer } from "../schemas/answer.schema";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { CorrectAnswerDto } from "./dto/correct-answer.dto";
import { CorrectAnswer } from "../schemas/correct-answer.schema";
import { IRequestWithAuth } from "../types/IRequestWithAuth";

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

  @ApiOperation({ summary: "Получить ответы к вопросу" })
  @ApiResponse({ status: 200, type: [Answer] })
  @Get("/:questionId/")
  getAnswersByQuestionId(@Param("questionId") questionId: string) {
    return this.answersService.getAnswersByQuestionId(questionId);
  }

  @ApiOperation({ summary: "Сохранение правильных ответов" })
  @ApiResponse({ status: 200, type: CorrectAnswer })
  @Post("/:questionId/correct-answers")
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  saveCorrectAnswers(
    @Param("questionId") questionId: string,
    @Body() dto: CorrectAnswerDto
  ) {
    return this.answersService.saveCorrectAnswers(questionId, dto);
  }

  @ApiOperation({ summary: "Проверка ответа" })
  @ApiResponse({ status: 200, type: Boolean })
  @Post("/:questionId/check-correct-answers")
  @Role(Roles.USER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  checkCorrectAnswers(
    @Param("questionId") questionId: string,
    @Body() dto: CorrectAnswerDto,
    @Req() req: IRequestWithAuth,
    @Query("setId") setId: string
  ) {
    return this.answersService.checkCorrectAnswers(questionId, dto, req, setId);
  }
}
