import React from 'react';
import { useToggle } from '../../customHooks';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from '../../store/ducks';
import { ButtonClose, PopupMore, PopupMoreItem } from '../../ui';
import { StyledColumnHeader, TitleInner, Title, CardsSum, ColumnForm, InputTitleLabel, InputTitle } from './styles';

interface ColumnProps {
  columnId: number;
  cardsSum: number;
}

interface ColumnHeaderFields {
  columnTitle: string;
}

export const ColumnHeader: React.FC<ColumnProps> = ({ columnId, cardsSum }) => {
  const columns = useSelector(selectors.columns.findColumnsById(columnId));
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ColumnHeaderFields>();

  const [isEditMode, toggleIsEditMode] = useToggle(false);

  const onEditClick = () => {
    setValue('columnTitle', columns?.column || '');
    toggleIsEditMode();
  }

  const handleEditColumn = handleSubmit((data: ColumnHeaderFields) => {
    dispatch(actions.columns.editColumn(({ id: columns?.id, column: data.columnTitle })));
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
                className={errors.columnTitle && 'error'}
              />
            </InputTitleLabel>
            <ButtonClose type="submit" />
          </ColumnForm>
          :
          <>
            <TitleInner>
              <Title>{columns?.column}</Title>
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
