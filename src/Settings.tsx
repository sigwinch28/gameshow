import React from 'react';


type SettingsProps = {
    lists: [string, string[]][],
    active?: string,
    onSave: (id: string, values: string[]) => void,
    onDelete: (id: string) => void,
    onActivate: (id: string) => void,
    onReset: () => void
};

const Settings: React.FC<SettingsProps> = ({ lists, active, onSave, onDelete, onActivate, onReset }) => {
    return (
        <div className="Settings">
            <ListAdder onCreate={(id: string) => onSave(id, [])} />
            <button onClick={onReset}>Reset</button>
            {lists.map(([name, values]) =>
                <ListEditor
                    key={name}
                    name={name}
                    values={values}
                    active={name === active}
                    onChange={(values) => { onSave(name, values) }}
                    onDelete={() => { onDelete(name) }}
                    onActivate={() => { onActivate(name) }}
                />
            )}
        </div>
    )
}

type ListAdderProps = { onCreate: (_: string) => any };

const ListAdder: React.FC<ListAdderProps> = ({ onCreate }) => {
    const [value, setValue] = React.useState<string>("");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const onClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
        onCreate(value);
    }

    return (
        <div className="ListAdder">
            Add List:
            <input type="text" onChange={onChange} value={value} />
            <button onClick={onClick}>Add</button>
        </div>
    )

}


type ListEditorProps = {
    name: string,
    values: string[],
    active: boolean,
    onChange: (_: string[]) => any,
    onDelete: () => any,
    onActivate: () => any,
};

const ListEditor: React.FC<ListEditorProps> = ({ name, values, active, onChange, onDelete, onActivate }) => {
    const [value, setValue] = React.useState(values.join("\n"));

    const onSave = () => {
        onChange(value.split("\n"))
    }

    const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value)
    }

    return (
        <div className="ListEditor">
            <header>
                <h1>{name}</h1>
                <button disabled={active} onClick={() => onActivate()}>Activate</button>
            </header>
            <textarea value={value} onChange={onTextAreaChange} />
            <footer>
                <button onClick={onSave}>Save</button>
                <button onClick={onDelete}>Delete</button>
            </footer>
        </div>
    )
}


export default Settings;
