/**
 * Funciones requeridas:
 * 1. Apertura de caja
 * 2. Cierre de caja
 * 3. registro de consignaciones
 * 4. registro de gastos menores  
 */

//Importar Modulos
const { findByIdAndUpdate } = require('../models/stock_item');
const StockItem = require('../models/stock_item');
const Product = require('../models/product');