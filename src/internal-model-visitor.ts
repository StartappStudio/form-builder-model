import { IModel, IModelVisitor } from './interfaces';

export class InternalModelVisitor implements IModelVisitor {
    public modelMap = new Map<IModel, IModel>();

    private parents: IModel[] = [];

    public visitComponent(component: IModel): IModelVisitor {
        this.parents.push(component);
        return this;
    }

    public visitChildComponent(propertyName: string, component: IModel): IModelVisitor {
        this.modelMap.set(component, this.parents[this.parents.length - 1]);

        return this;
    }

    public leaveComponent() {
        this.parents.pop();
    }
}
