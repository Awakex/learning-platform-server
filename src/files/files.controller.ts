import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FilesService } from "./files.service";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../types/Roles";
import { RolesGuard } from "../auth/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Файлы")
@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @ApiOperation({ summary: "Сохранение файла" })
  @ApiResponse({ status: 200, type: String })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor("file"))
  @Post("/")
  createFile(@UploadedFile("file") file) {
    return this.filesService.createFile(file);
  }
}
