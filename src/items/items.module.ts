import { forwardRef, Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Item, ItemSchema } from "../schemas/item.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [ItemsService],
})
export class ItemsModule {}
