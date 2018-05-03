package main

import (
	"database/sql"
	"fmt"

	"github.com/iancullinane/pesto-app/database"
)

func main() {

	db, err := sql.Open("sqlite3", "./foo.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	pdb := database.New(db)

	fmt.Println(pdb.Test())
}
