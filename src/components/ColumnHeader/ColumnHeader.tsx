import React, { useState } from 'react';
import { useToggle } from '../../customHooks';
import { ColumnFunctions } from '../../types/functions';
import { IColumn } from '../../types/interfaces';
import { ButtonClose, PopupMore, PopupMoreItem } from '../../ui';
import { StyledColumnHeader, TitleInner, Title, CardsSum, ColumnForm, InputTitleLabel, InputTitle } from './styles';

interface ColumnProps extends ColumnFunctions {
  column: IColumn;
  cardsSum: number;
}

export const ColumnHeader: React.FC<ColumnProps> = ({ column, cardsSum, ...props }) => {
  const [inputValue, setInputValue] = useState('');
  const [isEditMode, toggleIsEditMode] = useToggle(false);

  const handleEditColumn: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputValue) props.editColumn({ id: column.id, column: inputValue });

    toggleIsEditMode();
  };

  return (
    <StyledColumnHeader>
      {
        isEditMode
          ?
          <ColumnForm onSubmit={handleEditColumn}>
            <InputTitleLabel>
              <InputTitle
                type="text"
                name="columnTitle"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                required
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
                onClick={() => {
                  setInputValue(column.column);
                  toggleIsEditMode()}
                }
              >Edit</PopupMoreItem>
            </PopupMore>
          </>
      }
    </StyledColumnHeader>
  )
}
