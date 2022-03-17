export class Context{
    _data = {}
    bind(value){
        this._data = {...this._data, ...value}
    }
    get(key){
        return this._data[key];
    }
    get data() {
        return this._data
    }
}
