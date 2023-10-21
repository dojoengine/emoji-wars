import { getEntityIdFromKeys, parseComponentValueFromGraphQLEntity } from "@dojoengine/utils";
import { setComponent, Components, ComponentValue } from "@latticexyz/recs";

export function setComponentFromGraphQLEntityTemp(components: Components, entity: any) {
    const keys = entity.keys.map((key: string) => BigInt(key));
    const entityIndex = getEntityIdFromKeys(keys);

    entity.models.forEach((model: any) => {
        const componentName = model.__typename;
        const component = components[componentName];

        if (!component) {
            console.error(`Component ${componentName} not found`);
            return;
        }

        const componentValues = Object.keys(component.schema).reduce((acc: ComponentValue, key) => {
            const value = model[key];
            const parsedValue = parseComponentValueFromGraphQLEntity(value, component.schema[key]);
            acc[key] = parsedValue;
            return acc;
        }, {});

        console.log(componentValues)
        setComponent(component, entityIndex, componentValues);
    });
}