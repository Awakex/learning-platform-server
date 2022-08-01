import { forwardRef, Module } from "@nestjs/common";
import { StoriesService } from "./stories.service";
import { StoriesController } from "./stories.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Story, StorySchema } from "../schemas/story.schema";
import { AuthModule } from "../auth/auth.module";
import { Substory, SubstorySchema } from "../schemas/substory.schema";
import {
  SubstoryBlock,
  SubstoryBlockSchema,
} from "../schemas/storyblock.schema";
import { SetsModule } from "../sets/sets.module";

@Module({
  providers: [StoriesService],
  controllers: [StoriesController],
  imports: [
    MongooseModule.forFeature([
      { name: Story.name, schema: StorySchema },
      { name: Substory.name, schema: SubstorySchema },
      { name: SubstoryBlock.name, schema: SubstoryBlockSchema },
    ]),
    SetsModule,
    forwardRef(() => AuthModule),
  ],
})
export class StoriesModule {}
