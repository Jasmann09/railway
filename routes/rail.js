const express = require('express')
const { default: mongoose } = require('mongoose')
const { findByIdAndUpdate } = require('../models/railway')
const router=express.Router()
const railway = require('../models/railway')
//GET ALL
router.get('/',async(req,res)=>{
    try {
        const rail = await railway.find().sort({price:1,dtime:-1});
        const cd=new Date();
        const h=cd.getHours();
        const m=cd.getMinutes();
        
        var dd=h+":"+m+":"+"00";

        var result = [];
        rail.forEach(e => {
            var hh = e.dtime;
             
            var ho = hh[0]+hh[1];
            ho=parseInt(ho);
            var mo = hh[3]+hh[4];
            mo=parseInt(mo);
            var second = (ho*60*60) + (mo*60) +e.delayedt*60;
            var second2 = (h*60*60) + (m*60);
           
            if(Math.abs(second-second2)>=1800){
                result.push(e);
            }
        });
        res.render('home',{data : result})
      } catch (err) {
        res.status(500).json({ message: err.message })
      }

})
router.post('/',async(req,res)=>{
    console.log("hi");
      const rail = new railway({
   
          tname: req.body.tname,
          tno: req.body.tno,
          dtime:req.body.dtime,
          seatavailable:req.body.seatavailable,
          price:req.body.price,
          delayedt:req.body.delayedt
      })
          
        try {
          const newemploye= await rail.save()
          res.send("done");
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
  
  })
  router.get('/:id', async (req, res) => {

    const ress = await railway.findById(req.params.id);
    //const interview = {Title: "SCALAR"};
    
    res.render('edit', { data: ress });
})
router.post('/update/:id', async (req, res) => {
    console.log('hi');
   var  seatavailable = [req.body.seatnonac,req.body.seatac];
    var price = [req.body.pricenonac,req.body.priceac];
    const change = {
    tname: req.body.tname,
    tno: req.body.tno,
    dtime:req.body.dtime,
    seatavailable:seatavailable,
    price:price,
    delayedt:req.body.delayedt
    }
   console.log(change);
    try {
       
        const ress = await railway.findByIdAndUpdate(req.params.id, {$set:change},{new:true});
     
        ress.save()
        res.redirect("/rail");
    } catch (err) {
        console.error(err);
        
    }
})
  module.exports=router