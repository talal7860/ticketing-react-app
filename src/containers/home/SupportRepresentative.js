import React from 'react';
import { Card, CardTitle, CardSubtitle, CardBody  } from 'reactstrap';
import Tickets from 'containers/tickets/Index';

const SupportRepresentativeHome = () => (
	<Card>
		<CardBody>
			<CardTitle>Recent Tickets</CardTitle>
			<CardSubtitle>Recent Tickets</CardSubtitle>
			<Tickets perPage={5} />
		</CardBody>
	</Card>
);
export default SupportRepresentativeHome;
