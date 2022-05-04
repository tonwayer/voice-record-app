import socketserver
from threading import Thread
from queue import Queue
import logging
import http.server

PORT = 8000

log_fmt = '[%(levelname)s] (%(threadName)-10s) %(message)s'
logging.basicConfig(level=logging.DEBUG, format=log_fmt)


class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass


def help_server(server_queue):
    file_handler = http.server.SimpleHTTPRequestHandler
    server = ThreadedTCPServer(("", PORT), file_handler)
    logging.debug("serving at port %d", PORT)
    server_queue.put(server)
    server.serve_forever()

def start_help_server():
    server_queue = Queue()
    server_thread = Thread(target=help_server, args=[server_queue])
    server_thread.daemon = True
    server_thread.start()
    logging.debug("Server loop running in thread: %s", server_thread.name)
    return server_queue.get()

def shutdown_help_server(server):
    logging.debug("Shutdown help server")
    server.shutdown()
