import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { FilesService } from "./files/files.service";
import { FilesModule } from "./files/files.module";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AnswersModule } from './answers/answers.module';
import * as path from "path";

@Module({
  controllers: [TasksController],
  providers: [FilesService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    TasksModule,
    AnswersModule,
  ],
})
export class AppModule {}
