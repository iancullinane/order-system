package pesto_db

import (
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"log"
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

func (p *PestoDb) Test() {

	sqlStmt := `
	create table foo (id integer not null primary key, name text);
	delete from foo;
	`

	_, err := p.db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
	}

	tx, err := p.db.Begin()
	if err != nil {
		log.Fatal(err)
	}
	stmt, err := tx.Prepare("insert into foo(id, name) values(?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	for i := 0; i < 100; i++ {
		_, err = stmt.Exec(i, fmt.Sprintf("こんにちわ世界%03d", i))
		if err != nil {
			log.Fatal(err)
		}
	}
	tx.Commit()

	rows, err := p.db.Query("select id, name from foo")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var name string
		err = rows.Scan(&id, &name)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(id, name)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	stmt, err = p.db.Prepare("select name from foo where id = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	var name string
	err = stmt.QueryRow("3").Scan(&name)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(name)

}

// func main() {

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
