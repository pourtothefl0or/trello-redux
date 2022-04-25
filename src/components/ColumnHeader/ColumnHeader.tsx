import React from 'react';
import { useToggle } from '../../customHooks';
import { useDispatch } from 'react-redux';
import { editColumn } from '../../store';
import { IColumn } from '../../types/interface';
import { useForm } from 'react-hook-form';
import { ButtonClose, PopupMore, PopupMoreItem } from '../../ui';
import { StyledColumnHeader, TitleInner, Title, CardsSum, ColumnForm, InputTitleLabel, InputTitle } from './styles';

interface ColumnProps {
  column: IColumn;
  cardsSum: number;
}

interface ColumnHeaderFields {
  columnTitle: string;
}

export const ColumnHeader: React.FC<ColumnProps> = ({ column, cardsSum }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue } = useForm<ColumnHeaderFields>();

  const [isEditMode, toggleIsEditMode] = useToggle(false);

  const onEditClick = () => {
    setValue('columnTitle', column.column);
    toggleIsEditMode();
  }

  const handleEditColumn = handleSubmit((data: ColumnHeaderFields) => {
    dispatch(editColumn(({ id: column.id, column: data.columnTitle })));
    toggleIsEditMode();
    reset();
  });

  return (
    <StyledColumnHeader>
      {
        isEditMode
          ?
          <ColumnForm onSubmit={handleEditColumn}>
            <InputTitleLabel>
              <InputTitle
                type="text"
                {...register('columnTitle', { required: true, })}
              />
            </InputTitleLabel>
            <ButtonClose type="submit" />
          </ColumnForm>
          :
          <>
            <TitleInner>
              <Title>{column.column}</Title>
            </TitleInner>
            <CardsSum>{cardsSum}</CardsSum>
            <PopupMore>
              <PopupMoreItem
                className="edit"
                onClick={onEditClick}
              >Edit</PopupMoreItem>
            </PopupMore>
          </>
      }
    </StyledColumnHeader>
  )
}
