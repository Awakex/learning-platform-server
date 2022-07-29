import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateSetDto } from "./dto/create-set.dto";
import { Set, SetsDocument } from "../schemas/set.schema";
import { Item } from "../schemas/item.schema";

@Injectable()
export class SetsService {
  constructor(@InjectModel(Set.name) private setsModel: Model<SetsDocument>) {}

  async createSet(dto: CreateSetDto): Promise<Set> {
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

  async getSets(): Promise<Set[]> {
    return this.setsModel.find().populate({
      path: "rewards",
      populate: {
        path: "item",
        model: Item.name,
      },
    });
  }

  async getSetById(setId: string, withPopulate: boolean = true): Promise<Set> {
    let set = await this.setsModel.findById(setId);

    if (!set) {
      throw new HttpException("Комплект не найден", HttpStatus.NOT_FOUND);
    }

    if (withPopulate) {
      await set.populate({
        path: "rewards",
        populate: {
          path: "item",
          model: Item.name,
        },
      });
    }

    return set;
  }

  async updateSetById(setId: string, dto: CreateSetDto): Promise<Set> {
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

  async attachRewardToSet(
    setId: string,
    dto: { item: string; dropRate: number }
  ) {
    let set = await this.setsModel.findById(setId);

    if (set) {
      set.rewards.push(dto);
    }

    return set.save().then((t) =>
      t.populate({
        path: "rewards",
        populate: {
          path: "item",
          model: Item.name,
        },
      })
    );
  }
}
