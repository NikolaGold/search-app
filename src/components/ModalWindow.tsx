import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';

import styled from 'styled-components';
import { ErrorMap, SEND, CONTACT, NAME, EMAIL, PHONE, MESSAGE } from '../constants/constants';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const StyledDiv = styled.div`
  position: absolute;
  width: 400px;
  background-color: #eaeaea;
  border: 2px solid #000;
  box-shadow: dimgray;
  padding: 20px 40px 30px;
`;

const StyledInput = styled(TextField)`
  margin: 3px;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const ModalWindow = () => {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const { register, handleSubmit, errors } = useForm();
  // eslint-disable-next-line no-console
  const onSubmit = (data) => console.log(data);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <StyledDiv style={modalStyle}>
      <h2 id="contact">{CONTACT}:</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          name="name"
          id="name"
          inputRef={register({
            required: ErrorMap.name,
            pattern: {
              // eslint-disable-next-line
              value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+( [a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+)+$/,
              message: ErrorMap.name,
            },
          })}
          label={NAME}
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
        />
        <StyledInput
          name="email"
          inputRef={register({
            required: ErrorMap.email,
            pattern: {
              value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
              message: ErrorMap.email,
            },
          })}
          id="email"
          label={EMAIL}
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
        />
        <StyledInput
          name="phone"
          type="tel"
          inputRef={register({
            required: ErrorMap.phone,
            pattern: {
              // eslint-disable-next-line
              value: /^(\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)(\ )?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/,
              message: ErrorMap.phone,
            },
          })}
          id="phone"
          label={PHONE}
          variant="outlined"
          error={!!errors.phone}
          helperText={errors.phone && errors.phone.message}
        />
        <StyledInput
          name="message"
          inputRef={register({ required: true })}
          id="message"
          label={MESSAGE}
          variant="outlined"
          multiline
          error={!!errors.message}
          helperText={errors.message && ErrorMap.message}
          rowsMax={8}
        />

        <Button variant="contained" color="primary" type="submit">
          {SEND}
        </Button>
      </StyledForm>
    </StyledDiv>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {CONTACT}
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
};

export default ModalWindow;
