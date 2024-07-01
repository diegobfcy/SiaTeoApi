const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();
const port = 3008;

app.use(bodyParser.json());


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'SiaTeoProject',
    port: 5432 
});

app.use(cors());
// Crear un nuevo cliente
app.post('/clientes', async (req, res) => {
    const { nombre, direccion, telefono, email, tipo_documento_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Clientes (nombre, direccion, telefono, email, tipo_documento_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, direccion, telefono, email, tipo_documento_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer todos los clientes
app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Clientes');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer un cliente por ID
app.get('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Clientes WHERE cliente_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un cliente por ID
app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, email, tipo_documento_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Clientes SET nombre = $1, direccion = $2, telefono = $3, email = $4, tipo_documento_id = $5 WHERE cliente_id = $6 RETURNING *',
            [nombre, direccion, telefono, email, tipo_documento_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un cliente por ID
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Clientes WHERE cliente_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Crear un nuevo producto
app.post('/productos', async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Productos (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
            [nombre, descripcion, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer todos los productos
app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Productos');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer un producto por ID
app.get('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Productos WHERE producto_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un producto por ID
app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Productos SET nombre = $1, descripcion = $2, precio = $3 WHERE producto_id = $4 RETURNING *',
            [nombre, descripcion, precio, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Productos WHERE producto_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Crear un nuevo método de pago
app.post('/metodos_pago', async (req, res) => {
    const { nombre } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO MetodosPago (nombre) VALUES ($1) RETURNING *',
            [nombre]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer todos los métodos de pago
app.get('/metodos_pago', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM MetodosPago');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer un método de pago por ID
app.get('/metodos_pago/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM MetodosPago WHERE metodo_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un método de pago por ID
app.put('/metodos_pago/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const result = await pool.query(
            'UPDATE MetodosPago SET nombre = $1 WHERE metodo_id = $2 RETURNING *',
            [nombre, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un método de pago por ID
app.delete('/metodos_pago/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM MetodosPago WHERE metodo_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Crear una nueva factura
app.post('/facturas', async (req, res) => {

    const {  cliente_id, total } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Facturas (cliente_id, total) VALUES ($1, $2) RETURNING *',
            [ cliente_id, total]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer todas las facturas
app.get('/facturas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Facturas');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer una factura por ID
app.get('/facturas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Facturas WHERE factura_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una factura por ID
app.put('/facturas/:id', async (req, res) => {
    const { id } = req.params;
    const { cliente_id, total } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Facturas SET cliente_id = $1, total = $2 WHERE factura_id = $3 RETURNING *',
            [cliente_id, total, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una factura por ID
app.delete('/facturas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Facturas WHERE factura_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/notas_abono', async (req, res) => {
    const { factura_id, total, metodo_pago_id, estado, detalles } = req.body;

    try {
        await pool.query('BEGIN'); // Iniciar transacción

        // Convertir detalles a JSON
        const detallesJSON = JSON.stringify(detalles);

        // Llamar al procedimiento almacenado para agregar la nota de abono
        await pool.query(
            'SELECT agregar_nota_abono($1, $2, $3, $4)',
            [factura_id, metodo_pago_id, estado, detallesJSON] // Pasar detallesJSON en lugar de detalles
        );

        await pool.query('COMMIT'); // Confirmar transacción

        res.status(201).json({ message: 'Nota de abono creada exitosamente' });
    } catch (error) {
        await pool.query('ROLLBACK'); // Revertir transacción en caso de error
        console.error('Error al crear nota de abono:', error);
        res.status(500).json({ error: error.message });
    }
});

// Leer todas las notas de abono
app.get('/notas_abono', async (req, res) => {
    try {
        const query = `
            SELECT
                na.nota_abono_id,
                c.nombre AS cliente_nombre,
                na.fecha_emision AS fecha,
                mp.nombre AS metodopago_nombre,
                na.total,
                na.estado
            FROM
                public.notasabono na
                INNER JOIN public.facturas f ON na.factura_id = f.factura_id
                INNER JOIN public.clientes c ON f.cliente_id = c.cliente_id
                LEFT JOIN public.metodospago mp ON na.metodo_pago_id = mp.metodo_id;
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Leer una nota de abono por ID
app.get('/notas_abono/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM NotasAbono WHERE nota_abono_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nota de abono no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una nota de abono por ID
app.put('/notas_abono/:id', async (req, res) => {
    const { id } = req.params;
    const { factura_id, total, metodo_pago_id, estado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE NotasAbono SET factura_id = $1, total = $2, metodo_pago_id = $3, estado = $4 WHERE nota_abono_id = $5 RETURNING *',
            [factura_id, total, metodo_pago_id, estado, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nota de abono no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una nota de abono por ID
app.delete('/notas_abono/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM NotasAbono WHERE nota_abono_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nota de abono no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Crear un nuevo detalle de nota de abono
app.post('/detalles_nota_abono', async (req, res) => {
    const { nota_abono_id, producto_id, cantidad, precio_unitario, subtotal } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO DetallesNotaAbono (nota_abono_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nota_abono_id, producto_id, cantidad, precio_unitario, subtotal]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer todos los detalles de notas de abono
app.get('/detalles_nota_abono/:id', async (req, res) => {
    const notaAbonoId = parseInt(req.params.id);
    try {
        const query = `
            SELECT * FROM obtener_datos_nota_abono_por_id($1);
        `;
        const result = await pool.query(query, [notaAbonoId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Actualizar un detalle de nota de abono por ID
app.put('/detalles_nota_abono/:id', async (req, res) => {
    const { id } = req.params;
    const { nota_abono_id, producto_id, cantidad, precio_unitario, subtotal } = req.body;
    try {
        const result = await pool.query(
            'UPDATE DetallesNotaAbono SET nota_abono_id = $1, producto_id = $2, cantidad = $3, precio_unitario = $4, subtotal = $5 WHERE detalle_id = $6 RETURNING *',
            [nota_abono_id, producto_id, cantidad, precio_unitario, subtotal, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Detalle de nota de abono no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un detalle de nota de abono por ID
app.delete('/detalles_nota_abono/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM DetallesNotaAbono WHERE detalle_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Detalle de nota de abono no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Crear un nuevo tipo de documento
app.post('/tipo_documento', async (req, res) => {
    const { nombre } = req.body;
    console.log(req.body);
    try {
        const result = await pool.query(
            'INSERT INTO TipoDocumento (nombre) VALUES ($1) RETURNING *',
            [nombre]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer todos los tipos de documento
app.get('/tipo_documento', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TipoDocumento');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer un tipo de documento por ID
app.get('/tipo_documento/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM TipoDocumento WHERE tipo_documento_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tipo de documento no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un tipo de documento por ID
app.put('/tipo_documento/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const result = await pool.query(
            'UPDATE TipoDocumento SET nombre = $1 WHERE tipo_documento_id = $2 RETURNING *',
            [nombre, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tipo de documento no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un tipo de documento por ID
app.delete('/tipo_documento/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM TipoDocumento WHERE tipo_documento_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tipo de documento no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
