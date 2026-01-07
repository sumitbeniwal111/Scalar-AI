from pydantic import BaseModel
from typing import List

class ProductCreate(BaseModel):
    name: str
    price: int
    category: str
    description: str
    stock: int
    image_urls: List[str]


class CartAdd(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    address: str


