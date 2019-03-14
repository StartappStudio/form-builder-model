import { FormModel } from './form-model';
import { IChildrenResolver, IModel } from './interfaces';

describe('model tests', () => {

    const childrenResolver: IChildrenResolver = (model: IModel) => {
        return [{
            property: 'components',
            model: model.props.components
        }];
    };

    describe('insert', () => {
        let model: FormModel;
        beforeEach(() => {
            model = new FormModel({
                name: 'container',
                props: {
                    components: []
                }
            }, (m) => childrenResolver(m));
        });

        it('should insert object', () => {
            const src: IModel = {
                name: 'container',
                props: {
                    components: []
                }
            };

            model.insert(src, model.model);
            expect(model.model.props.components.length).toBe(1);
        });
    });

    describe('remove', () => {
        let model: FormModel;
        beforeEach(() => {
            model = new FormModel({
                name: 'container',
                props: {
                    components: [
                        {
                            name: 'container',
                            props: {
                                components: []
                            }
                        }
                    ]
                }
            }, (m) => childrenResolver(m));
        });

        it('should remove object', () => {
            const ref = model.model.props.components[0];
            model.remove(ref);

            expect(model.model.props.components.length).toBe(0);
        });
    });
});
