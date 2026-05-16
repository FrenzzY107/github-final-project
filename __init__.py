import os
import logging
from flask import Flask
from flask_cors import CORS
from flask_talisman import Talisman

# Membuat instance aplikasi Flask
app = Flask(__name__)

# Mengaktifkan Cross-Origin Resource Sharing (CORS)
CORS(app)

# Mengaktifkan keamanan Talisman Header
Talisman(
    app,
    content_security_policy=None,  # Disesuaikan dengan kebutuhan lingkungan lab
    force_https=False,             # Set False karena pengujian lokal/HTTP biasa
    strict_transport_security=False
)

# Mengatur konfigurasi log dasar
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Service initialized with Talisman security headers and CORS policies.")

# Import routes setelah app diinisialisasi untuk menghindari circular import
from service import routes
