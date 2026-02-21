/// 1. Рендер списка, пропс key

/// Для отображения списка элементов в React, мы можем использовать map() и filter()
///Например
const people = [{
        id: 1, 
        name: 'John',
        profession: 'developer'
    },{
        id: 2, 
        name: 'Jane',
        profession: 'designer'
    }, {
        id: 3, 
        name: 'Jack',
        profession: 'manager'
    }, {
        id: 4, 
        name: 'George',
        profession: 'developer'
    }
]

export default function List(){
    const developers = people.filter(person => person.profession === 'developer');
    const listItems = developers.map(person =>
        <li>
            <p>
                {person.name}:
                {' ' + person.profession}
            </p>
        </li>
    )
    return <ul>{listItems}</ul>;
}

/// Но тут мы получим ошибку "Warning: Each child in a list should have a unique “key” prop."
/// Это происходит потому что React использует ключи для оптимизации рендеринга списков. 
/// Ключи помогают React идентифицировать, какие элементы были изменены, добавлены или удалены. 
/// Поэтому каждому элементу списка нужно присвоить уникальный ключ, который обычно является id элемента. 

export default function List(){
    const developers = people.filter(person => person.profession === 'developer');
    const listItems = developers.map(person =>
        <li key = {person.id}> /// Ключ
            <p>
                {person.name}:
                {' ' + person.profession}
            </p>
        </li>
    )
    return <ul>{listItems}</ul>;
}

/// Где взять ключ? 
/// 1) Данные из базы данных: Если данные поступают из базы данных, можно использовать ключи/идентификаторы базы данных, которые по своей природе уникальны.
/// 2) Данные, созданные локально: Если данные генерируются и сохраняются локально (например, заметки в приложении для ведения заметок), 
//  при создании элементов используем инкрементирующий счетчик crypto.randomUUID() или пакет, например uuid.

/// Важно помнить, что ключи НЕ должны изменяться, иначе теряется смысл их использования. Не стоит генерировать их при рендеринге.
/// Ключи должны быть стабильными, предсказуемыми и уникальными.

/// 2. Мемоизация

/// Мемоизация - это техника оптимизации, при которой результат выполнения функции сохраняется в кэше и используется при последующих вызовах с теми же аргументами.

/// Помогает предотварить повторные отрисовки компонентов, если их пропсы не изменились. Или сократить количество вычислений.

/// Например:

import { useMemo } from "react";

function toDoList({todos, tab, theme}){
    const toDos = useMemo(() => filterTodos(todos, tab), [todos, tab]) /// useMemo принимает функцию и массив зависимостей.
}

/// useMemo кэширует результат функции filterTodos и будет повторно использовать его, если todos и tab не изменились.
/// В противном случае выполнится повторный расчет и вернется новое значение.

/// не стоит злоупотреблять useMemo, так как он сам по себе имеет накладные расходы на кэширование.

/// memo Позволяет мемоизировать компонент, предотвращая его повторный рендеринг

import {memo, useState} from "react";

export default function MyApp(){
    const [name, setName] = useState('');
    const [address, setAdress] = useState('');
    return(
        <>
            <label>
                Name{': '}
                <input value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Address{': '}
                <input value={address} onChange={e => setAdress(e.target.value)} />
            </label>
            <Greeting name={name} />
        </>
    );
}

const Greeting = memo(function Greeting({ name}) {
    console.log('Greeting rendered at', new Date().toLocaleDateString());
    return <h3>Hello{name && ','} + {name} </h3>
});

/// 3. useDefferredValue, useTransition