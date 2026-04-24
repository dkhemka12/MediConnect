const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async(req,res)=>{
    try{
        const {amount} = req.body;

        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise
            currency: "INR",  
            receipt: `receipt_${Date.now()}`,
        });
        res.json(order);
    }catch(error){
        res.status(500).json({error: "Order creation failed"});
    }
};