import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [AuthModule,CartModule,WishlistModule,BookModule,MongooseModule.forRoot('mongodb://localhost/nest_iti')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
