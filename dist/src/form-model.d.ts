import { IChildrenResolver, IFormModel, IModel, IModelVisitor } from './interfaces';
export declare type PropertiesFieldName = 'md' | 'props' | 'properties';
export declare class FormModel implements IFormModel {
    model: IModel;
    private childrenResolver;
    private propsName;
    private modelMap;
    constructor(model: IModel, childrenResolver: IChildrenResolver, propsName?: PropertiesFieldName);
    accept(visitor: IModelVisitor): void;
    insert(src: IModel, parent: IModel): void;
    remove(ref: IModel): void;
    commit(): void;
    private insertAt;
    private makeModelMap;
    private acceptInternal;
    private findParentModel;
}
