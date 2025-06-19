import mongoose from "mongoose"

const Db = (URI)=>{
    try{
        mongoose.connect(URI)
        const db = mongoose.connection
        db.once("open",()=>{
            console.log("Db is connected");            
        })
    }
    catch(err){
        console.log("Unable to connect DB");
        
    }
}
export default Db