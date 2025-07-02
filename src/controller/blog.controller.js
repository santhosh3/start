const { blogSchema, validateData } = require("../utils");
const blogModel = require("../models/blog.model");

const createBlog = async(req, res) => {
    try {
      let {title, description} = req.body;
      const {status, message} = validateData(blogSchema,req.body);
      if(!status) {
        return res.status(400).send({status, message});
      }
      const userId = req.userId;
      const createBlog = await blogModel.create({
        title,
        description,
        userId
      })
      return res.status(201).send({status : true, message : 'blog created successfully', blog : createBlog});
    } catch (error) {
      return res.status(500).send({status : false, message : error.message})   
    }
}

const findAllBlogs = async(req, res) => {
    try {
        let userId = req.query.userId;
        if(userId) {
           let findAll = await blogModel.find({userId});
           return res.status(200).send({status : true, data : findAll});
        }
        let findAll = await blogModel.find();
        return res.status(200).send({status : true, data : findAll});
    } catch (error) {
      return res.status(500).send({status : false, message : error.message})   
    }
}

module.exports = {
    createBlog, 
    findAllBlogs
} 