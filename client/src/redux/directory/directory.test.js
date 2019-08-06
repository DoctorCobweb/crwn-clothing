import directoryReducer, { INITIAL_STATE } from './directory.reducer';

describe('directoryReducer test', () => {
  it('should return initial state', () => {
    expect(directoryReducer(INITIAL_STATE, { type: null })).toEqual(INITIAL_STATE);
  });
});

