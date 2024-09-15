import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';

@Controller('webhook')
export class WebhookController {
  private stripe = new Stripe('sk_test_...', { apiVersion: '2024-06-20' });

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = 'whsec_...';  // ضع Webhook Secret من لوحة تحكم Stripe

    let event;

    try {
      // تحقق من صحة توقيع الـ Webhook
      event = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.', err.message);
      return res.sendStatus(400);  // خطأ في التوقيع
    }

    // فحص نوع الحدث (event type)
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        if (session.payment_status === 'paid') {
          const cartId = session.metadata.cartId;  // استرجاع cartId من الـ metadata
          console.log('Payment successful for cart:', cartId);
          
          // هنا استدعاء خدمة لتفريغ السلة
          // await this.cartService.clearCart(cartId);
        }
        break;

      case 'checkout.session.async_payment_failed':
        console.log('Payment failed');
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.sendStatus(200);  // التأكد من أن Stripe يستلم استجابة 200
  }
}
