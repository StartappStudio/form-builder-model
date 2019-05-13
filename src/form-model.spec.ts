import { FormModel } from './form-model';
import { IChildrenResolver, IModel } from './interfaces';

describe('model tests', () => {

    const childrenResolver: IChildrenResolver = (model: IModel) => {
        switch(model.name) {
            case 'container': {
                return [{
                    property: 'components',
                    model: model.props.components
                }];
            }

            default: {
                return [];
            }
        }
        
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

    describe('insert at not container', () => {
        let model: FormModel;
        beforeEach(() => {
            model = new FormModel({
                name: 'container',
                props: {
                    components: [
                        {
                            name: 'button',
                            props: {}
                        }
                    ]
                }
            }, (m) => childrenResolver(m));
        });

        it('should insert object into parent', () => {
            const src: IModel = {
                name: 'container',
                props: {
                    components: []
                }
            };

            model.insert(src, model.model.props.components[0]);
            expect(model.model.props.components.length).toBe(2);
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
