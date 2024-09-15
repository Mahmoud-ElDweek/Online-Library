import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewModule } from './modules/review/review.module';
import { StreamEventModule } from './modules/stream-event/stream-event.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthorModule } from './modules/author/author.module';
import { ConfigModule } from '@nestjs/config';
import { ShippingModule } from './modules/shipping/shipping.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/onlineLibrary'),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    BookModule,
    AuthModule,
    ReviewModule,
    StreamEventModule,
    OrderModule,
    CartModule,
    WishlistModule,
    RecommendationModule,
    CategoryModule,
    AuthorModule,
   ShippingModule,
   WebhookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
