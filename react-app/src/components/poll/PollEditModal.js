import React, { useState } from 'react';
import { Modal } from '../context/Modal'
import PollEdit from './PollEdit';

function PollEditModal({ setRefresh }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='form-button' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PollEdit
            handleCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default PollEditModal;
