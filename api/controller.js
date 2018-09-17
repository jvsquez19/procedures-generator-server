
var sql = require("mssql")
var script = require("../assets/SQL.js")
// EXECUTE sp_executesql @sql lo que ocupo para ejecutar el script 

//Function to connect to database and execute query
var makeConection = function (result,dbConfig) {
    sql.close();
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            result.send({data:err,code:150});
            sql.close();
        }
        else {
            result.send({data:"Conexion Exitosa",code:200})
        }
    });
}

var makeQuery = function(result,query){
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    result.send({data:err,code:150});
                    
                }
                else {
                    console.log(res)
                    result.send({data:res,code:200});
                }
            });
}

exports.connect = function (req, res) {
    var newConnection = {
        server: req.body["serverIp"],
        user: req.body["username"],
        password: req.body["password"],
        database: req.body["database"]
    }
    console.log(newConnection);
    
    makeConection(res, newConnection);
    //Consulta a la base de datos 

}
exports.getTables = function(req,res){
    var query = "Select * from INFORMATION_SCHEMA.TABLES where TABLE_TYPE = 'BASE TABLE'"
    makeQuery(res,query)
}

exports.getSchemas= function(req,res){
    var query = "Select * from INFORMATION_SCHEMA.SCHEMATA where schema_owner = 'dbo'"
    makeQuery(res,query)
}

exports.generateProcedure = function(req,res){
var query = "EXECUTE genera_"+req.body["type"]+
" '"+req.body["prefix"]+"','"+req.body["table"]+
"','"+req.body["tableSchema"]+"','"+req.body["procSchema"]+"'"
makeQuery(res,query)
}

exports.executeProcedure = function(req,res){
    makeQuery(res,req.body["query"])
}


exports.executeCreateProcedure = function(req,res){
    makeQuery(res,script[req.body["procedure"]])
}



