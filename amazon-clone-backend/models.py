from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base

from sqlalchemy.dialects.postgresql import ARRAY

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Integer)
    category = Column(String)
    description = Column(String)
    stock = Column(Integer)

    image_urls = Column(ARRAY(String))

class CartItem(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    total_amount = Column(Float)
    address = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_name = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
