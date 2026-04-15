const express = require('express')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const client = new DynamoDBClient({ region: 'us-east-1' })
const dynamo = DynamoDBDocumentClient.from(client)

app.get('/', (req, res) => res.json({ status: 'BGalarza CloudFolio API is running!' }))
app.get('/health', (req, res) => res.json({ status: 'healthy' }))

app.get('/projects', async (req, res) => {
  try {
    const result = await dynamo.send(new ScanCommand({ TableName: 'bgalarza-cloudfolio-projects' }))
    res.json(result.Items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/skills', async (req, res) => {
  try {
    const result = await dynamo.send(new ScanCommand({ TableName: 'bgalarza-cloudfolio-skills' }))
    res.json(result.Items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    const item = {
      contactId: uuidv4(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    }
    await dynamo.send(new PutCommand({ TableName: 'bgalarza-cloudfolio-contacts', Item: item }))
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => console.log('Server running on port 3000'))