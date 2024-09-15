import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
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
    const userId = req.user.userId; 
    const session = await this.shippingService.createSession(cartId, shippingData, userId);
    return session;
  }
}
