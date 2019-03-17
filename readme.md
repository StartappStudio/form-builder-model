The FormBuilder Model package.
=

This package is a part of FormBuilder technology powered by [Startapp.studio](https://www.startapp.studio).

The model is a hierarchical representation of the DOM as JSON. Includes a visitor design pattern that allows you to change the representation of the model.

The key interface is
```ts
interface IModel {
    name: string;
    props: { 
        [prop: string]: any;
    }
}
```

- name is a form name
- props is a object with component'attributes and their values



An example that shows how a model might look.
```json
{
    "name": "button",
    "props": {
        "type": "submit",
        "class": "btn submit"
    }
}
```

Test
-

```bash
npm run test
```

Licence
-

MIT
