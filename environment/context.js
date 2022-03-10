export class Context{
    _data = {}
    bind(value){
        this._data = {...this._data, ...value}
    }
    get data() {
        return this._data
    }
}
