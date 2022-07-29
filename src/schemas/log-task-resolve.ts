import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { User } from "./user.schema";
import { Answer } from "./answer.schema";

export type LogTaskResolveDocument = LogTaskResolve & Document;

@Schema()
export class LogTaskResolve {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Answer.name })
  taskId: string;

  @Prop({ type: Boolean })
  isResolvedCorrect: boolean;
}

export const LogTaskResolveSchema =
  SchemaFactory.createForClass(LogTaskResolve);
