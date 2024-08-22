import express from "express";
import BoardModel from "../model/board.model.js";
import { authRole } from "../middleware/auth.roles.js";

const boardRoute = express.Router();

boardRoute.post("/create",authRole("ADMIN","USER"), (req, res) => {
    const { task, description, status } = req.body;
    console.log(req.body);
    const board = new BoardModel({
        task,
        description,
        status,
        userId:req.user._id
    });
    console.log(board);
    try {
         board.save();
        res.json({message:"board created successfully"});
    } catch (error) {
        res.json({message:"something went wrong",error:error});
    }
})

boardRoute.get("/all",authRole("ADMIN","USER"), async (req, res) => {
    if(!req.user){
        return res.json({message:"user not found"});
    }
    let {page="1",limit="10",status} = req.query;
    let skip,totalpages;
    page=parseInt(page);
    limit=parseInt(limit);
    skip = (page-1)*limit
    let query={}
    if(status){
        query.status = status
    }
    totalpages=Math.ceil((await BoardModel.countDocuments())/limit)
    let total
    try {
        if(req.user.role == "USER"){
            total = await BoardModel.find({userId:req.user._id}).countDocuments();
            const board = await BoardModel.find({userId:req.user._id}).find(query)
            .skip(skip).limit(limit);
            return res.json({message:"user board",totalpages,board,total});
        }
        if(req.user.role == "ADMIN"){
            const board = await BoardModel.find(query)
            .skip(skip).limit(limit);
            return res.json({message:"admin board",totalpages,board});
        }
        else{
            return res.json({message:"User not authorized"});
        }

        
    } catch (error) {
        res.json({message:"something went wrong",error:error});
    }
})

boardRoute.get("/all/:id",authRole("ADMIN","USER"), async (req, res) => {
    if(!req.user){
        return res.json({message:"user not found"});
    }
    try {
        if(req.user.role == "USER"){

            const board = await BoardModel.findOne({userId:req.user._id,_id:req.params.id})
            return res.json({message:"user board",board});
        }
        if(req.user.role == "ADMIN"){
            const board = await BoardModel.findOne({_id:req.params.id})
            return res.json({message:"admin board",board});
        }
        else{
            return res.json({message:"User not authorized"});
        }

        
    } catch (error) {
        res.json({message:"something went wrong",error:error});
    }
})

boardRoute.patch("/update/:id",authRole("ADMIN","USER"), async (req, res) => {
    const { task, description, status } = req.body;
    const uid = req.user._id.toString();  
    try {   
        if(req.user.role == "USER"){
            const board = await BoardModel.findOneAndUpdate({ _id: req.params.id, userId: uid }, { status }); 
            await board.save();
            return res.json({message:"board updated successfully"});
        }
        if(req.user.role == "ADMIN"){
            const board = await BoardModel.findOneAndUpdate({ _id: req.params.id }, { task, description, status }); 
            await board.save();
            return res.json({message:"board updated successfully"});
        }
        else{
            return res.json({message:"User not authorized"});
        }
    } catch (error) {
         res.json({message:"user not authorized for certain action or something went wrong",error:error});
    }
})

boardRoute.delete("/delete/:id",authRole("ADMIN"), async (req, res) => {
    try {
        const board = await BoardModel.findOneAndDelete({ _id: req.params.id });
        res.json({message:"board deleted successfully"});
    } catch (error) {
        res.json({message:"something went wrong",error:error});
    }
})


export default boardRoute