// اساسي

// import { Injectable } from '@nestjs/common';
// import { Stripe } from 'stripe';
// import { ShippingDTO } from './dto/shipping.dto';
// import { CartService } from '../cart/cart.service';
// import { Book } from 'src/core/schemas/book.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Shipping } from 'src/core/schemas/shipping.schema';

// @Injectable()
// export class ShippingService {
//   private stripe: Stripe;

//   constructor(
//     private cartService: CartService,
//     @InjectModel(Shipping.name) private shippingModel: Model<Shipping>
//   ) {
//     this.stripe = new Stripe('sk_test_51PyeqxGF4VjEMvrLxk98NSDZwjw6iSiOEPp0iJUc6v3PqT2KEkM3aHaFMl5DXfILteOffLEvANW24oHs1zszpGF000jnrbPA4e', {
//       apiVersion: '2024-06-20',
//     });
//   }

//   async createSession(cartId: string, shippingData: ShippingDTO, userId: string) {
//     const cart = await this.cartService.getCartById(cartId);

//     const cartItems = cart.data.books.map(book => ({
//       price_data: {
//         currency: 'egp',
//         product_data: {
//           name: (book.book as Book).title,
//         },
//         unit_amount: (book.book as Book).price * 100,
//       },
//       quantity: book.quantity,
//     }));

//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: cartItems,
//       mode: 'payment',
//       success_url: 'http://localhost:4200/home',
//       cancel_url: 'http://localhost:4200/cart',
//     });

//     await this.saveShippingData(userId, cartId, shippingData);
//     return session;
//   }

//   private async saveShippingData(userId: string, cartId: string, shippingData: ShippingDTO) {
//     const shipping = new this.shippingModel({
//       userId: userId,
//       details: shippingData.details,
//       phone: shippingData.phone,
//       city: shippingData.city,
//       cartId: cartId, 
//     });
//     await shipping.save();
//   }
// }









//-------------------------------------------------------------
// 2
// import { Injectable } from '@nestjs/common';
// import { Stripe } from 'stripe';
// import { ShippingDTO } from './dto/shipping.dto';
// import { CartService } from '../cart/cart.service';
// import { Book } from 'src/core/schemas/book.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Shipping } from 'src/core/schemas/shipping.schema';

// @Injectable()
// export class ShippingService {
//   private stripe: Stripe;

//   constructor(
//     private cartService: CartService,
//     @InjectModel(Shipping.name) private shippingModel: Model<Shipping>
//   ) {
//     this.stripe = new Stripe('sk_test_51PyeqxGF4VjEMvrLxk98NSDZwjw6iSiOEPp0iJUc6v3PqT2KEkM3aHaFMl5DXfILteOffLEvANW24oHs1zszpGF000jnrbPA4e', {
//       apiVersion: '2024-06-20',
//     });
//   }

//   async createSession(cartId: string, shippingData: ShippingDTO, userId: string) {
//     const cart = await this.cartService.getCartById(cartId);

//     const cartItems = cart.data.books.map(book => ({
//       price_data: {
//         currency: 'egp',
//         product_data: {
//           name: (book.book as Book).title,
//         },
//         unit_amount: (book.book as Book).price * 100,
//       },
//       quantity: book.quantity,
//     }));

//     // قم بحفظ بيانات الشحن أولاً مع التحقق من وجود بيانات سابقة
//     await this.saveShippingData(userId, cartId, shippingData);

//     // إنشاء جلسة Stripe للدفع
//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: cartItems,
//       mode: 'payment',
//       success_url: 'http://localhost:4200/home',
//       cancel_url: 'http://localhost:4200/cart',
//     });

//     return session;
//   }

//   private async saveShippingData(userId: string, cartId: string, shippingData: ShippingDTO) {
//     // تحقق مما إذا كان هناك بالفعل بيانات شحن للمستخدم لهذا cartId
//     const existingShipping = await this.shippingModel.findOne({ userId, cartId });
    
//     // إذا كانت البيانات موجودة، قم بإرجاع خطأ
//     if (existingShipping) {
//       throw new Error('Shipping data already exists for this user and cart.');
//     }

//     // إذا لم توجد بيانات شحن، قم بإنشاء بيانات جديدة
//     const shipping = new this.shippingModel({
//       userId: userId,
//       details: shippingData.details,
//       phone: shippingData.phone,
//       city: shippingData.city,
//       cartId: cartId, 
//     });

//     await shipping.save();
//   }
// }




//--------------------------------------------------------
//3
// import { Injectable } from '@nestjs/common';
// import { Stripe } from 'stripe';
// import { ShippingDTO } from './dto/shipping.dto';
// import { CartService } from '../cart/cart.service';
// import { Book } from 'src/core/schemas/book.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Shipping } from 'src/core/schemas/shipping.schema';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class ShippingService {
//   private stripe: Stripe;

//   constructor(
//     private cartService: CartService,
//     @InjectModel(Shipping.name) private shippingModel: Model<Shipping>,
//     private jwtService: JwtService,
//   ) {
//     this.stripe = new Stripe('sk_test_51PyeqxGF4VjEMvrLxk98NSDZwjw6iSiOEPp0iJUc6v3PqT2KEkM3aHaFMl5DXfILteOffLEvANW24oHs1zszpGF000jnrbPA4e', {
//       apiVersion: '2024-06-20',
//     });
//   }

//   private getEmailFromToken(token: string): string {
//     const payload = this.jwtService.decode(token) as any;
//     return payload?.email;
//   }

//   private getUserIdFromToken(token: string): string {
//     const payload = this.jwtService.decode(token) as any;
//     return payload?.userId;
//   }

//   async createSession(cartId: string, shippingData: ShippingDTO, token: string) {
//     const cart = await this.cartService.getCartById(cartId);
//     const email = this.getEmailFromToken(token);
//     const userId = this.getUserIdFromToken(token);

//     const cartItems = cart.data.books.map(book => ({
//       price_data: {
//         currency: 'egp',
//         product_data: {
//           name: (book.book as Book).title,
//         },
//         unit_amount: (book.book as Book).price * 100,
//       },
//       quantity: book.quantity,
//     }));

//     await this.saveShippingData(userId, cartId, shippingData, email);

//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: cartItems,
//       mode: 'payment',
//       success_url: 'http://localhost:4200/home',
//       cancel_url: 'http://localhost:4200/cart',
//       customer_email: email,
//       metadata: {
//         userId: userId,
//         shippingAddress: JSON.stringify(shippingData),
//       },
//     });

//     return session;
//   }

//   private async saveShippingData(userId: string, cartId: string, shippingData: ShippingDTO, email: string) {
//     const existingShipping = await this.shippingModel.findOne({ userId, cartId });

//     if (existingShipping) {
//       throw new Error('Shipping data already exists for this user and cart.');
//     }

//     const shipping = new this.shippingModel({
//       userId: userId,
//       email: email,
//       details: shippingData.details,
//       phone: shippingData.phone,
//       city: shippingData.city,
//       cartId: cartId,
//     });

//     await shipping.save();
//   }
// }



//          ----------------------------------------------
//4
// import { Injectable } from '@nestjs/common';
// import { Stripe } from 'stripe';
// import { ShippingDTO } from './dto/shipping.dto';
// import { CartService } from '../cart/cart.service';
// import { Book } from 'src/core/schemas/book.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Shipping } from 'src/core/schemas/shipping.schema';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class ShippingService {
//   private stripe: Stripe;

//   constructor(
//     private cartService: CartService,
//     @InjectModel(Shipping.name) private shippingModel: Model<Shipping>,
//     private jwtService: JwtService,
//   ) {
//     this.stripe = new Stripe('sk_test_51PyeqxGF4VjEMvrLxk98NSDZwjw6iSiOEPp0iJUc6v3PqT2KEkM3aHaFMl5DXfILteOffLEvANW24oHs1zszpGF000jnrbPA4e', {
//       apiVersion: '2024-06-20',
//     });
//   }

//   // استخراج الـ email من التوكن
//   private getEmailFromToken(token: string): string {
//     const payload = this.jwtService.decode(token) as any;
//     return payload?.email;
//   }

//   // استخراج الـ userId من التوكن
//   private getUserIdFromToken(token: string): string {
//     const payload = this.jwtService.decode(token) as any;
//     return payload?.userId;
//   }

//   // إنشاء session للـ Stripe
//   async createSession(cartId: string, shippingData: ShippingDTO, token: string) {
//     // الحصول على بيانات الكارت
//     const cart = await this.cartService.getCartById(cartId);

//     // استخراج البيانات من التوكن
//     const email = this.getEmailFromToken(token);
//     const userId = this.getUserIdFromToken(token);

//     // إعداد العناصر الخاصة بالكارت للـ Stripe
//     const cartItems = cart.data.books.map(book => ({
//       price_data: {
//         currency: 'egp',
//         product_data: {
//           name: (book.book as Book).title,
//         },
//         unit_amount: (book.book as Book).price * 100,
//       },
//       quantity: book.quantity,
//     }));

//     // تخزين بيانات الشحن في الـ session
//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: cartItems,
//       mode: 'payment',
//       success_url: 'http://localhost:4200/home',
//       cancel_url: 'http://localhost:4200/cart',
//       customer_email: email, // لتخزين البريد الإلكتروني للمستخدم
//       metadata: {
//         userId: userId, // لتخزين معرف المستخدم
//         shippingDetails: shippingData.details, // تفاصيل الشحن
//         shippingPhone: shippingData.phone, // رقم الهاتف
//         shippingCity: shippingData.city, // المدينة
//       },
//     });

//     // حفظ بيانات الشحن في قاعدة البيانات
//     await this.saveShippingData(userId, cartId, shippingData, email);

//     return session;
//   }

//   // حفظ بيانات الشحن في قاعدة البيانات
//   private async saveShippingData(userId: string, cartId: string, shippingData: ShippingDTO, email: string) {
//     const existingShipping = await this.shippingModel.findOne({ userId, cartId });

//     if (existingShipping) {
//       throw new Error('Shipping data already exists for this user and cart.');
//     }

//     const shipping = new this.shippingModel({
//       userId: userId,
//       email: email,
//       details: shippingData.details,
//       phone: shippingData.phone,
//       city: shippingData.city,
//       cartId: cartId,
//     });

//     await shipping.save();
//   }
// }






//------------------------------------------------------------
//5
// import { Injectable } from '@nestjs/common';
// import { Stripe } from 'stripe';
// import { ShippingDTO } from './dto/shipping.dto';
// import { CartService } from '../cart/cart.service';
// import { Book } from 'src/core/schemas/book.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Shipping } from 'src/core/schemas/shipping.schema';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class ShippingService {
//   private stripe: Stripe;

//   constructor(
//     private cartService: CartService,
//     @InjectModel(Shipping.name) private shippingModel: Model<Shipping>,
//     private jwtService: JwtService,
//   ) {
//     this.stripe = new Stripe('sk_test_51PyeqxGF4VjEMvrLxk98NSDZwjw6iSiOEPp0iJUc6v3PqT2KEkM3aHaFMl5DXfILteOffLEvANW24oHs1zszpGF000jnrbPA4e', {
//       apiVersion: '2024-06-20',
//     });
//   }

//   private getEmailFromToken(token: string): string {
//     const payload = this.jwtService.decode(token) as any;
//     return payload?.email;
//   }

//   private getUserIdFromToken(token: string): string {
//     const payload = this.jwtService.decode(token) as any;
//     return payload?.userId;
//   }

//   async createSession(cartId: string, shippingData: ShippingDTO, token: string) {
//     const cart = await this.cartService.getCartById(cartId);
//     const email = this.getEmailFromToken(token);
//     const userId = this.getUserIdFromToken(token);

//     const cartItems = cart.data.books.map(book => ({
//       price_data: {
//         currency: 'egp',
//         product_data: {
//           name: (book.book as Book).title,
//         },
//         unit_amount: (book.book as Book).price * 100,
//       },
//       quantity: book.quantity,
//     }));

//     await this.saveShippingData(userId, cartId, shippingData, email);

//     // إنشاء جلسة (session) في Stripe
//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: cartItems,
//       mode: 'payment',
//       success_url: 'http://localhost:4200/home',
//       cancel_url: 'http://localhost:4200/cart',
//       customer_email: email,
//       metadata: {
//         userId: userId,
//         details: shippingData.details,  // تضمين بيانات العنوان
//         phone: shippingData.phone,      // تضمين رقم الهاتف
//         city: shippingData.city,        // تضمين المدينة
//       },
//     });

//     return session;
//   }

//   private async saveShippingData(userId: string, cartId: string, shippingData: ShippingDTO, email: string) {
//     const existingShipping = await this.shippingModel.findOne({ userId, cartId });

//     if (existingShipping) {
//       throw new Error('Shipping data already exists for this user and cart.');
//     }

//     const shipping = new this.shippingModel({
//       userId: userId,
//       email: email,
//       details: shippingData.details,
//       phone: shippingData.phone,
//       city: shippingData.city,
//       cartId: cartId,
//     });

//     await shipping.save();
//   }
// }


//-----------------------------------------------------------
//6
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ShippingDTO } from './dto/shipping.dto';
import { CartService } from '../cart/cart.service';
import { Book } from 'src/core/schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipping } from 'src/core/schemas/shipping.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShippingService {
  private stripe: Stripe;

  constructor(
    private cartService: CartService,
    @InjectModel(Shipping.name) private shippingModel: Model<Shipping>,
    private jwtService: JwtService,
  ) {
    this.stripe = new Stripe('sk_test_51PyeqxGF4VjEMvrLxk98NSDZwjw6iSiOEPp0iJUc6v3PqT2KEkM3aHaFMl5DXfILteOffLEvANW24oHs1zszpGF000jnrbPA4e', {
      apiVersion: '2024-06-20',
    });
  }

  private getEmailFromToken(token: string): string {
    const payload = this.jwtService.decode(token) as any;
    return payload?.email;
  }

  private getUserIdFromToken(token: string): string {
    const payload = this.jwtService.decode(token) as any;
    return payload?.userId;
  }

  async createSession(cartId: string, shippingData: ShippingDTO, token: string) {
    const cart = await this.cartService.getCartById(cartId);
    const email = this.getEmailFromToken(token);
    const userId = this.getUserIdFromToken(token);

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

    await this.saveShippingData(userId, cartId, shippingData, email);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems,
      mode: 'payment',
      success_url: 'http://localhost:4200/home',
      cancel_url: 'http://localhost:4200/cart',
      customer_email: email,
      
      metadata: {
        userId: userId,
        details: shippingData.details,  
        phone: shippingData.phone,    
        city: shippingData.city,  
        order_id:"100",
      },
    });
console.log(session.metadata);

    return session;
  }

  private async saveShippingData(userId: string, cartId: string, shippingData: ShippingDTO, email: string) {
    const existingShipping = await this.shippingModel.findOne({ userId, cartId });

    if (existingShipping) {
      throw new Error('Shipping data already exists for this user and cart.');
    }

    const shipping = new this.shippingModel({
      userId: userId,
      email: email,
      details: shippingData.details,
      phone: shippingData.phone,
      city: shippingData.city,
      cartId: cartId,
    });

    await shipping.save();
  }
}
