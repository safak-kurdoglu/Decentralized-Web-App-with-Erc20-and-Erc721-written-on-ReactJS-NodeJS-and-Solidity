
function verifyShilaPointRequest(req, res, next) {

    try {
        // Request origin must be your own server for point security. Here it is localhost.
        if(req.headers.origin === "http://localhost:3001");
            next();
        
    } catch (error) {   
        return res.json({status: false, message: "You don't have authority.", error});
    }
}

module.exports = {
    verifyShilaPointRequest 
}