package pesto_db

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
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

type Product struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	Size        int    `json:"size"`
}

type Vendor struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
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
		INSERT INTO products(name, description, price, size) values('Pesto ½ pint', 'Prepackaged ½ pints of basil pesto in a 8oz container', '6', '8');
		INSERT INTO products(name, description, price, size) values('Pesto full pint', 'Prepackaged pints of basil pesto in a 16oz container', '12', '16');
		INSERT INTO products(name, description, price, size) values('Ziti', 'Prepackaged handmade ziti pasta in a 12oz container', '10', '12');
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
	CREATE TABLE products (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name text	NOT NULL,
		description text,
		price int NOT NULL,
		size int NULL
	);

    CREATE TABLE orders (
		id INTEGER NOT NULL,
		FOREIGN KEY(product) REFERENCES products(id)
        quantity INTEGER NOT NULL,
        created DATE NULL
	);

	`

	_, err := p.db.Exec(sqlStmt)
	if err != nil {
		return (fmt.Errorf("Database creation failure"))
	}
	return nil
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
		err = rows.Scan(&tmp.Id, &tmp.Name, &tmp.Description, &tmp.Price, &tmp.Size)
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

// func unmarshalResponse(res *http.Response) (*Response, error) {
// 	if err := parseHTTPError(res); err != nil {
// 		return nil, err
// 	}

// 	var ret Response
// 	dec := json.NewDecoder(res.Body)
// 	if err := dec.Decode(&ret); err != nil {
// 		return nil, errors.Wrap(err, "error decoding response")
// 	}

// 	return &ret, nil
// }

func (p *PestoDb) PutOrders(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers",
		"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	if r.Method == "OPTIONS" {
		fmt.Println("Handle options")
		return
	}

	var val map[string]interface{}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("error decoding request: %s\n", err)
	}

	fmt.Println(body)
	err = json.Unmarshal(body, &val)
	if err != nil {
		fmt.Printf("error decoding: %s\n", err)
	}

	log.Println(val)

	returnV := Order{
		Id:       1,
		Quantity: 20,
	}
	b, err := json.Marshal(returnV)
	if err != nil {
		http.Error(w, err.Error(), 400)
	}

	w.Write(b)
}
