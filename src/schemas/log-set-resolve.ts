import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Set } from "./set.schema";
import { User } from "./user.schema";
import { Answer } from "./answer.schema";

export type LogSetResolveDocument = LogSetResolve & Document;

@Schema()
export class LogSetResolve {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Set.name })
  setId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Answer.name })
  taskId: string;

  @Prop({ type: Boolean })
  isResolvedCorrect: boolean;
}

export const LogSetResolveSchema = SchemaFactory.createForClass(LogSetResolve);
