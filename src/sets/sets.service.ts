import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Sets, SetsDocument } from "src/schemas/sets.schema";
import { CreateSetDto } from "./dto/create-set.dto";

@Injectable()
export class SetsService {
  constructor(@InjectModel(Sets.name) private setsModel: Model<SetsDocument>) {}

  async createSet(dto: CreateSetDto): Promise<Sets> {
    try {
      let createdSet = new this.setsModel(dto);
      return createdSet.save();
    } catch (e) {
      throw new HttpException(
        "Ошибка сохранения",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getSets(): Promise<Sets[]> {
    return this.setsModel.find();
  }

  async getSetById(setId: string): Promise<Sets> {
    let set = await this.setsModel.findById(setId);

    if (!set) {
      throw new HttpException("Комплект не найден", HttpStatus.NOT_FOUND);
    }

    return set;
  }

  async updateSetById(setId: string, dto: CreateSetDto): Promise<Sets> {
    let set = await this.setsModel.findById(setId);

    if (!set) {
      throw new HttpException("Комплект не найден", HttpStatus.NOT_FOUND);
    }

    if (dto.tasks) {
      set.tasks = dto.tasks;
    }

    if (dto.title) {
      set.title = dto.title;
    }

    return set.save();
  }
}
