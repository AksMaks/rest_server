import express from "express"
import path from "path"
import Category from "./routes/Category.js"
import Delivery from "./routes/Delivery.js"
import DeliveryComposition from "./routes/DeliveryComposition.js"
import Distributor from "./routes/Distributor.js"
import Position from "./routes/Position.js"
import Product from "./routes/Product.js"
import ProductDistributor from "./routes/ProductDistributor.js"
import ProductPosition from "./routes/ProductPosition.js"
import Unit from "./routes/Unit.js"
import Workman from "./routes/Workman.js"
import WorkmanPosition from "./routes/WorkmanPosition.js"

const app = new express()

const PORT = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const __dirname = path.resolve()

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "index.html"))
})

app.use('/api/Category', Category)
app.use('/api/Delivery', Delivery)
app.use('/api/DeliveryComposition', DeliveryComposition)
app.use('/api/Distributor', Distributor)
app.use('/api/Position', Position)
app.use('/api/Product', Product)
app.use('/api/ProductDistributor', ProductDistributor)
app.use('/api/ProductPosition', ProductPosition)
app.use('/api/Unit', Unit)
app.use('/api/Workman', Workman)
app.use('/api/WorkmanPosition', WorkmanPosition)

async function start() {
  try{
    app.listen(PORT, () => console.log(`Starn in port ${PORT}`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()