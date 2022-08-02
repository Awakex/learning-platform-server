import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Inventory, InventoryDocument } from "../schemas/inventory.schema";
import { Model } from "mongoose";

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>
  ) {}

  async getUserInventory(userId: string): Promise<Inventory> {
    let inventory = await this.inventoryModel.findOne({ userId });
    return inventory;
  }

  async addItemToInventory(userId: string, itemId: string) {
    let inventory = await this.inventoryModel.findOne({ userId });

    if (!inventory) {
      inventory = await new this.inventoryModel({
        userId,
        inventory: [],
      }).save();
    }

    inventory.inventory.push(itemId);

    return inventory.save();
  }
}
