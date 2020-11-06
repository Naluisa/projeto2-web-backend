const Product = require("../models/Product");
const User = require("../models/User");

module.exports = {
    async store(req,res){
       const {filename} = req.file;
       const {model, price} = req.body;
       const {user_id} = req.headers;

       const product = await Product.create({
           user: user_id,
           photo: filename,
           model,
           price
       })

       return res.json(produto);
       //return res.send("Arquivo Recebido!");
    },

  async index(req,res) {
    const {model} = req.query;

    const products = await Product.find({models: model});

    return res.json( products );
  },

  async show(req, res){
    const { user_id } = req.headers;
    const product = await Product.find({user:user_id});

    return res.json(product);
  },

  async update(req, res){
    const { id } = req.params;
    const body = req.body;

    const product = await Product.findOneAndUpdate({_id: id}, body, {new: true});
    return res.json(product);
  },

  async destroy(req, res){
    const { id } = req.params;
    await Product.findOneAndDelete({_id: id});
    
    return res.send();    
  },
};
