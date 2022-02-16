import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { JsonSaverState, JsonSaverStateModel } from './json-saver.state';

describe('JasonSaver state', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([JsonSaverState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(JsonSaverState.getState);
        const expected: JsonSaverStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
