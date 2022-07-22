import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [FilesService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
