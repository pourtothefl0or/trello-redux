import { RootState } from '../../store';

export const selectColumns = (state: RootState) => state.columns.columns;
