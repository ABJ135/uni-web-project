const express = require("express")
const app = express()
const port = 3000 
const db = require('./db')

const userRouter = require('./router/user.router')
const employeeRouter = require('./router/employee.router')
const attendenceRouter = require('./router/Attendence.router')
const payrollRouter = require('./router/payroll.router')

app.use(express.json())

app.use('/user',userRouter)
app.use('/employee',employeeRouter)
app.use('/attendence',attendenceRouter)
app.use('/payroll',payrollRouter)

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})