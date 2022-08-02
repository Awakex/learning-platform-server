import { Module } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { InventoryController } from "./inventory.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Inventory, InventorySchema } from "../schemas/inventory.schema";

@Module({
  providers: [InventoryService],
  controllers: [InventoryController],
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
