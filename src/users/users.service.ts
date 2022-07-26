import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { GiveRoleDto } from "./dto/give-role.dto";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const role = await this.rolesService.getRoleByValue("USER");
    await createdUser.$set("role", role);

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, {}, {}).exec();
  }

  async getUserByMail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updatedUserRating(userId: string, rating: number) {
    let user = await this.getUserById(userId);
    user.rating = user.rating ? user.rating + rating : rating;
    try {
      return user.save();
    } catch (e) {
      throw new HttpException(
        "Ошибка сохранения рейтинга",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async giveRole(dto: GiveRoleDto) {
    if (!dto.userId || !dto.role) {
      throw new HttpException(
        "Не указан ID пользователя или нет роли",
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await this.userModel.findOne({ _id: dto.userId });

    if (!user) {
      throw new HttpException(
        "Пользователь с данным ID не найден",
        HttpStatus.NOT_FOUND
      );
    }

    const role = await this.rolesService.getRoleByValue(dto.role);

    if (!role) {
      throw new HttpException("Такой роли нет", HttpStatus.NOT_FOUND);
    }

    user.role = role;
    await user.save();
  }
}
