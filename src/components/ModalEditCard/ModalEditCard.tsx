import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions, selectors } from '../../store/ducks';
import { Input, Modal, Textarea } from '../../ui';
import { CardForm, CardFormButton } from './styles';

interface BoardFields {
  cardTitle: string;
  cardDescription: string;
}

interface ModalAddCardProps {
  cardId: number;
  isModal: boolean;
  toggleModal: () => void;
}

export const ModalEditCard: React.FC<ModalAddCardProps> = ({ cardId, isModal, toggleModal }) => {
  const card = useSelector(selectors.cards.findCardById(cardId));

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BoardFields>({ mode: 'onChange' });

  useEffect(() => {
    if (card) {
      setValue('cardTitle', card.title);
      setValue('cardDescription', card.description);
    }
    // eslint-disable-next-line
  }, [isModal]);

  const handleEditCard = handleSubmit((data: BoardFields) => {
    dispatch(actions.cards.editCard({
      id: cardId,
      title: data.cardTitle,
      description: data.cardDescription
    }));
    toggleModal();
    reset();
  });

  return (
    <Modal
      title="Edit card"
      modalVisibility={isModal}
      onCloseClick={() => toggleModal()}
    >
      <CardForm onSubmit={handleEditCard}>
        <Input
          title="Title"
          type="text"
          {...register('cardTitle', { required: true, })}
          className={errors.cardTitle && 'error'}
        />
        <Textarea
          title="Description"
          {...register('cardDescription')}
          className={errors.cardDescription && 'error'}
        />
        <CardFormButton
          type="submit"
          disabled={errors.cardTitle && true}
        >Edit</CardFormButton>
      </CardForm>
    </Modal>
  );
}
