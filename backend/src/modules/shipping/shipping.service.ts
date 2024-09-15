import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ShippingDTO } from './dto/shipping.dto';
import { CartService } from '../cart/cart.service';
import { Book } from 'src/core/schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipping } from 'src/core/schemas/shipping.schema';

@Injectable()
export class ShippingService {
  private stripe: Stripe;

  constructor(
    private cartService: CartService,
    @InjectModel(Shipping.name) private shippingModel: Model<Shipping>
  ) {
    this.stripe = new Stripe('sk_test_51PyeqxGF4VjEMvrLxk98NSDZwjw6iSiOEPp0iJUc6v3PqT2KEkM3aHaFMl5DXfILteOffLEvANW24oHs1zszpGF000jnrbPA4e', {
      apiVersion: '2024-06-20',
    });
  }

  async createSession(cartId: string, shippingData: ShippingDTO, userId: string) {
    const cart = await this.cartService.getCartById(cartId);

    const cartItems = cart.data.books.map(book => ({
      price_data: {
        currency: 'egp',
        product_data: {
          name: (book.book as Book).title,
        },
        unit_amount: (book.book as Book).price * 100,
      },
      quantity: book.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems,
      mode: 'payment',
      success_url: 'http://localhost:4200/home',
      cancel_url: 'http://localhost:4200/cart',
    });

    await this.saveShippingData(userId, cartId, shippingData);
    return session;
  }

  private async saveShippingData(userId: string, cartId: string, shippingData: ShippingDTO) {
    const shipping = new this.shippingModel({
      userId: userId,
      details: shippingData.details,
      phone: shippingData.phone,
      city: shippingData.city,
      cartId: cartId, 
    });
    await shipping.save();
  }
}





















