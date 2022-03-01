const fs = require('fs').promises;

const product1 = {
    title: "dive mask",
    price: 123.5,
    thumbnail:"https://www.dive.com"
  };

class ProductContainer {
    constructor(filePath) {
      this.filePath = filePath;
      this.data = [];
      this.id = 0;
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");  
            if (data) {
                this.data = JSON.parse(data); 
                this.data.map((product) => {this.id < product.id? this.id = product.id:""});
            return this.data;
            }
        } catch (error) {
          console.log("Error " +  error);
        }
    }

    async save(product) {
      
      await this.getAll(); 
      this.id++;
      this.data.push({ ...product, id: this.id });
      try {
        await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
      } catch (error) {
        console.log("Error " +  error);
      }
    }
  
    async getById(id) {
      await this.getAll();
      try {
        const productById = this.data.find((prod) => prod.id === id);
        if (productById) {
          console.log("Producto encontrado:\n ");
          console.log(productById);
        } else {
          console.log(`No se encontro el producto con id: ${id}`);
        }
      } catch (error) {
        console.log("Error " + error);
      }
    }
  
    async deleteById(id) {
      await this.getAll();
      try {
        const deleteIndex = this.data.findIndex((product) => product.id === id);
        if (deleteIndex === -1 ){
            console.log("Id no encontrado; ");
        } else{
            const deleteData = this.data.splice(deleteIndex,1)
            await fs.writeFile(
                    this.filePath,
                    JSON.stringify(this.data, null, 2)
                  );
            console.log("id eliminado\n")
            console.log(deleteData)
        }
        } catch (error) {
        console.log("Error " + error);
      }
    }
  
    async deleteAll() {
      try {
        await fs.unlink(this.filePath);
        console.log("Archivo eliminado");
      } catch (error) {
        console.log("Error " + error);
      }
    }
  }

const productObject = new ProductContainer("Product.txt");

module.exports = productObject 
