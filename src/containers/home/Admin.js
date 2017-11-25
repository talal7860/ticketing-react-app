import React from 'react';
import { Card, CardTitle, CardSubtitle, CardBody, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Tickets from 'containers/tickets/Index';
import Customers from 'containers/customers/Index';
import SupportRepresentatives from 'containers/support_representatives/Index';

const AdminHome = () => (
	<div>
		<Row>
			<Col md="12">
				<Card>
					<CardBody>
						<CardTitle>Recent Tickets</CardTitle>
						<CardSubtitle>Recent Tickets</CardSubtitle>
						<Tickets perPage={5} actions={{show: true, delete: true}} />
					</CardBody>
				</Card>
			</Col>
		</Row>
		<Row>
			<Col md="6">
				<Card>
					<CardBody>
            <Link to={'/invite'} className='float-right'>New</Link>
						<CardTitle>Recent Support Representatives</CardTitle>
						<CardSubtitle>Recent Representatives</CardSubtitle>
						<SupportRepresentatives perPage={5} actions={{delete: true}} />
					</CardBody>
				</Card>
			</Col>
			<Col md="6">
				<Card>
					<CardBody>
						<CardTitle>Recent Customers</CardTitle>
						<CardSubtitle>Recent Customers</CardSubtitle>
						<Customers perPage={5} actions={{delete: true}} />
					</CardBody>
				</Card>
			</Col>
		</Row>
	</div>
);
export default AdminHome;
