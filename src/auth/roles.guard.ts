import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";
import { Roles } from "../types/Roles";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRole) {
        return true;
      }

      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }

      const decodedToken = this.jwtService.verify(token);

      const { user } = decodedToken;

      req.user = user;

      if (Roles[user.role?.value] >= requiredRole) {
        return true;
      } else {
        throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
      }
    } catch (e) {
      throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
    }
  }
}
