import Modal from 'react-modal';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
}

const LoadingModal = ({ isOpen }: ModalProps) => {
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
      isOpen={isOpen}
      style={customStyles}
      ariaHideApp={false}
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
        <div className={'loading'}>Loading ...</div>
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

    @media (max-width: 500px) {
      height: 28%;
    }
  }

  .spinner {
    width: 65px;
    height: 65px;
    position: relative;
    
    @media (max-width: 500px) {
      width: 40px;
      height: 40px;
    }
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

    @media (max-width: 500px) {
      width: 6px;
      height: 6px;
    }
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
    font-family: 'KoPubWorldDotumBold', sans-serif;
    color: #FAE13E;

    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
`;

export default LoadingModal;