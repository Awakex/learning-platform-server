import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Item, ItemDocument } from "../schemas/item.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async createItem(dto: Item): Promise<Item> {
    let createdItem = new this.itemModel(dto);
    return createdItem.save();
  }

  async getItems(): Promise<Item[]> {
    return this.itemModel.find();
  }

  async getItem(itemId: string): Promise<Item> {
    return this.itemModel.findById(itemId);
  }

  async editItem(itemId: string, dto: Item): Promise<Item> {
    let item = await this.itemModel.findById(itemId);
    if (!item) {
      throw new HttpException("Предмет не найден", HttpStatus.NOT_FOUND);
    }

    if (dto.name) {
      item.name = dto.name;
    }

    if (dto.rarity) {
      item.rarity = dto.rarity;
    }

    if (dto.type) {
      item.type = dto.type;
    }

    return item.save();
  }
}
