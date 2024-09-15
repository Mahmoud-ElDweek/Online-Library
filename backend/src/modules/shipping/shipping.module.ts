import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { CartModule } from '../cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipping, ShippingSchema } from 'src/core/schemas/shipping.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CartModule, MongooseModule.forFeature([{ name: Shipping.name, schema: ShippingSchema }]), JwtModule.register({
    secret: 'gaher',
    signOptions: { expiresIn: '60m' }, 
  }),],
  providers: [ShippingService],
  controllers: [ShippingController]
})
export class ShippingModule {}
