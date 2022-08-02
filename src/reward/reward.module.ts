import { Module } from "@nestjs/common";
import { RewardService } from "./reward.service";
import { UsersModule } from "../users/users.module";
import { TasksModule } from "../tasks/tasks.module";
import { SetsModule } from "../sets/sets.module";
import { InventoryModule } from "../inventory/inventory.module";

@Module({
  providers: [RewardService],
  imports: [UsersModule, TasksModule, SetsModule, InventoryModule],
  exports: [RewardService],
})
export class RewardModule {}
