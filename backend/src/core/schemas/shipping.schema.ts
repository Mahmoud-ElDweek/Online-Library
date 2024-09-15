
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Shipping extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  details: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  cartId: string; 
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
