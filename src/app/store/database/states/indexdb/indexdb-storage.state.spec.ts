// import { NgxsModule, Store } from '@ngxs/store';
// import { async, TestBed } from '@angular/core/testing';
// import { LocalStorageState, DictionaryStateModel } from './local-storage.state';
//
// describe('[TEST]: Dictionary state', () => {
//   let store: Store;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [NgxsModule.forRoot([LocalStorageState])]
//     })
//       .compileComponents()
//       .then();
//     store = TestBed.get(Store);
//   }));
//
//   it('Should be correct dispatch and dictionary is empty', () => {
//     const dictionary: DictionaryStateModel = {
//       content: [],
//       page: 0,
//       size: 0,
//       totalPages: 0,
//       totalElements: 0
//     };
//     store.dispatch(new SetDictionaryData(dictionary));
//     const actual = store.selectSnapshot(LocalStorageState.getDictionaryState);
//     expect(actual).toEqual(dictionary);
//   });
//
//   it('Should be state is filled DictionaryStateModel', () => {
//     const dictionary: DictionaryStateModel = {
//       content: data,
//       page: 0,
//       size: 20,
//       totalPages: 2,
//       totalElements: 1
//     };
//     store.dispatch(new SetDictionaryData(dictionary));
//     const actual = store.selectSnapshot(LocalStorageState.getDictionaryState);
//     expect(actual).toEqual(dictionary);
//   });
//
//   it('should be reset state', function() {
//     const dictionary: DictionaryStateModel = {
//       content: [],
//       page: 0,
//       size: 0,
//       totalPages: 0,
//       totalElements: 0
//     };
//     store.dispatch(new DictionaryReset());
//     const actual = store.selectSnapshot(LocalStorageState.getDictionaryState);
//     expect(actual).toEqual(dictionary);
//   });
// });
