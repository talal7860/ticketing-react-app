import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const FormInput = ({ id, label, name, type, placeholder, onChange, value }) => (
	<FormGroup>
		<Label for={id}>{label}</Label>
		<Input type={type} name={name} id={id} onChange={onChange} placeholder={placeholder} value={value} />
	</FormGroup>
);


FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

FormInput.defaultProps = {
  value: "",
};

export default FormInput;
