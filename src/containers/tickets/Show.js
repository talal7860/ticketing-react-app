import React, { Component } from 'react';
import {
	Card,
	CardTitle,
	CardSubtitle,
	CardBody,
	Table,
	Row,
	Col,
	Alert,
	Button
} from 'reactstrap';
import { getRequest, postRequest } from 'utils/HttpUtil';
import Messages from 'containers/messages/Index';
import { getUserInfo } from 'utils/UserUtil';
import { USER_TYPE_SUPPORT_REPRESENTATIVE, ticketApi } from 'consts/AppConstant';
import Header from 'components/Header';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';

class ShowTicket extends Component {

	constructor(props) {
		super(props);
		this.state = { ticket: null, columns: null, user: null };
		this.fetch = this.fetch.bind(this);
		this.loadMessages = this.loadMessages.bind(this);
		this.workOnTicket = this.workOnTicket.bind(this);
		this.resolveTicket = this.resolveTicket.bind(this);
		this.supportActionButton = this.supportActionButton.bind(this);
	}

	fetch() {
		const self = this;
		const {
			props: {
				match: { params: { ticketId } }
			}
		} = this;
		getRequest(`/api/tickets/${ticketId}`)
			.then(response => {
				self.setState({ ticket: response.data, columns: self.columns });
			})
			.catch(error => {
				self.setState({ error });
			});
	}

	componentDidMount() {
		this.fetch();
		const self = this;
		getUserInfo()
			.then(user => {
				self.setState({ user });
			});
	}

	loadMessages() {
		const {
			state: { ticket, user },
			props: {
				match: {
					params: { ticketId },
				}
			},
		} = this;
		if (ticket && user) {
			if (user.type === USER_TYPE_SUPPORT_REPRESENTATIVE && ticket.status === 'open') {
        return <Alert color="warning">Please assign this ticket to yourself to see messages.</Alert>;
			}
		}
    return <Messages perPage={5} ticketId={ticketId} />;
	}

	workOnTicket() {
		const {
			props: {
				match: {
					params: { ticketId }
				}
			},
			fetch,
		} = this;
		postRequest(ticketApi({ url: `${ticketId}/work` }))
			.then(fetch)
			.catch(err => {
        alert(err);
			});
	}

	resolveTicket() {
		const {
			props: {
				match: {
					params: { ticketId }
				}
			},
			fetch,
		} = this;
		postRequest(ticketApi({ url: `${ticketId}/resolve` }))
			.then(fetch)
			.catch(err => {
        alert(err);
			});
	}

	supportActionButton() {
		const {
			state: { ticket, user },
			workOnTicket,
			resolveTicket
		} = this;
		if (user && ticket) {
			if (user.type === USER_TYPE_SUPPORT_REPRESENTATIVE) {
				if (ticket.status === 'open') {
					return <Button color='primary' onClick={workOnTicket}>Work</Button>;
				} else if (ticket.status === 'assigned' && ticket.assigned_to.id === user.id) {
					return <Button color='success' onClick={resolveTicket}>Resolve</Button>;
				}
			}
		} else {
			return null;
		}
	}

	render() {
		const {
			state: { ticket },
			loadMessages,
			supportActionButton,
		} = this;

		return (
      <div>
        <Navbar />
        <Header />
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle>Ticket Detail</CardTitle>
                <CardSubtitle>Ticket Detail</CardSubtitle>
                {ticket ? (
                  <div>
                    {supportActionButton()}
                    <Table>
                      <tbody>
                        <tr>
                          <td>Title</td>
                          <td>{ticket.title}</td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>{ticket.description}</td>
                        </tr>
                        <tr>
                          <td>Owner</td>
                          <td>{ticket.owner.name}</td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td>{ticket.status}</td>
                        </tr>
                        <tr>
                          <td>Assigned To</td>
                          <td>{ticket.assigned_to ? ticket.assigned_to.name : 'N/A'}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                ) : <Alert color="info">Loading...</Alert>}
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle>Messages</CardTitle>
                <CardSubtitle>Messages for this ticket</CardSubtitle>
                {loadMessages()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
		);
	}
}

ShowTicket.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ShowTicket;
