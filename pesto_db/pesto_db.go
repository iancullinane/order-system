package pesto_db

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"net/http"
)

type PestoDb struct {
	db  *sql.DB
	env string
}

func New(db *sql.DB) *PestoDb {
	return &PestoDb{
		db: db,
	}
}

func (p *PestoDb) Insert() error {
	tx, err := p.db.Begin()
	if err != nil {
		return err
	}
	stmt, err := tx.Prepare(
		"INSERT INTO vendors [(name, address, contact_email)] VALUES (`test`, ?, `test@email.com`);",
	)
	if err != nil {
		return err
	}
	defer stmt.Close()
	for i := 0; i < 2; i++ {
		_, err = stmt.Exec(i)
		if err != nil {
			return err
		}
	}
	tx.Commit()
	return nil
}

func (p *PestoDb) Create() error {
	sqlStmt := `
    CREATE TABLE orders (
        id integer PRIMARY KEY AUTOINCREMENT,
        quantity integer NULL,
        created date NULL
	);
	
	CREATE TABLE vendors (
		id integer PRIMARY KEY AUTOINCREMENT,
		name text NOT NULL,
		address text NOT NULL,
		contact_email text NOT NULL,
		contact_phone text
	)

	CREATE TABLE products (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name text	NOT NULL,
		price int NOT NULL,
		size int
	);`

	_, err := p.db.Exec(sqlStmt)
	if err != nil {
		return (fmt.Errorf("Database creation failure"))
	}
	return nil
}

type Order struct {
	Id       int `json:"id"`
	Quantity int `json:"quantity"`
}

func (p *PestoDb) GetFromDatabase(w http.ResponseWriter, r *http.Request) {

	rows, err := p.db.Query("select id from orders")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	order := Order{}
	rows.Scan(&order.Id)
	// log.Println("Get User")
	b, err := json.Marshal(order)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	w.Write(b)
}

// 	_, err = db.Exec("delete from foo")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	_, err = db.Exec("insert into foo(id, name) values(1, 'foo'), (2, 'bar'), (3, 'baz')")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	rows, err = db.Query("select id, name from foo")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer rows.Close()
// 	for rows.Next() {
// 		var id int
// 		var name string
// 		err = rows.Scan(&id, &name)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		fmt.Println(id, name)
// 	}
// 	err = rows.Err()
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// }
