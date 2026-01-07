from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal
import models
from models import Product, CartItem, Order, OrderItem
from schemas import ProductCreate, CartAdd, OrderCreate

# ------------------ APP SETUP ------------------

app = FastAPI(title="Amazon Clone API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# ------------------ ROOT ------------------

@app.get("/")
def root():
    return {"message": "Amazon Clone Backend Running"}

# ------------------ PRODUCTS ------------------

@app.post("/products")
def create_product(product: ProductCreate):
    db = SessionLocal()
    new_product = Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    db.close()
    return new_product


@app.get("/products")
def get_products(search: str = "", category: str = ""):
    db = SessionLocal()
    query = db.query(Product)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if category:
        query = query.filter(Product.category == category)

    products = query.all()
    db.close()
    return products


@app.get("/products/{product_id}")
def get_product(product_id: int):
    db = SessionLocal()
    product = db.query(Product).filter(Product.id == product_id).first()
    db.close()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

# ------------------ CART ------------------

@app.post("/cart/add")
def add_to_cart(item: CartAdd):
    db = SessionLocal()

    cart_item = db.query(CartItem).filter(
        CartItem.product_id == item.product_id
    ).first()

    if cart_item:
        cart_item.quantity += item.quantity
    else:
        cart_item = CartItem(
            product_id=item.product_id,
            quantity=item.quantity
        )
        db.add(cart_item)

    db.commit()
    db.close()
    return {"message": "Item added to cart"}


@app.get("/cart")
def get_cart():
    db = SessionLocal()

    cart_items = db.query(CartItem).all()
    items = []
    cart_total = 0

    for item in cart_items:
        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        # Defensive check
        if not product:
            continue

        item_total = product.price * item.quantity
        cart_total += item_total

        items.append({
            "cart_item_id": item.id,
            "product_id": product.id,
            "name": product.name,
            "price": product.price,
            "quantity": item.quantity,
            "item_total": item_total,
            "image": product.image_urls[0] if product.image_urls else None
        })

    db.close()

    return {
        "items": items,
        "total": cart_total
    }


@app.put("/cart/update")
def update_cart(item: CartAdd):
    db = SessionLocal()

    cart_item = db.query(CartItem).filter(
        CartItem.product_id == item.product_id
    ).first()

    if not cart_item:
        db.close()
        raise HTTPException(status_code=404, detail="Item not found in cart")

    cart_item.quantity = item.quantity
    db.commit()
    db.close()

    return {"message": "Cart updated"}


@app.delete("/cart/remove/{item_id}")
def remove_cart_item(item_id: int):
    db = SessionLocal()

    item = db.query(CartItem).filter(
        CartItem.id == item_id
    ).first()

    if not item:
        db.close()
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item)
    db.commit()
    db.close()

    return {"message": "Item removed"}

# ------------------ ORDER ------------------

@app.post("/order/place")
def place_order(order: OrderCreate):
    db = SessionLocal()

    cart_items = db.query(CartItem).all()
    if not cart_items:
        db.close()
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_amount = 0

    # Create order
    new_order = Order(
        total_amount=0,
        address=order.address
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    order_id = new_order.id

    # Create order items
    for item in cart_items:
        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        # Defensive check
        if not product:
            continue

        item_total = product.price * item.quantity
        total_amount += item_total

        order_item = OrderItem(
            order_id=order_id,
            product_name=product.name,
            price=product.price,
            quantity=item.quantity
        )
        db.add(order_item)

    # Update order total
    new_order.total_amount = total_amount

    # Clear cart
    db.query(CartItem).delete()

    db.commit()
    db.close()

    return {
        "message": "Order placed successfully",
        "order_id": order_id
    }


@app.get("/order/{order_id}")
def get_order(order_id: int):
    db = SessionLocal()

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        db.close()
        raise HTTPException(status_code=404, detail="Order not found")

    items = db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()

    db.close()

    return {
        "order_id": order.id,
        "total_amount": order.total_amount,
        "address": order.address,
        "items": items
    }
