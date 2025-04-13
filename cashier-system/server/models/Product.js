let products = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 20.99 }
];

class Product {
  static async createTable() {
    // No-op for in-memory database
    return Promise.resolve();
  }

  static async getAll() {
    return Promise.resolve(products);
  }

  static async create(name, price) {
    const newProduct = {
      id: products.length + 1,
      name,
      price
    };
    products.push(newProduct);
    return Promise.resolve(newProduct.id);
  }

  static async findById(id) {
    return Promise.resolve(products.find(p => p.id === id));
  }

  static async getOrders() {
    return Promise.resolve([]);
  }

  static async createOrder(order) {
    return Promise.resolve({ ...order, id: 1 });
  }
}

module.exports = Product;
