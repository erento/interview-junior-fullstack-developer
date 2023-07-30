import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop()
  cityName: string;

  @Prop()
  count: number;

  @Prop()
  uuid: string;
}

export const CitySchema = SchemaFactory.createForClass(City);