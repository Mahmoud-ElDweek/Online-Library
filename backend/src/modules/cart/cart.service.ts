import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/core/schemas/cart.schema';
import { Book } from 'src/core/schemas/book.schema';
import { UserDTO } from '../wishlist/dto/wishlist.dto';
import { CartDTO, UpdateDTO } from './dto/cart.dto';
 

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async createCart(userDTO: UserDTO) {
    const { userId } = userDTO;

    const existingCart = await this.cartModel.findOne({ user: userId });

    if (existingCart) {
      throw new ConflictException('Cart already exists for this user.');
    }

    const newCart = new this.cartModel({
      user: userId,
      books: [],
      totalPrice: 0,
      numOfCartItems: 0,
    });

    await newCart.save();

    return {
      message: 'Cart created successfully',
      data: newCart,
    };
  }

  async getCartByUserId(userDTO: UserDTO) {
    const { userId } = userDTO;
    const cart = await this.cartModel.findOne({ user: userId }).populate({
      path: 'books.book',
      model: 'Book',
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    return {
      message: 'Cart retrieved successfully',
      data: cart,
    };
  }

  async addToCart(cartDTO:CartDTO) {
  
    const { userId, bookId } = cartDTO;
    // Check if the book exists
    const book = await this.bookModel.findById(bookId);
     

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Find the cart for the user
    let cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new this.cartModel({
        user: userId,
        books: [{ book: bookId, quantity: 1 }],
        totalPrice: book.price,
        numOfCartItems: 1,
      });
    } else {
      // Check if the book already exists in the cart
      const existingBook = cart.books.find(
        (book) => book.book.toString() === bookId.toString()
      );

      if (existingBook) {
        // If book exists, increase quantity
        existingBook.quantity += 1;
      } else {
        // If book doesn't exist, add it to the cart
        cart.books.push({ book: bookId, quantity: 1 });
      }

      // Update total price and number of items
      cart.totalPrice += book.price;
      cart.numOfCartItems += 1;
    }

    // Save the updated cart
    await cart.save();
    await cart.populate('books.book');
    return {
      message: 'Book added to cart successfully',
      data: cart,
    };
  }

  async updateCartQuantity(updateDTO: UpdateDTO) {
 
    const { userId, bookId, quantity } = updateDTO;
      
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
  
    const existingBook = cart.books.find(
      (book) => book.book.toString() === bookId.toString()
 
    );
    if (!existingBook) {
      throw new NotFoundException('Book not found in cart');
    }
  
    if (quantity <= 0) {
      cart.books = cart.books.filter(
        (book) => book.book.toString() !== bookId.toString(),
      );
    } else {
      existingBook.quantity = quantity;
    }
  
     
    await cart.populate('books.book');
   
    let totalPrice = 0;
    let numOfCartItems = 0;
  
   
  for (const cartBook of cart.books) {
    const populatedBook = cartBook.book as Book; // Type assertion
    totalPrice += populatedBook.price * cartBook.quantity;
    numOfCartItems += cartBook.quantity;
  }

  
    cart.totalPrice = totalPrice;
    cart.numOfCartItems = numOfCartItems;
  
    await cart.save();
  
    return {
      message: 'Cart updated successfully',
      data: cart,
    };
  }
  
  
 
  async removeBookFromCart(cartDTO: CartDTO) {
    const { userId, bookId } = cartDTO;
  
    
    const cart = await this.cartModel.findOne({ user: userId });
  
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
  
  
    const existingBookIndex = cart.books.findIndex(
      (item) => item.book.toString() === bookId.toString()
    );
  
    if (existingBookIndex === -1) {
      throw new NotFoundException('Book not found in cart');
    }
  
    
    cart.books.splice(existingBookIndex, 1);
   
    await cart.populate('books.book') 
  
     
    let totalPrice = 0;
    let numOfCartItems = 0;
  
    for (const item of cart.books) {
      const book = item.book as Book;  
      totalPrice += book.price * item.quantity;
      numOfCartItems += item.quantity;
    }
  
    // Update the cart with the new totals
    cart.totalPrice = totalPrice;
    cart.numOfCartItems = numOfCartItems;
  
    // Save the updated cart
    await cart.save();
  
    return {
      message: 'Book removed from cart successfully',
      data: cart,
    };
  }
  
  
  
  
  async clearCart(userDTO: UserDTO) {
    const { userId } = userDTO;

 
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    
    cart.books = [];
    cart.totalPrice = 0;
    cart.numOfCartItems = 0;

    
    await cart.save();

    return {
      message: 'Cart cleared successfully',
      data: cart,
    };
  }
  

 
}
