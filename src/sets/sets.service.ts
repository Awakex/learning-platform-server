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
}
