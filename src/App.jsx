import React, { useState } from 'react';
import { Connection,clusterApiUrl, LAMPORTS_PER_SOL} from '@solana/web3.js';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');


function TransactionDetails() {
  const [TxId, setTxId] = useState(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState(null);
  const [TxData, setTxData] = useState(null);

  const getTx = async () => {
    try {
      const tx = await connection.getParsedTransaction(TxId);
      if (tx) {
        setTxData(tx);
        setSignature(TxId); 
      }
      setError(null);
      if (!tx) {
        setError('Invalid transaction ID');
        setTxData(null);
        return;
      }
    } catch (error) {
        setTxData(null);
        setError('Invalid transaction ID');
    }
  };

  const handleTxIdChange = (e) => {
    setTxId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getTx();
  };


  return (
    <div className="App">
      <Card className="text-center">
        <Card.Header><h2>Transaction Visualizer</h2></Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label><h3>Transaction ID</h3></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter transaction ID...  (Devnet)"
                onChange={handleTxIdChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Get Details 
            </Button>
          </Form>
          <br />
          {error && <Alert variant="danger">{error}</Alert>}
          {TxData && (
            <Card>
              <Card.Body>
                <Card.Title>Transaction Details</Card.Title>
                <Card.Text>
                  <p>Signature: {signature}</p>
                  <p>Result: {TxData['meta']['err'] ? 'Failed' : 'Success'}</p>
                  <p>Fee: {TxData['meta']['fee']/LAMPORTS_PER_SOL} SOL</p>
                  <p>Slot: {Intl.NumberFormat().format(TxData['slot'])}</p>
                  <p>Block Time: {new Date(TxData['blockTime']*1000).toLocaleString()}</p>
                  </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TransactionDetails />
    </div>
  );
}

export default App;













