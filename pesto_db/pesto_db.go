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

type Order struct {
	Id       int `json:"id"`
	Quantity int `json:"quantity"`
}

func (p *PestoDb) InsertOrders() error {
	tx, err := p.db.Begin()
	if err != nil {
		return err
	}
	stmt, err := tx.Prepare(
		"insert into orders(quantity) values(?)",
	)
	if err != nil {
		return err
	}
	defer stmt.Close()
	for i := 0; i < 100; i++ {
		_, err = stmt.Exec(i)
		if err != nil {
			return err
		}
	}
	tx.Commit()
	return nil
}

func (p *PestoDb) InsertProducts() error {

	sqlStmt := `
		INSERT INTO products(name, price, size) values('Pesto ½ pint', '6', '8');
		INSERT INTO products(name, price, size) values('Pesto full pint', '12', '16');
		INSERT INTO products(name, price, size) values('Ziti', '10', '12');
	`

	_, err := p.db.Exec(sqlStmt)
	if err != nil {
		return (fmt.Errorf("Database creation failure"))
	}

	// rows, err := p.db.Query("select * from products")
	// if err != nil {
	// 	return (fmt.Errorf("Database creation failure"))
	// }

	// for rows.Next() {
	// 	fmt.Println(rows)
	// }
	return nil
}

func (p *PestoDb) InsertVendors() error {
	tx, err := p.db.Begin()
	if err != nil {
		return err
	}

	stmt, err := tx.Prepare(
		"INSERT INTO vendors(name, address, contact_email) values('test', ?, 'test@email.com');",
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
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER NULL,
        created DATE NULL
	);
	
	CREATE TABLE vendors (
		id integer PRIMARY KEY AUTOINCREMENT,
		name text NOT NULL,
		address text NOT NULL,
		contact_email text NOT NULL,
		contact_phone text NULL
	);

	CREATE TABLE products (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name text	NOT NULL,
		price int NOT NULL,
		size int NULL
	);`

	_, err := p.db.Exec(sqlStmt)
	if err != nil {
		return (fmt.Errorf("Database creation failure"))
	}
	return nil
}

type Product struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
	Size  int    `json:"size"`
}

type Vendor struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func (p *PestoDb) GetProducts(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	rows, err := p.db.Query("select * from products")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var returnV []Product
	for rows.Next() {
		var tmp Product
		err = rows.Scan(&tmp.Id, &tmp.Name, &tmp.Price, &tmp.Size)
		if err != nil {
			log.Fatal(err)
		}

		returnV = append(returnV, tmp)
	}

	b, err := json.Marshal(returnV)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	w.Write(b)
}

func (p *PestoDb) GetVendors(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	rows, err := p.db.Query("select id, name from vendors")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var returnV []Vendor
	for rows.Next() {
		var tmp Vendor
		err = rows.Scan(&tmp.Id, &tmp.Name)
		if err != nil {
			log.Fatal(err)
		}
		returnV = append(returnV, tmp)

	}

	b, err := json.Marshal(returnV)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	w.Write(b)
}
