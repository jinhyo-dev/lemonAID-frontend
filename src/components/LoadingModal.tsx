import Modal from 'react-modal';
import styled from 'styled-components';

const LoadingModal = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '280px',
      padding: '0',
      zIndex: 11,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'none',
      border: 'none',
    },
    overlay: {
      overflow: 'auto',
      zIndex: 11,
      backgroundColor: 'rgba(0, 0, 0, .7)',
      backdropFilter: 'blur(2px)',
    },
  };

  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={true}
      style={customStyles}
    >
      <ModalContainer>
        <div className={'spinner-container'}>
          <div className='spinner'>
            <div className='dot' />
            <div className='dot' />
            <div className='dot' />
            <div className='dot' />
            <div className='dot' />
          </div>
        </div>
        <div className={'loading'}>Loading...</div>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;

  .spinner-container {
    margin-top: 60px;
    width: 100%;
    height: 38%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 65px;
    height: 65px;
    position: relative;
  }

  .spinner .dot {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
  }

  .spinner .dot::after {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #FAE13E;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner .dot {
    animation: spin 2s infinite;
  }

  .spinner .dot:nth-child(2) {
    animation-delay: 100ms;
  }

  .spinner .dot:nth-child(3) {
    animation-delay: 200ms;
  }

  .spinner .dot:nth-child(4) {
    animation-delay: 300ms;
  }

  .spinner .dot:nth-child(5) {
    animation-delay: 400ms;
  }

  .loading {
    width: 100%;
    text-align: center;
    font-size: 1.85rem;
    font-family: 'Commissioner', sans-serif;
    color: #FAE13E;
  }
`;

export default LoadingModal;