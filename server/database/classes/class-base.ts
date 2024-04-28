import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface ClassBase extends Base {}

export class ClassBase extends TimeStamps {}
