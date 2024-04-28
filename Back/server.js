const express = require('express');
const cors = require('cors');
const mysql = require('mysql');


const app = express();
// Allow Cors
app.use(cors());

app.use(express.json());

// Connection DB
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"mydata"
});

// Get Data Based on Search Date
app.get("/search/:date",(req,res) => {
    const date = req.params.date
    const sql= `
    SELECT 
    formation_id,nom_axe,date_debut,date_fin,module,annee_scolaire,nom_etab,nom_projet,status
    FROM axe
    INNER JOIN formation
    ON formation.axe_id = axe.axe_id 
    JOIN etablissement
    ON formation.etablissement_id = etablissement.etablissement_id
    JOIN projet
    ON formation.projet_id = projet.projet_id
    JOIN status
    ON formation.status_id = status.status_id
    WHERE date_debut = ? 
    OR date_fin = ? ;
    `;
    db.query(sql,[date,date],(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })
});

// Get Data HOME page From DB
app.get("/",(req,res) => {
    const sql= `
    SELECT 
    formation_id,nom_axe,date_debut,date_fin,module,annee_scolaire,nom_etab,nom_projet,status
    FROM axe
    INNER JOIN formation
    ON formation.axe_id = axe.axe_id 
    JOIN etablissement
    ON formation.etablissement_id = etablissement.etablissement_id
    JOIN projet
    ON formation.projet_id = projet.projet_id
    JOIN status
    ON formation.status_id = status.status_id
    ORDER BY formation_id DESC
    `;
    db.query(sql,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })
});

// Get A Formation based on ITS ID 
app.get("/update/:id",(req,res) => {
    const id = req.params.id;
    const sql= `
            SELECT 
                *
            FROM axe
                INNER JOIN formation
                ON formation.axe_id = axe.axe_id 
                JOIN etablissement
                ON formation.etablissement_id = etablissement.etablissement_id
                JOIN projet
                ON formation.projet_id = projet.projet_id
                JOIN status
                ON formation.status_id = status.status_id
            WHERE formation_id = ?`;
    db.query(sql,id,(err,data)=> {
        if (err) return console.log(err);
        return res.json(data);
    })
});

// Get Status
app.get("/status",(req,res) => {
    const sql= `SELECT * FROM status`;
    db.query(sql,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })
});

// Get Participant
app.get("/participant/:id",(req,res) => {
    const id = req.params.id;
    const sql= `SELECT * 
                FROM participant
                INNER JOIN etablissement 
                ON etablissement.etablissement_id = participant.etablissement_id
                WHERE participant_id = ? 
                 `;
    db.query(sql,id,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })
});

// Get Etab
app.get("/etablissement",(req,res) => {
    const sql= `SELECT * FROM etablissement`;
    db.query(sql,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })
});

// Get Axe
app.get("/axe",(req,res) => {
    const sql= 'SELECT * FROM axe';
    db.query(sql,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })
});



// Get projet
app.get("/projet",(req,res) => {
    const sql= `SELECT * FROM projet`;
    db.query(sql,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })
});
// Get Projet Based on Axe ID
app.get("/projet/:id",(req,res) => {
    const sql= "SELECT * FROM projet WHERE `axe_id` = ?";
    const id = req.params.id;
    db.query(sql,id,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })

    
});

// Get Formation Based on its ID
app.get("/show/:id",(req,res) => {
    const sql= `
        SELECT * FROM axe 
        INNER JOIN formation 
            ON formation.axe_id = axe.axe_id 
        JOIN etablissement
            ON formation.etablissement_id = etablissement.etablissement_id
        JOIN status
            ON formation.status_id = status.status_id
        JOIN projet
            ON formation.projet_id = projet.projet_id 
        WHERE formation.formation_id = ?
    `;
    const id = req.params.id;
    db.query(sql,id,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })

    
});

// Get Participant Based on its ID
app.get("/participant/projet/:id",(req,res) => {
    const sql= `
        SELECT participant_id,ppr,nom_pr,nom_etab 
        FROM participant
        INNER JOIN formation
        ON formation.formation_id = participant.formation_id
        INNER JOIN etablissement
        ON etablissement.etablissement_id = participant.etablissement_id
        WHERE formation.formation_id = ? 
    `;
    const id = req.params.id;
    db.query(sql,id,(err,data)=> {
        if (err) return console.log(res.send(err));
        return res.json(data);
    })

    
});



// =================== Post =======================


// 2 Insert into Database
app.post('/formation',(req,res)=>{

    const values = {
        "axe":req.body.axe,
        "annee_scolaire":req.body.annee_scolaire,
        "projet":req.body.projet,
        "module":req.body.module,
        "status":req.body.status,
        "lieuFormation":req.body.lieuFormation,
        "dateDebut":req.body.dateDebut,
        "dateFin":req.body.dateFin,
    }

    const sql = `
    INSERT INTO formation(date_debut,date_fin,module,axe_id,projet_id,etablissement_id,status_id,annee_scolaire) 
    VALUES(?,?,?,?,?,?,?,?)`;
    db.query(sql,[values.dateDebut,values.dateFin,values.module,values.axe,values.projet,values.lieuFormation,values.status,values.annee_scolaire],(err,result)=>{
        if (err){
            return console.log(err)
        }else{
            return res.json({
                status:1,
                message:'Created Succesfuly !'
            })
        }
    })

});


// 2 Insert into Participant
app.post('/addNewParticipant',(req,res)=>{

    const values = {
        "ppr":req.body.ppr,
        "nom_pr":req.body.nom_pr,
        "etablissement_id":req.body.etablissement_id,
        "formation_id":req.body.formation_id,
    }

    const sql = `
    INSERT INTO participant(ppr,nom_pr,etablissement_id,formation_id) 
    VALUES(?,?,?,?)`;
    db.query(sql,[values.ppr,values.nom_pr,values.etablissement_id,values.formation_id],(err,result)=>{
        if (err){
            return console.log(err)
        }else{
            return res.json({
                status:1,
                message:'Created Succesfuly !'
            })
        }
    })

});

//3 Get User_details From DB
app.get("/user_details/:id",(req,res) => {
    const id = req.params.id
    const sql= "SELECT * FROM users WHERE id = ?";
    db.query(sql,id,(err,data)=> {
        if (err) return console.log("Error to get Data");
        return res.json(data);
    })
});


// 4 Update Participant In DB
app.put("/update_participant/:id",(req,res) => {
    const values = {
        'id':req.params.id,
        'ppr': req.body.ppr,
        'nom_pr':req.body.nom_pr,
        'etablissement_id':req.body.etablissement_id,
        'formation_id' : req.body.formation_id
    }
    const sql= "UPDATE participant SET `ppr`= ?,`nom_pr`= ?,`etablissement_id`= ?,formation_id=? WHERE participant_id = ?";
    db.query(sql,[values.ppr,values.nom_pr,values.etablissement_id,values.formation_id,values.id],(err,data)=> {
        if (err) return console.log(err);
        return res.json(data);
    })
});

// 4 Update Participant In DB
app.put("/updateFormation/:id",(req,res) => {
    const values = {
        'id':req.params.id,
        'dateDebut': req.body.dateDebut,
        'dateFin':req.body.dateFin,
        'lieuFormation':req.body.lieuFormation,
        'status' : req.body.status,
        'annee_scolaire' : req.body.annee_scolaire,
        'projet':req.body.projet,
        'module':req.body.module,
        'axe':req.body.axe

    }
    const sql= "UPDATE formation SET `date_debut`= ?,`date_fin`= ?,`module`= ?,`axe_id`=?,`projet_id`=?,`etablissement_id`=?,`status_id`=?,`annee_scolaire`=? WHERE formation_id = ?";
    db.query(sql,[values.dateDebut,values.dateFin,values.module,values.axe,values.projet,values.lieuFormation,values.status,values.annee_scolaire,values.id],(err,data)=> {
        if (err) return console.log(err);
        return res.json(data);
    })
});

// 5 Delete User From DB
app.delete("/delete/:id",(req,res) => {
    const id = req.params.id
    const sql= "DELETE FROM `formation` WHERE formation_id = ? ";
    db.query(sql,id,(err,data)=> {
        if (err) return res.json(err);
        return res.json("Item Deleted !");
    })
});

// 5 Delete participant From DB
app.delete("/deleteParticipant/:id",(req,res) => {
    const id = req.params.id
    const sql= "DELETE FROM `participant` WHERE participant_id = ? ";
    db.query(sql,id,(err,data)=> {
        if (err) return res.json(err);
        return res.json("Item Deleted !");
    })
});

// Listen Port 
app.listen(5000, () => {
    console.log('Listning..');
});