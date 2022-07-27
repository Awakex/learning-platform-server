import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, RolesDocument } from "../schemas/role.schema";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RolesDocument>
  ) {}

  async initialRoles() {
    let roles = await this.roleModel.find().exec();
    if (roles.length) return "Роли уже проинициализированны";

    let guestRole: Role = {
      value: "GUEST",
      description: "Гость",
    };

    let moderatorRole: Role = {
      value: "MODERATOR",
      description: "Модератор",
    };

    let adminRole: Role = {
      value: "ADMIN",
      description: "Администратор",
    };

    let userRole: Role = {
      value: "USER",
      description: "Пользователь",
    };

    let ownerRole: Role = {
      value: "OWNER",
      description: "Владелец",
    };

    let rolesForSave = [
      guestRole,
      userRole,
      moderatorRole,
      adminRole,
      ownerRole,
    ];

    return this.roleModel.insertMany(rolesForSave);
  }

  async getRoles() {
    return this.roleModel.find().exec();
  }

  async getRoleByValue(value: string) {
    const role = await this.roleModel.findOne({ value });
    return role;
  }
}
