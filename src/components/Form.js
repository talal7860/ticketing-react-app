import React from 'react';
import { Button, Form as BForm, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import AlertError from './AlertError';
import PropTypes from 'prop-types';
const Form = ({ children, title, subtitle, onSubmit, error }) => (
  <Card>
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
      <BForm onSubmit={onSubmit}>
        <AlertError error={error} />
        {children}
        <Button color="success">Submit</Button>
      </BForm>
    </CardBody>
  </Card>
);

Form.propTypes = {
  children: PropTypes.array,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Form.defaultProps = {
  children: null,
  error: null,
};
export default Form;
