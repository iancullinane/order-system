package main

import (
	"database/sql"
	// "fmt"
	"log"
	"os"

	"github.com/iancullinane/pesto-app/pesto_db"
	"github.com/iancullinane/pesto-app/server"
)

func main() {

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	os.Remove("./pesto_db/files/pesto.db")
	db, err := sql.Open("sqlite3", "./pesto_db/files/pesto.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	pdb := pesto_db.New(db)

	pdb.Create()
	pdb.InsertProducts()
	pdb.InsertVendors()
	// pdb.Test()

	server := server.SetUpServer(pdb)
	server.ListenAndServe()
}
