import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/ducks';
import { Input, Modal, Textarea } from '../../ui';
import { CardForm, CardFormButton } from './styles';

interface BoardFields {
  cardTitle: string;
  cardDescription: string;
}

interface ModalAddCardProps {
  columnId: number;
  isModal: boolean;
  toggleModal: () => void;
}

export const ModalAddCard: React.FC<ModalAddCardProps> = ({ columnId, isModal, toggleModal }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<BoardFields>({ mode: 'onChange' });


  const handleAddCard = handleSubmit((data: BoardFields) => {
    dispatch(actions.cards.addCard({
      id: Date.now(),
      columnId: columnId,
      title: data.cardTitle,
      description: data.cardDescription
    }));
    toggleModal();
    reset();
  });

  return (
    <Modal
      title="Add card"
      modalVisibility={isModal}
      onCloseClick={() => toggleModal()}
    >
      <CardForm onSubmit={handleAddCard}>
        <Input
          title="Title"
          type="text"
          {...register('cardTitle', { required: true, })}
          className={errors.cardTitle && 'error'}
        />
        <Textarea
          title="Description"
          {...register('cardDescription', { required: true, })}
          className={errors.cardDescription && 'error'}
        />
        <CardFormButton
          type="submit"
          disabled={!isValid}
        >Add</CardFormButton>
      </CardForm>
    </Modal>
  );
}
