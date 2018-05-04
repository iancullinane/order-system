package main

import (
	"database/sql"
	// "fmt"
	"log"

	"github.com/iancullinane/pesto-app/pesto_db"
)

func main() {

	db, err := sql.Open("sqlite3", "./pesto_db/files/pesto.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	pdb := pesto_db.New(db)

	pdb.Test()
}
