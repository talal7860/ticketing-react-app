import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Card, CardTitle, CardSubtitle, CardBody  } from 'reactstrap';
import Tickets from 'containers/tickets/Index';

const CustomerHome = () => (
	<Card>
		<CardBody>
			<CardTitle>My Tickets</CardTitle>
			<CardSubtitle>My Posted Tickets</CardSubtitle>
			<Link to={'/tickets/new'}>
				<Button className='post-new-ticket'>Post New Ticket</Button>
			</Link>
			<Tickets perPage={5} />
		</CardBody>
	</Card>
);
export default withRouter(CustomerHome);
