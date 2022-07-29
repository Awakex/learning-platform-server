import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { User } from "../schemas/user.schema";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);

    return {
      token,
      user,
    };
  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByMail(
      createUserDto.email
    );
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });

    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  private async generateToken(user: User) {
    const payload = { user: user };
    const token = await this.jwtService.sign(payload);
    return token;
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.getUserByMail(loginDto.email);

    if (!user) {
      throw new HttpException(
        "Некорректный email или пароль",
        HttpStatus.NOT_FOUND
      );
    }

    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new HttpException(
      "Некорректный email или пароль",
      HttpStatus.NOT_FOUND
    );
  }
}
