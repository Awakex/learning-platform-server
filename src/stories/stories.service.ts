import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Story, StoryDocument } from "../schemas/story.schema";
import { Model } from "mongoose";
import { CreateStoryDto } from "./dto/create-story.dto";
import { CreateSubstoryDto } from "./dto/create-substory.dto";
import { Substory, SubstoryDocument } from "../schemas/substory.schema";
import {
  SubstoryBlock,
  SubstoryBlockDocument,
} from "../schemas/storyblock.schema";

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    @InjectModel(Substory.name) private substoryModel: Model<SubstoryDocument>,
    @InjectModel(SubstoryBlock.name)
    private substoryBlockModel: Model<SubstoryBlockDocument>
  ) {}

  async createStory(dto: CreateStoryDto): Promise<Story> {
    try {
      let createdStory = new this.storyModel(dto);
      return createdStory.save();
    } catch (e) {
      throw new HttpException(
        "Ошибка сохранения",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getStories(): Promise<Story[]> {
    return this.storyModel.find();
  }

  async getStory(storyId: string): Promise<Story> {
    return this.storyModel.findById(storyId);
  }

  async updateStory(storyId: string, dto: CreateStoryDto): Promise<Story> {
    let story = await this.storyModel.findById(storyId);

    if (!story) {
      throw new HttpException("Не найден сюжет", HttpStatus.NOT_FOUND);
    }

    if (dto.name) {
      story.name = dto.name;
    }

    return story.save();
  }

  async attachSubstory(
    storyId: string,
    dto: CreateSubstoryDto,
    substoryBlockId: string
  ): Promise<Story> {
    let story = await this.storyModel.findById(storyId);

    if (!story) {
      throw new HttpException("Не найден сюжет", HttpStatus.NOT_FOUND);
    }

    let substoryBlock;

    if (substoryBlockId) {
      substoryBlock = await this.substoryBlockModel.findById(substoryBlockId);
    } else {
      substoryBlock = await new this.substoryBlockModel().save();
      let newSubstoryBlockId = substoryBlock._id.toString();

      if (!story.storyMap) {
        story.storyMap = [newSubstoryBlockId];
      } else {
        story.storyMap.push(newSubstoryBlockId);
      }
    }

    let substory = await new this.substoryModel(dto).save();
    substoryBlock.substory.push(substory._id.toString());
    await substoryBlock.save();

    return story.save().then((t) =>
      t.populate({
        path: "storyMap",
        populate: {
          path: "substoryblock",
          model: SubstoryBlock.name,
          strictPopulate: false,
        },
      })
    );
  }
}
