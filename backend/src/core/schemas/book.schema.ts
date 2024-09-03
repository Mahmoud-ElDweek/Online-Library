import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
 

 

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  description?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
