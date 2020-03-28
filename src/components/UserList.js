import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function UserList() {
  return (
  	<>
  	<h1>Lista de usuarios</h1>
  	<br />
    <Card border="danger" style={{ width: '18rem' }}>
    	<Card.Header>Juan Sebastián Jaramillo</Card.Header>
	    <Card.Body>
	    	<Card.Title><strong>Puntaje: 14</strong></Card.Title>
	      	<Card.Text>
	        <ul>
		    	<li><strong>Edad:</strong> 31</li>
		      	<li><strong>Comorbilidades:</strong> EPOC</li>
	     	</ul>
      	  	</Card.Text>
    	</Card.Body>
  	</Card>
  	<br />
  	<Card border="secondary" style={{ width: '18rem' }}>
    	<Card.Header>Camilo Velásquez</Card.Header>
	    <Card.Body>
	    	<Card.Title><strong>Puntaje: 10</strong></Card.Title>
	      	<Card.Text>
	        <ul>
	      		<li><strong>Edad:</strong> 21</li>
	      		<li><strong>Comorbilidades:</strong> EPOC</li>
	     	</ul>
      	  	</Card.Text>
    	</Card.Body>
  	</Card>
  	<br />
  	<Card border="primary" style={{ width: '18rem' }}>
    	<Card.Header>Alejandro Sánchez</Card.Header>
	    <Card.Body>
	    	<Card.Title><strong>Puntaje: 11</strong></Card.Title>
	      	<Card.Text>
      		<ul>
	      		<li><strong>Edad:</strong> 24</li>
	      		<li><strong>Comorbilidades:</strong> Asma</li>
     		</ul>
      	  	</Card.Text>
    	</Card.Body>
  	</Card>
  	<br />
  	<Card border="success" style={{ width: '18rem' }}>
    	<Card.Header>Felipe Torres</Card.Header>
	    <Card.Body>
	    	<Card.Title><strong>Puntaje: 9</strong></Card.Title>
	      	<Card.Text>
	        <ul>
	      		<li><strong>Edad:</strong> 19</li>
	      		<li><strong>Comorbilidades:</strong> Ninguna</li>
     		</ul>
      	  	</Card.Text>
    	</Card.Body>
  	</Card>
  	<br />
  	</>
  );
}

export default UserList;
