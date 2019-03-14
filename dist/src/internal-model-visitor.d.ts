import { IModel, IModelVisitor } from './interfaces';
export declare class InternalModelVisitor implements IModelVisitor {
    modelMap: Map<IModel, IModel>;
    private parents;
    visitComponent(component: IModel): IModelVisitor;
    visitChildComponent(propertyName: string, component: IModel): IModelVisitor;
    leaveComponent(): void;
}
