import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Story, StoryDocument } from "../schemas/story.schema";
import { Model, Schema } from "mongoose";
import { CreateStoryDto } from "./dto/create-story.dto";
import { CreateSubstoryDto } from "./dto/create-substory.dto";
import { Substory, SubstoryDocument } from "../schemas/substory.schema";
import {
  SubstoryBlock,
  SubstoryBlockDocument,
} from "../schemas/storyblock.schema";
import { SetsService } from "../sets/sets.service";

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    @InjectModel(Substory.name) private substoryModel: Model<SubstoryDocument>,
    @InjectModel(SubstoryBlock.name)
    private substoryBlockModel: Model<SubstoryBlockDocument>,
    private setsService: SetsService
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
    return this.storyModel.find().populate({
      path: "storyMap",
      populate: [
        {
          path: "substoryblock",
          model: SubstoryBlock.name,
          strictPopulate: false,
        },
        {
          path: "substory",
          model: Substory.name,
          strictPopulate: false,
        },
      ],
    });
  }

  async getStory(storyId: string): Promise<Story> {
    return this.storyModel.findById(storyId).populate({
      path: "storyMap",
      populate: [
        {
          path: "substoryblock",
          model: SubstoryBlock.name,
          strictPopulate: false,
        },
        {
          path: "substory",
          model: Substory.name,
          strictPopulate: false,
        },
      ],
    });
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

  async updateSubstory(
    substoryId: string,
    dto: CreateSubstoryDto
  ): Promise<Substory> {
    let substory = await this.substoryModel.findById(substoryId);

    if (!substory) {
      throw new HttpException("Не найден подсюжет", HttpStatus.NOT_FOUND);
    }

    if (dto.content) {
      substory.content = dto.content;
    }

    if (dto.icon) {
      substory.icon = dto.icon;
    }

    if (dto.type) {
      substory.type = dto.type;
    }

    if (dto.setId) {
      let set = await this.setsService.getSetById(dto.setId);
      // @ts-ignore
      substory.set = set._id;
    }

    return substory.save();
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
        populate: [
          {
            path: "substoryblock",
            model: SubstoryBlock.name,
            strictPopulate: false,
          },
          {
            path: "substory",
            model: Substory.name,
            strictPopulate: false,
          },
        ],
      })
    );
  }
}
