///<reference path="../interfaces/interfaces.d.ts" />

import BindingInSyntax from "./binding_in_syntax";
import BindingWhenSyntax from "./binding_when_syntax";
import BindingType from "../bindings/binding_type";

class BindingToSyntax<T> implements IBindingToSyntax<T> {

    private _binding: IBinding<T>;

    public constructor(binding: IBinding<T>) {
        this._binding = binding;
    }

    public to(constructor: { new(...args: any[]): T; }): IBindingInSyntax<T> {
        this._binding.type = BindingType.Instance;
        this._binding.implementationType = constructor;
        return new BindingInSyntax<T>(this._binding);
    }

    public toValue(value: T): IBindingWhenSyntax<T> {
        this._binding.type = BindingType.Value;
        this._binding.cache = value;
        return new BindingWhenSyntax<T>(this._binding);
    }

    public toConstructor(constructor: { new(...args: any[]): T; }): IBindingWhenSyntax<T> {
        this._binding.type = BindingType.Constructor;
        this._binding.implementationType = constructor;
        return new BindingWhenSyntax<T>(this._binding);
    }

    public toFactory(factory: (context) => T): IBindingWhenSyntax<T> {
        this._binding.type = BindingType.Factory;
        this._binding.factory = factory;
        return new BindingWhenSyntax<T>(this._binding);
    }

}

export default BindingToSyntax;
