import { ModelOptions, Prop } from "@typegoose/typegoose";

import { ClassBase } from "./class-base";

@ModelOptions({})
export class User extends ClassBase {
  @Prop({ required: true, unique: true })
  public address!: string;

  @Prop({ required: true, unique: true })
  public username!: string;
}
