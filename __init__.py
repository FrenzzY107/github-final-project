import os
import logging
from flask import Flask
from flask_cors import CORS
from flask_talisman import Talisman

# 1. Inisialisasi Aplikasi Flask
app = Flask(__name__)

# 2. Aktifkan Cross-Origin Resource Sharing (CORS)
CORS(app)

# 3. Aktifkan Keamanan Talisman (Security Headers)
Talisman(
    app,
    content_security_policy=None,
    force_https=False,
    strict_transport_security=False
)

# 4. Atur Logging Dasar
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Service initialized with Talisman security headers and CORS.")

# Import routes di bagian paling bawah untuk menghindari circular import
from service import routes
