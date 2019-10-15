package main

import (
	"database/sql"
	"os"

	// "fmt"
	"log"

	"github.com/iancullinane/pesto-app/server"
	"github.com/iancullinane/pesto-app/server/pesto_db"
)

func main() {

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	os.Remove("./pesto_db/files/pesto.db")
	db, err := sql.Open("sqlite3", "./pesto.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	pdb := pesto_db.New(db)

	err = pdb.CreateAllTables()
	if err != nil {
		log.Print(err)
	}
	pdb.InsertProducts()
	pdb.InsertOrders()
	// pdb.Test()

	server := server.SetUpServer(pdb)
	server.ListenAndServe()
}
