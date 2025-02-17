"use strict"

import { config } from "dotenv"
import { initServer } from "./configs/server.js"

config()
initServer()