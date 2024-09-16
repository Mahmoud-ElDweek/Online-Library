//اساسي 

// import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
// import { ShippingDTO } from './dto/shipping.dto';
// import { ShippingService } from './shipping.service';
// import { AuthGuard } from '../../core/guards/auth.guard';

// @Controller('shipping')
// export class ShippingController {
//   constructor(private shippingService: ShippingService) {}

//   @UseGuards(AuthGuard)
//   @Post(':cartId')
//   async handleShipping(
//     @Param('cartId') cartId: string,
//     @Body() shippingData: ShippingDTO,
//     @Req() req: any 
//   ) {
//     const userId = req.user.userId; 
//     const session = await this.shippingService.createSession(cartId, shippingData, userId);
//     return session;
//   }
// }


//2

// import { Controller, Post, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
// import { ShippingDTO } from './dto/shipping.dto';
// import { ShippingService } from './shipping.service';
// import { AuthGuard } from '../../core/guards/auth.guard';

// @Controller('shipping')
// export class ShippingController {
//   constructor(private shippingService: ShippingService) {}

//   @UseGuards(AuthGuard)
//   @Post(':cartId')
//   async handleShipping(
//     @Param('cartId') cartId: string,
//     @Body() shippingData: ShippingDTO,
//     @Req() req: any
//   ) {
//     const token = req.headers.token; // استخراج التوكن من الهيدر

//     if (!token) {
//       throw new UnauthorizedException('Token is missing from headers');
//     }

//     try {
//       const session = await this.shippingService.createSession(cartId, shippingData, token);
//       return session;
//     } catch (error) {
//       throw new UnauthorizedException(error.message);
//     }
//   }
// }


//-------------------------------------------------------------
//3
// import { Controller, Post, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
// import { ShippingDTO } from './dto/shipping.dto';
// import { ShippingService } from './shipping.service';
// import { AuthGuard } from '../../core/guards/auth.guard';

// @Controller('shipping')
// export class ShippingController {
//   constructor(private shippingService: ShippingService) {}

//   @UseGuards(AuthGuard)
//   @Post(':cartId')
//   async handleShipping(
//     @Param('cartId') cartId: string,
//     @Body() shippingData: ShippingDTO,
//     @Req() req: any
//   ) {
//     const token = req.headers.token; // استخراج التوكن من الهيدر

//     if (!token) {
//       throw new UnauthorizedException('Token is missing from headers');
//     }

//     try {
//       const session = await this.shippingService.createSession(cartId, shippingData, token);
//       return session;
//     } catch (error) {
//       throw new UnauthorizedException(error.message);
//     }
//   }
// }



//-------------------------------------------------------------------------
//4
// import { Controller, Post, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
// import { ShippingDTO } from './dto/shipping.dto';
// import { ShippingService } from './shipping.service';
// import { AuthGuard } from '../../core/guards/auth.guard';

// @Controller('shipping')
// export class ShippingController {
//   constructor(private shippingService: ShippingService) {}

//   @UseGuards(AuthGuard)
//   @Post(':cartId')
//   async handleShipping(
//     @Param('cartId') cartId: string,
//     @Body() shippingData: ShippingDTO,
//     @Req() req: any
//   ) {
//     const token = req.headers.token; // استخراج التوكن من الهيدر

//     if (!token) {
//       throw new UnauthorizedException('Token is missing from headers');
//     }

//     try {
//       const session = await this.shippingService.createSession(cartId, shippingData, token);
//       return session;
//     } catch (error) {
//       throw new UnauthorizedException(error.message);
//     }
//   }
// }


//---------------------------------------------------------------------------
//5
import { Controller, Post, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ShippingDTO } from './dto/shipping.dto';
import { ShippingService } from './shipping.service';
import { AuthGuard } from '../../core/guards/auth.guard';

@Controller('shipping')
export class ShippingController {
  constructor(private shippingService: ShippingService) {}

  @UseGuards(AuthGuard)
  @Post(':cartId')
  async handleShipping(
    @Param('cartId') cartId: string,
    @Body() shippingData: ShippingDTO,
    @Req() req: any
  ) {
    const token = req.headers.token; 

    if (!token) {
      throw new UnauthorizedException('Token is missing from headers');
    }

    try {
      const session = await this.shippingService.createSession(cartId, shippingData, token);
      return session;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
