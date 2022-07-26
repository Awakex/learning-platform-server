import { Module } from "@nestjs/common";
import { RewardService } from "./reward.service";
import { UsersModule } from "../users/users.module";
import { TasksModule } from "../tasks/tasks.module";

@Module({
  providers: [RewardService],
  imports: [UsersModule, TasksModule],
  exports: [RewardService],
})
export class RewardModule {}
