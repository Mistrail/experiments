export class Context{
    bind(value){
        const entries = Object.entries(value);
        entries.forEach(([name, val]) => {
            this[name] = val;
        })
        return this;
    }
}
