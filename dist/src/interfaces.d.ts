export interface IModel {
    name: string;
    md?: {
        [k: string]: any;
    };
    props?: {
        [k: string]: any;
    };
    properties?: {
        [k: string]: any;
    };
}
export interface IChildComponentDescriptor {
    property: string;
    model: IModel | IModel[];
}
export declare type IChildrenResolver = (model: IModel) => IChildComponentDescriptor[];
export interface IModelVisitor {
    visitComponent(component: IModel): IModelVisitor;
    visitChildComponent(propertyName: string, component: IModel): IModelVisitor;
    leaveComponent(component: IModel): void;
}
export interface IFormModel {
    accept(visitor: IModelVisitor): void;
    insert(src: IModel, parent: IModel): void;
    remove(ref: IModel): void;
    commit(): void;
}
