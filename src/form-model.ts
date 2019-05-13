import { IChildrenResolver, IFormModel, IModel, IModelVisitor } from './interfaces';
import { InternalModelVisitor } from './internal-model-visitor';

export type PropertiesFieldName = 'md' | 'props' | 'properties';

export class FormModel implements IFormModel {
    private modelMap = new Map<IModel, IModel>();

    constructor(public model: IModel, private childrenResolver: IChildrenResolver, private propsName: PropertiesFieldName = 'props') {
        if (model) {
            this.makeModelMap();
        }
    }

    public accept(visitor: IModelVisitor) {
        this.acceptInternal(this.model, visitor);
    }

    public insert(src: IModel, parent: IModel) {
        const components = this.childrenResolver(parent);
        if (components && components.length) {
            const container = parent[this.propsName][components[0].property];
            if (Array.isArray(container)) {
                container.push(src);
            } else {
                throw Error(`Component '${parent.name} can not accept an insert operation`);
            }
        } else {
            const owner = this.findParentModel(parent);
            if (owner) {
                this.insert(src, owner);
            }
        }
    }

    public remove(ref: IModel) {
        const parent = this.findParentModel(ref);

        const components = this.childrenResolver(parent);
        components.forEach((component) => {
            const container = parent[this.propsName][component.property];
            if (Array.isArray(container)) {
                for (let i = 0; i < container.length; i++) {
                    const c = container[i];
                    if (c === ref) {
                        container.splice(i, 1);
                        break;
                    }
                }
            }
        });
    }

    public commit(): void {
        this.makeModelMap();
    }

    private makeModelMap(): void {
        const internalModelVisitor = new InternalModelVisitor();
        this.accept(internalModelVisitor);
        this.modelMap = internalModelVisitor.modelMap;
    }

    private acceptInternal(
        model: IModel,
        visitor: IModelVisitor
    ): void {
        const nodeVisitor = visitor.visitComponent(model);
        const components = this.childrenResolver(model);
        components.forEach((childDescriptor) => {
            if (Array.isArray(childDescriptor.model)) {
                childDescriptor.model.forEach((childModel) => {
                    const childVisitor = nodeVisitor.visitChildComponent(childDescriptor.property, childModel);
                    this.acceptInternal(childModel, childVisitor);
                });
            } else {
                const childVisitor = nodeVisitor.visitChildComponent(childDescriptor.property, childDescriptor.model);
                this.acceptInternal(childDescriptor.model, childVisitor);
            }
        });
        visitor.leaveComponent(model);
    }

    private findParentModel(ref: IModel): IModel {
        if (this.modelMap.has(ref)) {
            return this.modelMap.get(ref);
        } else {
            throw Error(`The model reference does not found`);
        }
    }
}
