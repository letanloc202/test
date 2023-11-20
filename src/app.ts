import express from "express"
import dotenv from 'dotenv'
import loaders from './loaders'
import db from './db/models';

dotenv.config()
const port = process.env.PORT || 3000;

const app = express()
loaders({ expressApp: app })

db.sequelize.sync({ logging: false }).then(() => {
    app.listen(port, () => {
        console.log(`App listening on port http://localhost:${port}/`);
    });
});
