package server

import (
	"flag"
	"net/http"
	"os"
	"time"

	"log"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type PestoDb interface {
	GetVendors(w http.ResponseWriter, r *http.Request)
	GetProducts(w http.ResponseWriter, r *http.Request)
	PutOrders(w http.ResponseWriter, r *http.Request)
}

func SetUpServer(pesto_db PestoDb) *http.Server {
	var entry string
	var static string
	var port string

	flag.StringVar(&entry, "entry", "./dist/index.html", "the entrypoint to serve.")
	flag.StringVar(&static, "dist", ".", "the directory to serve static files from.")
	flag.StringVar(&port, "port", "8000", "the `port` to listen on.")
	flag.Parse()

	mux := mux.NewRouter()

	// Note: In a larger application, we'd likely extract our route-building logic into our handlers
	// package, given the coupling between them.

	// It's important that this is before your catch-all route ("/")
	api := mux.PathPrefix("/api/v1/").Subrouter()
	// api.Methods("OPTIONS").Handler(AccountsCreatePreFlight)

	api.HandleFunc("/products", pesto_db.GetProducts).Methods("GET")
	api.HandleFunc("/vendors", pesto_db.GetVendors).Methods("GET")
	api.HandleFunc("/orders", pesto_db.PutOrders).Methods("PUT", "OPTIONS")
	// Optional: Use a custom 404 handler for our API paths.
	// api.NotFoundHandler = JSONNotFound

	// Serve static assets directly.
	mux.PathPrefix("/dist/").Handler(http.FileServer(http.Dir(static)))

	// Catch-all: Serve our JavaScript application's entry-point (index.html).
	mux.PathPrefix("/").HandlerFunc(IndexHandler(entry))

	srv := &http.Server{
		Handler: handlers.LoggingHandler(os.Stdout, mux),
		Addr:    "127.0.0.1:" + port,
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	return srv
	// log.Fatal(srv.ListenAndServe())
}

func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}
	log.Println("Get Index")
	return http.HandlerFunc(fn)
}
